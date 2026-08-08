#!/usr/bin/env python3
"""
Single source of truth for the site's navigation.

This site is intentionally a set of fully static, pre-rendered HTML pages
(one per park) rather than a JS-templated SPA, because that's what makes it
work as an SEO / AdSense surface: every page has to be complete, crawlable
HTML with no client-side include step.

That means the nav markup is physically duplicated across every page, which
is exactly how these pages drifted out of sync (see: SeaWorld Orlando and
Busch Gardens Tampa Bay dropping each other from the "SeaWorld" filter
group). Rather than hand-editing 11 copies of the nav any time a park is
added, renamed, or reordered, treat this script as the "partial": edit the
resort/park data in data/rides.js, then run

    python3 scripts/build_nav.py

from the repo root. It reads data/rides.js as the single source of truth
and rewrites the three nav blocks (the interactive park-filter buttons, the
SEO park-links nav, and the footer "Explore" nav) identically into every
page, with only the active/aria-pressed state changing per page. It never
touches anything else on the page.
"""
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
RIDES_JS = ROOT / "data" / "rides.js"

# Folder to build/rebuild nav for -> park slug that page represents.
# '' (repo root / index.html) represents the "all parks" page.
PAGES = [
    "",
    "magic-kingdom",
    "epcot",
    "hollywood-studios",
    "animal-kingdom",
    "typhoon-lagoon",
    "blizzard-beach",
    "universal-studios",
    "islands-of-adventure",
    "epic-universe",
    "volcano-bay",
    "seaworld-orlando",
    "busch-gardens-tampa",
    "aquatica-orlando",
    "adventure-island-tampa",
    "legoland-florida",
    "legoland-water-park",
    "surfari-water-park",
]

RESORT_LABELS = {
    "disney": "Disney",
    "universal": "Universal",
    "seaworld": "SeaWorld",
    "legoland": "LEGOLAND",
    "grove": "The Grove Resort",
}


def load_parks():
    """Parse the `parks` object out of data/rides.js (single source of truth)."""
    content = RIDES_JS.read_text(encoding="utf-8")
    match = re.search(r"export const parks = \{(.*?)\n\};", content, re.S)
    if not match:
        raise SystemExit("Could not find `parks` object in data/rides.js")

    body = match.group(1)
    entries = re.findall(
        r"""(?:'([\w-]+)'|(\w+)):\s*\{\s*
            name:\s*(['"])(.*?)\3,\s*
            shortName:\s*(['"])(.*?)\5,\s*
            resort:\s*'([\w-]+)'\s*
        \}""",
        body,
        re.S | re.X,
    )

    parks = {}
    order = []
    for quoted_key, bare_key, _q1, name, _q2, short_name, resort in entries:
        slug = quoted_key or bare_key
        name = name.replace("\\'", "'")
        short_name = short_name.replace("\\'", "'")
        parks[slug] = {"name": name, "shortName": short_name, "resort": resort}
        order.append(slug)
    return parks, order


def build_resort_groups(parks, order):
    """Group parks by resort in source order, excluding the 'all' pseudo-park."""
    groups = {}
    for slug in order:
        resort = parks[slug]["resort"]
        if resort == "all":
            continue
        groups.setdefault(resort, []).append(slug)
    return groups


def park_button(slug, label, active):
    pressed = "true" if active else "false"
    active_class = " is-active" if active else ""
    return (
        f'<button aria-pressed="{pressed}" class="park-button{active_class}" '
        f'data-park="{slug}" type="button">{label}</button>'
    )


def render_park_filter(parks, groups, active_park):
    all_active = active_park == "all"
    parts = [
        '<div aria-label="Park filter" class="park-filter" role="group">'
        '<div class="resort-filter-group">'
        '<span class="resort-filter-label">All</span>'
        '<div class="resort-filter-buttons">'
        + park_button("all", "All Parks", all_active)
        + "</div></div>"
    ]
    for resort, slugs in groups.items():
        label = RESORT_LABELS[resort]
        buttons = "".join(
            park_button(slug, parks[slug]["shortName"], slug == active_park)
            for slug in slugs
        )
        parts.append(
            f'<div class="resort-filter-group"><span class="resort-filter-label">{label}</span>'
            f'<div class="resort-filter-buttons">{buttons}</div></div>'
        )
    parts.append("</div>")
    return "".join(parts)


def render_park_links(parks, order):
    links = ['<a href="">All Parks</a>']
    for slug in order:
        if parks[slug]["resort"] == "all":
            continue
        links.append(f'<a href="{slug}/">{parks[slug]["shortName"]}</a>')
    return "".join(links)


def render_seo_nav(parks, order):
    return (
        '<nav aria-label="Florida theme parks" class="park-page-links">'
        + render_park_links(parks, order)
        + "</nav>"
    )


def render_footer_nav(parks, order):
    return (
        '<nav aria-label="Explore" class="footer-column"><h3>Explore</h3>'
        + render_park_links(parks, order)
        + "</nav>"
    )


FILTER_RE = re.compile(
    r'<div aria-label="Park filter" class="park-filter" role="group">.*?</div>\n'
    r"</div>\n"
    r'<div class="control-group">'
)
SEO_NAV_RE = re.compile(
    r'<nav aria-label="Florida theme parks" class="park-page-links">.*?</nav>'
)
FOOTER_NAV_RE = re.compile(
    r'<nav aria-label="Explore" class="footer-column"><h3>Explore</h3>.*?</nav>'
)


def update_page(path: Path, parks, order, groups, active_park):
    text = path.read_text(encoding="utf-8")
    original = text

    filter_html = render_park_filter(parks, groups, active_park)
    text, n_filter = FILTER_RE.subn(
        filter_html + "\n</div>\n" + '<div class="control-group">', text
    )

    seo_html = render_seo_nav(parks, order)
    text, n_seo = SEO_NAV_RE.subn(lambda _m: seo_html, text)

    footer_html = render_footer_nav(parks, order)
    text, n_footer = FOOTER_NAV_RE.subn(lambda _m: footer_html, text)

    if n_filter != 1 or n_seo != 1 or n_footer != 1:
        raise SystemExit(
            f"{path}: expected exactly one match each for filter/seo/footer nav, "
            f"got {n_filter}/{n_seo}/{n_footer}"
        )

    if text != original:
        path.write_text(text, encoding="utf-8")
        return True
    return False


def main():
    parks, order = load_parks()
    groups = build_resort_groups(parks, order)

    changed = []
    for folder in PAGES:
        active_park = folder if folder else "all"
        page_path = ROOT / folder / "index.html" if folder else ROOT / "index.html"
        if not page_path.exists():
            print(f"skip (missing): {page_path}")
            continue
        if update_page(page_path, parks, order, groups, active_park):
            changed.append(page_path.relative_to(ROOT))

    if changed:
        print("Updated nav in:")
        for p in changed:
            print(f"  {p}")
    else:
        print("Nav already up to date on every page.")


if __name__ == "__main__":
    main()
