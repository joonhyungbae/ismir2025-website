# Content guide

How to make the changes a conference website needs during the year. Paths are relative to the repository root.

## Add a page

A new page touches five places. Missing one of them is the most common mistake.

1. **Section** — create `src/components/section/SectionMyPage.vue` with the content. Copy an existing page of the same kind (for a new call, start from `SectionCallForPaper.vue`) so the layout stays consistent.
2. **View** — create `src/views/MyPage.vue` with `SectionMenuCover` and your section (see [Architecture](ARCHITECTURE.md#how-a-page-is-put-together)).
3. **Route** — in `src/router/index.js`, import the view and add `{ path: '/my-page', name: 'my-page', component: MyPage }`. Keep the path prefix of its menu group (`/call-for-*`, `/program-*`, `/attend-*`, `/about-*`, `/satellite-*`, `/diversity-*`).
4. **Banner** — in `src/components/section/SectionMenuCover.vue`, add an entry to `titleList` with the path (without the leading slash), title, cover image, and parent menu name. Without it the page has no title or breadcrumb.
5. **Menu** — in `src/components/AppbarPage.vue`, add the label to the right `*SubItems` array and a `case` for it in the matching `handleSubItemClick*` function. The mobile drawer reuses the same arrays, so the item appears there too. Only a new top-level group needs to be added to the drawer separately.

Then run `npm run serve`, open the page from the menu on a wide window and from the drawer on a narrow one, and check the banner.

## Change the menu

The order of top-level items is the order of the buttons in the template of `AppbarPage.vue`. Move a whole `<v-menu>` block to move an item.

At each phase of the conference, put first what visitors need next (see [Timeline](TIMELINE.md)). Two rules worked well for ISMIR 2025:

- **Do not show empty items.** A menu for content that does not exist yet can stay in the code, commented out, until the pages behind it are ready.
- **Demote rather than delete,** but watch the width. On a 1,366-pixel laptop screen the ISMIR 2025 menu wrapped onto a second line once it had nine top-level items. Move items that have served their phase into a dropdown or under About.

## Update dates

Important dates appear on the home page in `SectionHomeAboutDates.vue` and again on the relevant call pages. When a date changes, search the whole `src/` folder for it.

When a deadline passes, keep it and strike it through rather than deleting it; authors keep looking for past deadlines:

```html
<v-col cols="7" sm="4"><s>Full Paper Submission Due</s></v-col>
<v-col cols="5" sm="8"><s>Mar 28, 2025</s></v-col>
```

All deadlines are stated in Anywhere on Earth (AoE) time.

## Replace the accepted papers

1. Export the accepted papers from the submission system.
2. Convert them to the format in [Architecture](ARCHITECTURE.md#accepted-papers): one object per paper with `Paper ID`, `Paper Title`, and `Authors` as `Name(Affiliation);Name(Affiliation)`. Put names in display order (First Last). Use a script and check the result against the export by hand; author names and affiliations are the data most likely to be wrong and most visible when they are.
3. Save it as `public/AcceptedPapersWithAffiliationsFixed.json` (or change the import in `SectionAcceptedPapers.vue`).

Route author corrections through one person, usually the paper chair, and edit the JSON directly. ISMIR 2025 needed six corrections after the list was published.

## Replace the program

1. Lay the program out as a grid with one column per day, as in `hardcodedProgramData` in `SectionProgramPage.vue`.
2. Update `VENUE_LEGEND` in the same file.
3. In `src/services/icsService.js`, update `DATE_MAPPING` and `COLUMN_TO_DATE` (columns to dates), the location and map tables, and `SPECIAL_EVENT_TIMES` for events that do not follow the grid.
4. Download a few sessions and the full schedule from the program page and open them in a calendar app.

While the schedule is still changing daily it can be convenient to read it live from a spreadsheet. Freeze it into the code before the conference so that the site does not depend on an external service, and so that the calendar files are generated from one fixed copy.

## Add a sponsor

1. Add the logo image to `src/assets/logo/` (and a WebP copy in `src/assets/logo/fhd/` if you follow the existing pattern).
2. Add an object to `src/data/sponsors.js` with `id`, `tiers`, `name`, `tagline`, `logo` (the image base name), `website`, and `description` (an array of paragraphs).
3. The home page lists sponsors separately, in the sponsors part of `SectionHomeAboutDates.vue`. Update it as well.
4. Check `/meet-the-sponsors` and the home page.

## Link a document

Put the file in `public/` and link to it with an absolute path, for example `href="/ISMIR 2025 Program.pdf"`. Files in `public/` are copied to the site root unchanged.

## Images

Most images exist in two versions: the original and a resized WebP copy in an `fhd/` subfolder, which the pages use. Keep originals outside the repository if they are large, and decide the image sizes and format at the start of the year.
