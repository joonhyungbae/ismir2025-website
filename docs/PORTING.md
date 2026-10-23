# Porting guide

How to turn this site into the website of another conference or another year of ISMIR.

## What makes porting slow

Content is written directly into the components rather than kept in data files. That was fast for one person building the site, but it means the year and the location are spread across the code. In this release:

| String | Occurrences | Files |
|---|---|---|
| `2025` | 362 | 37 |
| `Daejeon` | 190 | 25 |
| `KAIST` | 205 | 16 |
| `Korea` | 234 | 28 |
| any of the above | 991 | 45 of 91 source files |

List them with:

```bash
grep -rlE '2025|Daejeon|KAIST|Korea' src --include='*.vue' --include='*.js'
```

## Checklist

### Identity

- [ ] `public/index.html`: page title, favicon reference
- [ ] `public/favicon.png`
- [ ] Logo and cover images in `src/assets/` (`logo.png`, `ExtendedLogo.png`, `CoverImages/`, `CoverImages/fhd/k1.webp`, imported by `SectionMenuCover.vue` as the banner of every page)
- [ ] Fonts in `src/styles/variables.scss` and the Google Fonts link in `public/index.html`; colors are set in the components themselves (search for the hex codes you want to change)
- [ ] `public/CNAME`: your domain

### Pages and navigation

- [ ] Remove pages you do not need from `src/router/index.js`, `src/views/`, `src/components/section/`, the menu arrays in `AppbarPage.vue`, and `titleList` in `SectionMenuCover.vue` (see [Content guide](CONTENT-GUIDE.md#add-a-page))
- [ ] Rename satellite events (`/satellite-*` routes and their pages)
- [ ] Set the menu to its first phase: calls first, and hide what has no content yet (see [Timeline](TIMELINE.md))

### Content

- [ ] Home page text and important dates: `SectionHomeAboutDates.vue`; remove the 2025 awards section
- [ ] Calls: `SectionCallForPaper.vue` and the other `SectionCallFor*.vue` files
- [ ] Organizing committee and volunteers: `SectionAboutOrganizingCommittee.vue`, `SectionAboutVolunteers.vue`, photos in `src/assets/Chairs/` and `src/assets/Volunteers/`
- [ ] Venue, campus map, accommodation, transportation, visa: the `SectionVenue`, `SectionCampusMapPage`, `SectionAccommodation`, `SectionAirportToDaejeon`, `SectionAttendLocalTransportation`, and `SectionVisaEntryGuide` components and their images; these are specific to the host city and usually rewritten from scratch
- [ ] Footer: `FooterPage.vue` and the policy PDFs it links in `public/`
- [ ] Contact addresses (search for `@ismir.net` and `@gmail.com`)

### Data

- [ ] `public/AcceptedPapersWithAffiliationsFixed.json`: empty it until acceptance
- [ ] Program: `hardcodedProgramData` and `VENUE_LEGEND` in `SectionProgramPage.vue`
- [ ] Calendar export: date, location, and map tables in `src/services/icsService.js`
- [ ] Sponsors: `src/data/sponsors.js`, `src/assets/logo/`, the sponsors part of `SectionHomeAboutDates.vue`, and the host logos in `src/assets/sponserLogos/`
- [ ] Documents in `public/` (program PDF, travel guide, policies)

### Before publishing

- [ ] `npm run lint -- --no-fix` and `npm run build` pass (without `--no-fix`, lint rewrites files)
- [ ] Search `src` for links to any route you renamed; links are literal strings
- [ ] Open every menu item at desktop width and in the mobile drawer
- [ ] Check the menu at 1,280, 1,366, and 1,440 pixels wide for line wrapping
- [ ] Search the code for the previous year's dates and names one last time

## A better structure for the next site

If you have time before the first deadline, the most valuable change is to move content that changes by phase into data:

- one list of pages, each with its path, title, menu group, cover image, and the phase in which it matters, from which the router, the menu, and the page banners are generated;
- one file of dates, read by the home page and the call pages;
- the program and venues in a JSON file instead of a component.

With that, moving to the next phase is one edit instead of several, and the menu can reorder itself by date.
