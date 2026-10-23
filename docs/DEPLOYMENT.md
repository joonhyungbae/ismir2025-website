# Deployment

The site is a set of static files built into `dist/` and served by GitHub Pages from a `gh-pages` branch.

## Build and publish

```bash
npm run build        # writes dist/
npm run deploy       # builds, then pushes dist/ to the gh-pages branch (gh-pages package)
```

In the repository settings on GitHub, under Pages, set the source to the `gh-pages` branch, root folder. Keep `public/CNAME` in the code: it is copied into `dist/` on every build, so the custom domain survives each deployment.

## Custom domain under ismir.net

ISMIR conference websites use a subdomain of `ismir.net`. For ISMIR 2025 the steps were:

1. The ISMIR 2025 organizers set up a GitHub account for the conference (using an `ismir2025@ismir.net` alias) and created the repository `ismir2025.github.io` in it.
2. The custom domain `ismir2025.ismir.net` was entered in the repository's Pages settings and in `public/CNAME`.
3. The people managing the `ismir.net` DNS added a CNAME record pointing `ismir2025.ismir.net` to `ismir2025.github.io`. Ask the ISMIR board who manages it in your year.
4. Once the record has propagated, enable HTTPS in the Pages settings.

Start this early. The domain was requested in October 2024, about 11 months before the conference.

## Deep links

GitHub Pages has no server-side routing. A visitor who opens `https://<domain>/program` directly would get a 404. Two small files handle it:

- `public/404.html` redirects any unknown path to `/?p=<path>`;
- a script in `public/index.html` reads `p` and restores the path with `history.replaceState` before Vue Router starts.

Keep both files if you change the hosting setup.

## A preview site

For ISMIR 2025, every build went first to a separate preview site, where committee members reviewed pages before they were published. A second GitHub Pages site (for example in a personal or organization repository with its own domain) works for this: build, deploy to the preview, and deploy to the public site once the chairs agree.

The preview step is easy to drop in the final weeks, when changes are most frequent. Those are the weeks when it matters most.

## Before every public deployment

- `npm run lint` and `npm run build` pass.
- No keys, tokens, or private files are in the commit (`.env*` files are ignored by `.gitignore`).
- Files in `public/` are meant to be public: they are served exactly as they are.
