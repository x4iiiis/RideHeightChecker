# Tall Enough? — Magic Kingdom starter

A zero-build static ride-height checker designed for GitHub Pages.

## Run locally

Because the JavaScript uses ES modules, serve the folder instead of opening `index.html` directly:

```bash
python3 -m http.server 8080
```

Then visit `http://localhost:8080`.

## Deploy to GitHub Pages

1. Create a repository and add these files to its root.
2. Push to the default branch.
3. In **Settings → Pages**, choose **Deploy from a branch**.
4. Select the default branch and `/ (root)`.
5. Replace every `example.com` reference with your real domain.
6. Replace `hello@example.com` with your contact address.

## AdSense

After approval:

1. Replace the placeholder publisher ID in `index.html`.
2. Uncomment the AdSense script.
3. Insert a responsive ad unit inside the existing `.ad-slot` element.
4. Rename `ads.txt.example` to `ads.txt` and insert the exact line Google supplies.
5. Implement a consent platform suitable for your visitors and deployment.

Do not click your own ads or style surrounding content to induce clicks.

## Data

Magic Kingdom attraction heights were transcribed from Walt Disney World's official height-requirements FAQ and checked on 1 August 2026.

The ride dataset is in `data/rides.js`. Add future parks as additional data files without changing the core UI model.
