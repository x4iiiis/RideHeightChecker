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
