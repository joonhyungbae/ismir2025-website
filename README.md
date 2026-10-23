# ISMIR 2025 Conference Website

Source code of the website for [ISMIR 2025](https://ismir2025.ismir.net), the 26th conference of the International Society for Music Information Retrieval, held in Daejeon, Korea, in September 2025.

The site is a Vue 3 single-page application built with Vuetify 3 and Vue Router 4 and served as static files from GitHub Pages. It has 39 pages: calls for submissions, author and presenter guidelines, registration, travel and venue guides, the program with calendar export, the accepted papers, sponsors, satellite events, and the organizing committee.

This repository is a clean release of the final code, without the development history. It is meant to be reused: if you are building the website for a future ISMIR, or for another conference of similar size, start here.

## Quick start

Requirements: Node.js 18.12 or later and npm.

```bash
npm install          # uses .npmrc (legacy-peer-deps) to match the lockfile
npm run serve        # development server at http://localhost:8080
npm run build        # production build in dist/
npm run lint -- --no-fix   # ESLint check (without --no-fix, lint rewrites files)
```

No API keys or environment variables are needed.

## Documentation

| Document | Read it when you want to |
|---|---|
| [Architecture](docs/ARCHITECTURE.md) | understand how the code is organized and how data flows |
| [Content guide](docs/CONTENT-GUIDE.md) | add a page, change the menu, update dates, papers, the program, or sponsors |
| [Porting guide](docs/PORTING.md) | adapt the site for another conference or year |
| [Deployment](docs/DEPLOYMENT.md) | build, publish to GitHub Pages, and connect an `ismir.net` subdomain |
| [Timeline](docs/TIMELINE.md) | see which pages and menu items ISMIR 2025 needed at each phase of the year, and plan your own |

## License

The source code is released under the [MIT License](LICENSE). Photographs, logos (including sponsor logos), and documents in `src/assets/` and `public/` belong to their respective owners and are not covered by the license. Replace them when you reuse the code.

## Citation

If you reuse this code, please cite it. Plain text:

> Bae, J. (2025). *ISMIR 2025 Conference Website* (Version 1.0.0) [Computer software]. https://github.com/joonhyungbae/ismir2025-website

BibTeX:

```bibtex
@software{bae2025ismirwebsite,
  author  = {Bae, Joonhyung},
  title   = {{ISMIR} 2025 Conference Website},
  version = {1.0.0},
  year    = {2025},
  url     = {https://github.com/joonhyungbae/ismir2025-website},
  note    = {MIT License. Site: https://ismir2025.ismir.net}
}
```

The same information is in [CITATION.cff](CITATION.cff), which also powers the "Cite this repository" button on the GitHub page.
