# Architecture

## Stack

| Layer | Choice |
|---|---|
| Framework | Vue 3 (Composition API, `<script setup>` in most files) |
| UI components | Vuetify 3, Material Design Icons (`@mdi/font`) |
| Routing | Vue Router 4, HTML5 history mode |
| Build | Vue CLI 5 (webpack), Babel, Sass |
| Lint | ESLint with `plugin:vue/vue3-essential` and `eslint:recommended` |
| Hosting | Static files on GitHub Pages (`gh-pages` branch), custom domain |

There is no backend. Everything the site shows is either written in the components or loaded from files in `public/`.

## Directory layout

```
public/
  index.html              App shell; restores deep links redirected by 404.html
  404.html                Redirects unknown paths to /?p=<path> (GitHub Pages SPA trick)
  CNAME                   Custom domain for GitHub Pages
  AcceptedPapersWithAffiliationsFixed.json   Accepted papers (see Data)
  *.pdf                   Documents linked from pages (program, travel guide, policies)
src/
  main.js                 Creates the app, installs the router and Vuetify
  App.vue                 Layout: AppbarPage, <router-view>, FooterPage
  router/index.js         All routes (one per page)
  views/                  One thin component per page
  components/
    AppbarPage.vue        Desktop menu and the mobile navigation drawer
    FooterPage.vue        Footer with policy links
    section/              Page content, one or more sections per page
    base/                 Small shared building blocks (headings, dividers, sponsor card)
  data/sponsors.js        Sponsor list
  services/icsService.js  Calendar export (.ics, Google, Outlook, Apple)
  plugins/vuetify.js      Vuetify setup (icon set)
  styles/variables.scss   Vuetify Sass settings (fonts, typography)
  assets/                 Images; sponsor logos in logo/, host and supporter logos in sponserLogos/ (the folder name is misspelled in the code)
```

## How a page is put together

Each URL maps to a view in `src/views/`. Most views contain nothing but sections:

```vue
<!-- src/views/CallForPapersPage.vue -->
<template>
  <v-row no-gutters>
    <v-col cols="12">
      <SectionMenuCover />
      <SectionCallForPaper />
    </v-col>
  </v-row>
</template>
```

- `SectionMenuCover` draws the banner at the top of most pages: the page title, a breadcrumb trail (Home > Section > Page), and the cover image. It looks the current path up in its own `titleList`, so every new page needs an entry there. The `src` field of those entries is not used; every banner shows the one image imported at the top of the file (`@/assets/CoverImages/fhd/k1.webp`). Two pages (`AboutLogoPage.vue`, `DetailedSchedulePage.vue`) have no banner, and two (`DetailedSchedulePage.vue`, `AttendTransportationPage.vue`) keep their content in the view itself.
- The page body is a `Section*` component in `src/components/section/`. Content (text, tables, links) is written directly in its template.
- The home page uses `SectionHomeCover` (image carousel and title) and `SectionHomeAboutDates` (about text, important dates, awards).

## Navigation

The menu lives in `src/components/AppbarPage.vue`. At the time of the conference the desktop menu was:

```
Home | Program | Virtual Platform | Author and Presenter Information | Calls |
Attend | Sponsors | Diversity and Inclusion | Satellite Events | About
```

Each dropdown is a `v-menu` whose items come from an array in the same file (`programSubItems`, `callSubItems`, `attendSubItems`, `IPSubItems`, `SponsorsSubItems`, `diversitySubItems`, `SatelliteSubItems`, `aboutSubItems`) and a matching `handleSubItemClick*` function that maps each label to a route name.

Below the `mdAndDown` breakpoint (narrower than 1,280 px) the desktop menu is replaced by a hamburger button that opens a `v-navigation-drawer` defined in the same file. The drawer reuses the same `*SubItems` arrays, so a new dropdown item appears in both; a new top-level group has to be added to the drawer separately.

A page is therefore registered in three places that must be kept in sync: the router, the menu arrays and handlers in `AppbarPage.vue`, and `SectionMenuCover`'s `titleList`. See [Content guide](CONTENT-GUIDE.md#add-a-page).

## Data

### Accepted papers

`public/AcceptedPapersWithAffiliationsFixed.json` is an array of objects:

```json
{
  "Paper ID": "4",
  "Paper Title": "Reformulating Soft Dynamic Time Warping: ...",
  "Authors": "Johannes Zeitler(International Audio Laboratories Erlangen);Meinard Müller(International Audio Laboratories Erlangen)"
}
```

Authors are separated by `;`, each with its affiliation in parentheses. `SectionAcceptedPapers.vue` imports the file at build time and formats the author string.

### Program

The program lived in a Google Sheet during planning and was frozen into code before the conference. It is now the array `hardcodedProgramData` in `src/components/section/SectionProgramPage.vue`, a grid that mirrors the sheet:

- rows 0 to 3: dates, weekdays, day type (satellite, tutorial, conference), and location;
- each following row: a time slot, then one cell per day column.

`VENUE_LEGEND` in the same file lists the venues shown above the table, each with a map link.

### Calendar export

`src/services/icsService.js` turns program cells into calendar events. Its tables translate the grid into real dates and places:

| Constant | Purpose |
|---|---|
| `DATE_MAPPING`, `COLUMN_TO_DATE` | grid column to calendar date |
| `LOCATION_MAPPING`, `DETAILED_LOCATION_MAPPING` | short venue names to full addresses |
| `GOOGLE_MAPS_URLS`, `SPECIAL_EVENT_MAPS` | map links per venue or event |
| `SPECIAL_EVENT_TIMES` | events whose times differ from the grid row |

Exports: `downloadICSFile` (one event), `downloadMergedICSFile` (whole program), `generateGoogleCalendarUrl`, `generateOutlookUrl`, `generateAppleCalendarUrl`, plus helpers.

### Sponsors

`src/data/sponsors.js` exports `sponsors`, an array of `{ id, tiers, name, tagline, logo, website, description }`. `tiers` is a list because a sponsor can appear in several (for example `['platinum', 'wimir-patron']`). `logo` is the base name of an image in `src/assets/logo/`. `SponsorCard.vue` renders one sponsor; `SectionMeetTheSponsors.vue` groups them by tier.

## External resources at runtime

- PDF.js is loaded from cdnjs on the detailed-schedule page to render `public/ISMIR 2025 Program.pdf`.
- The Noto Sans font is loaded from Google Fonts in `public/index.html`; Material Design Icons come from the `@mdi/font` package.

## Deep links on GitHub Pages

GitHub Pages serves `404.html` for any path it does not know, such as `/program`. That file redirects to `/?p=/program`, and a script in `index.html` restores the original path with `history.replaceState` before the router starts. Only the path is passed on, so a deep link loses its query string and hash. The router has no catch-all route, so an unknown path shows an empty page between header and footer. See [Deployment](DEPLOYMENT.md).
