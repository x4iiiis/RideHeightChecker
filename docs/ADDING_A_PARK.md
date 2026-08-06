# Adding a new park

Checklist for adding a park/site to RideHeightChecker. Paste this whole
file (or just link to it) in a new conversation and ask Claude to work
through it — everything it needs to know about *how* the site is built
is here, so it shouldn't need to rediscover it from scratch.

## 1. Add the data

In `data/rides.js`:

- Add an entry to the `parks` object: `name`, `shortName`, `resort`
  (`disney` | `universal` | `seaworld` — or a new resort key if this is
  a genuinely new resort family; see step 2 if so).
- Add each ride to the `rides` array with `park` set to the new slug.
  Match the field shape of existing rides in the same resort group —
  `minHeight`, `maxHeight`/`maxHeightExclusive`, `independentHeight`,
  `ruleText`/`withinRangeText`/`conditionalText`/`overMaxText` etc. as
  needed. Copy a similar existing ride as a starting template.
- If you've actually re-verified data against official sources as part
  of this change, bump `dataVerifiedDate` at the top of the file (format
  `YYYY-MM-DD`). Don't bump it just because you touched the file — it's
  a claim about when the data was last checked, not when it was last
  edited. If this addition is *only* new-park data and you haven't
  re-checked the existing parks, leave it as-is.

## 2. New resort family? (skip if adding to Disney/Universal/SeaWorld)

- Add a label to `RESORT_LABELS` in `scripts/build_nav.py`.
- Add the resort key to `resort:` in the new park's data — the nav
  script groups by that automatically.

## 3. Create the page

- Copy an existing park page in the same resort family as a starting
  point (e.g. copy `seaworld-orlando/index.html` for a new SeaWorld/
  Busch-family page) rather than starting from scratch — it keeps the
  `<base href="../">`, ad unit, JSON-LD shape, etc. consistent.
- Set `data-default-park` on `<body>` to the new slug.
- Add the new park slug to the `knownSlugs` array in
  `assets/app.js` inside `siteBasePath()`. This allows JavaScript to
  recognise the current park and replace its slug when navigating to
  another park. If omitted, links can become nested (for example,
  `/typhoon-lagoon/blizzard-beach/` instead of `/blizzard-beach/`).
- Update the unique bits: `<title>`, meta description, canonical URL,
  og/twitter tags, JSON-LD `name`/`description`, `<h1>`, intro
  paragraph, and the `about-checker` section's prose. These are
  hand-written per park — the build scripts don't touch them.
- Add the new page's URL to `sitemap.xml`.

## 4. Run the build

From the repo root:

```sh
npm run build
```

This runs, in order:

- `python3 scripts/build_nav.py` — regenerates the park-filter buttons,
  SEO park-links nav, and footer nav on **every** page (not just the
  new one) from `data/rides.js`, so the new park shows up everywhere
  automatically and existing pages' nav stays in sync.
- `node scripts/build_rides.mjs` — pre-renders each page's default ride
  list (height = 40in, no filters) plus the summary counts and the
  `.verified` date, into static HTML.

Both scripts are idempotent — safe to re-run, and they only touch what
actually changed. If either fails, it's because the HTML structure it's
looking for (`<div class="ride-list" id="ride-list">`,
`<div aria-label="Park filter"...`, etc.) isn't present on some page —
usually means step 3 was skipped or the copied template diverged.

## 5. Spot-check before committing

- Load the new page and 2–3 existing pages; confirm the nav filter
  buttons show the same full set everywhere (a resort group should
  never be missing a sibling — that was a real bug once, see the
  SeaWorld/Busch Gardens nav fix).
- From the new park page, click through to at least one other park and
  confirm the URL replaces the current park slug rather than appending
  to it (for example, `/typhoon-lagoon/` should navigate to
  `/blizzard-beach/`, not `/typhoon-lagoon/blizzard-beach/`).
- Confirm the new park's ride cards actually render in the static
  HTML (view-source, not just the live page) — search for
  `<div class="ride-list" id="ride-list">` and check it's non-empty.
- Confirm `.verified` text reads correctly on the new page and hasn't
  changed unexpectedly on unrelated pages.
- If ads are live, confirm the new page's `<ins class="adsbygoogle">`
  has the real `data-ad-slot` value, not the placeholder.