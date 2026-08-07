# Florida Ride Height Checker

A zero-build static ride-height checker for GitHub Pages.

## Deploy

Push the repository and enable **Settings → Pages → Deploy from a branch → main → /(root)**.

## AdSense

The site includes an ad placeholder, privacy page, `ads.txt.example`, favicon set, manifest, Open Graph image, robots file and sitemap. Before enabling AdSense:

1. Add Google’s exact AdSense script and publisher ID.
2. Rename `ads.txt.example` to `ads.txt` and insert Google’s supplied line.
3. Update the privacy policy to match the services actually enabled.
4. Add a consent mechanism where required.

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

- LEGOLAND Florida static park page and verified ride-height dataset, checked against the official LEGOLAND Florida rides & attractions page, August 2026. First new resort family added to the site (`legoland` resort key alongside `disney`, `universal` and `seaworld`); covers the Theme Park only — LEGOLAND Water Park and Peppa Pig Theme Park are not yet included.
