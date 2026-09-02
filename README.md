# Florida Ride Height Checker

A zero-build static ride-height checker for GitHub Pages.

## Deploy

Push the repository and enable **Settings → Pages → Deploy from a branch → main → /(root)**.

## AdSense

The site is wired up for AdSense end to end:

1. ✅ The AdSense library script and publisher ID (`ca-pub-1887186881075807`) are in every page's `<head>`, for site verification and Auto ads.
2. ✅ `ads.txt` is live at the site root with Google's supplied line.
3. ✅ `privacy.html` and `cookies.html` describe AdSense as enabled, not "may later use", and link out to Google's ad-settings and data-usage pages.
4. ✅ A lightweight consent banner (`assets/styles.css` `.consent-banner`, inline script in every page's `<head>`) asks first-time visitors to accept ads or stay essential-only, and requests non-personalised ads by default until a visitor opts in — see the `adConsent` key in `localStorage`.
5. ✅ The manual `<ins class="adsbygoogle">` ad slots (which all carried a placeholder `data-ad-slot` ID) have been removed. The publisher script alone is enough for site verification and for Google's Auto ads to place ads on its own; add manual `<ins>` slots back in only if you want ads pinned to specific positions instead of Auto ads deciding placement, once you've created real ad units in your AdSense account.

Also worth knowing: every page's canonical URL, Open Graph/Twitter tags, JSON-LD and `sitemap.xml`/`robots.txt` now point at the live custom domain (`https://tallenough.x4iiiis.com/`, from `CNAME`) rather than the `x4iiiis.github.io/RideHeightChecker` GitHub Pages URL they used to carry — keep it that way if the domain ever changes, so Google isn't told two different canonical URLs for the same content.

### Regression guard

`scripts/check_regressions.mjs` runs as the last step of `npm run build` (after `build_nav.py` and `build_rides.mjs`). It doesn't rewrite anything — it fails the build if a known bad pattern reappears: the old GitHub Pages domain, a placeholder ad slot ID, a park page's results heading naming the wrong park, or a park page's editorial copy mentioning a ride that belongs to a different park (exactly the class of copy-paste bug that shipped in the version Google rejected — see `git log` / the AdSense hardening notes below for the specific instances it was written to catch). It reads `data/rides.js` as its source of truth, so it stays correct as parks and rides are added. Run it on its own with `node scripts/check_regressions.mjs`.

## Data

Ride data lives in `data/rides.js`. Height requirements should be checked regularly against official park sources.

## SEO landing pages

The project now includes separate static entry pages for each Walt Disney World park:

- `/magic-kingdom/`
- `/epcot/`
- `/hollywood-studios/`
- `/animal-kingdom/`

All pages share the same `assets/app.js`, `assets/styles.css`, and `data/rides.js` files. Each page sets its initial park using `data-default-park` on the `<body>` element and contains unique title, description, canonical URL, social metadata, structured data, heading copy, and supporting content.

The park controls navigate between these crawlable pages while preserving the entered height, unit, and optional child name in the query string.


## Universal Orlando data
Universal Studios Florida, Islands of Adventure and Epic Universe were added using Universal Orlando’s official ride-height page and current rider safety guides, checked 2 August 2026.

- SeaWorld Orlando

- Busch Gardens Tampa Bay static park page and verified ride-height dataset.

- Aquatica Orlando static park page and verified ride-height dataset, checked against the official Aquatica Orlando site and FAQ, August 2026.

- Adventure Island Tampa Bay static park page and verified ride-height dataset, checked against the official Adventure Island rides, pools and kid-friendly pages, August 2026. Completes the SeaWorld family's water-park coverage alongside Typhoon Lagoon/Blizzard Beach (Disney), Volcano Bay (Universal) and Aquatica Orlando.

- LEGOLAND Florida static park page and verified ride-height dataset, checked against the official LEGOLAND Florida rides & attractions page, August 2026. First new resort family added to the site (`legoland` resort key alongside `disney`, `universal` and `seaworld`); covers the Theme Park only — LEGOLAND Water Park and Peppa Pig Theme Park are not yet included.

- LEGOLAND Water Park static park page and verified ride-height dataset, checked against the official LEGOLAND Florida water park rides & attractions page, August 2026. Completes LEGOLAND Florida Resort's gate coverage alongside the Theme Park.

- Surfari Water Park (The Grove Resort & Water Park, Winter Garden) static park page and verified ride-height dataset, checked against the official Grove Resort water park pages and FAQ, August 2026. First new resort family that is a hotel amenity rather than a standalone admission-ticket park (`grove` resort key); access is free for hotel guests or via day pass rather than a park ticket.
