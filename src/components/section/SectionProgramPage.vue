<template>
  <v-row justify="center" id="program">
    <v-col cols="12" md="10">
      <v-card outlined elevation="0" class="pa-4 my-4">
        <v-card-title class="text-h4 mb-3 font-weight-bold">
          The schedule of the ISMIR 2025 program
        </v-card-title>

        <v-alert
          type="info"
          variant="tonal"
          class="mb-4"
          icon="mdi-calendar-plus"
        >
          <div class="text-body-2">
            <strong>💡 Tip:</strong> Click on any session to download a calendar
            event (.ics file) that you can add to Google Calendar, Outlook, or
            any calendar app!
          </div>
          <v-btn
            color="primary"
            variant="outlined"
            size="small"
            class="mt-3"
            prepend-icon="mdi-download-multiple"
            @click="downloadAllEvents"
            :loading="downloadingAll"
          >
            Download Complete Schedule (.ics)
          </v-btn>
        </v-alert>

        <v-container fluid class="pa-0">
          <v-row>
            <v-col cols="12">
              <!-- Loading state -->
              <div v-if="loading" class="text-center pa-8">
                <v-progress-circular
                  indeterminate
                  color="primary"
                  size="64"
                ></v-progress-circular>
                <div class="mt-4 text-h6">Loading program data...</div>
              </div>

              <!-- Error state -->
              <div v-else-if="error" class="text-center pa-8">
                <v-alert type="error" prominent class="ma-4">
                  <div class="text-h6">Unable to load data</div>
                  <div class="mt-2">{{ error }}</div>
                  <v-btn color="primary" class="mt-4" @click="loadSheetData">
                    Try Again
                  </v-btn>
                </v-alert>
              </div>

              <!-- Daily program schedule table -->
              <div
                v-else-if="tableData.headers && tableData.rows"
                class="sheets-container"
              >
                <!-- Mobile scroll hint message -->
                <v-alert
                  v-if="$vuetify.display.mobile"
                  type="info"
                  variant="tonal"
                  class="mb-3"
                  icon="mdi-arrow-left-right"
                >
                  <div class="text-caption">
                    📱 <strong>Mobile Tip:</strong> Scroll left or right to view
                    the full program schedule!
                  </div>
                </v-alert>

                <!-- Venue Legend (placed above the table) -->
                <div class="venue-legend-top" v-if="!$vuetify.display.mobile">
                  <v-card class="legend-card" elevation="2">
                    <v-card-title class="legend-title">
                      <v-icon class="mr-2" color="primary"
                        >mdi-map-marker</v-icon
                      >
                      Venues
                    </v-card-title>
                    <v-card-text class="legend-content">
                      <div class="legend-items-row">
                        <div
                          v-for="(venue, key) in VENUE_LEGEND"
                          :key="key"
                          class="legend-item-compact"
                        >
                          <span class="legend-symbol">{{ venue.symbol }}</span>
                          <div class="legend-info-compact">
                            <div class="legend-name">{{ venue.name }}</div>
                            <a
                              v-if="venue.mapUrl"
                              :href="venue.mapUrl"
                              target="_blank"
                              class="legend-map-link"
                            >
                              <v-icon size="small">mdi-map</v-icon> Map
                            </a>
                          </div>
                        </div>
                      </div>
                    </v-card-text>
                  </v-card>
                </div>

                <!-- Main table -->
                <div class="table-container">
                  <table class="program-table" :style="getColumnStyle()">
                    <!-- Multi-row header -->
                    <thead>
                      <!-- First row: date -->
                      <tr class="date-row">
                        <th rowspan="4" class="time-header"></th>
                        <th class="date-cell">9/20</th>
                        <th class="date-cell">9/21</th>
                        <th class="date-cell">9/22</th>
                        <th class="date-cell">9/23</th>
                        <th class="date-cell">9/24</th>
                        <th class="date-cell">9/25</th>
                        <th class="date-cell" colspan="2">9/26</th>
                      </tr>

                      <!-- Second row: day of week -->
                      <tr class="day-row">
                        <th class="day-cell">Sat</th>
                        <th class="day-cell">Sun</th>
                        <th class="day-cell">Mon</th>
                        <th class="day-cell">Tue</th>
                        <th class="day-cell">Wed</th>
                        <th class="day-cell">Thu</th>
                        <th class="day-cell" colspan="2">Fri</th>
                      </tr>

                      <!-- Third row: event type -->
                      <tr class="event-type-row">
                        <th class="event-type-cell satellite">Satellite</th>
                        <th class="event-type-cell tutorial">Tutorial</th>
                        <th class="event-type-cell conference" colspan="4">
                          Conference
                        </th>
                        <th class="event-type-cell satellite" colspan="2">
                          Satellite
                        </th>
                      </tr>

                      <!-- Fourth row: venue -->
                      <tr class="venue-row">
                        <th colspan="7" class="venue-cell main-venue">KAIST</th>
                        <th class="venue-cell sogang-venue">
                          Sogang Univ., Seoul
                        </th>
                      </tr>
                    </thead>

                    <!-- Table body -->
                    <tbody>
                      <tr
                        v-for="(row, rowIndex) in getProcessedRows()"
                        :key="rowIndex"
                        class="time-row"
                        :class="getTimeRowClass()"
                      >
                        <!-- Time column -->
                        <td class="time-cell" :class="getTimeClass()">
                          {{ row.originalRow[0] || "" }}
                        </td>

                        <!-- Session columns -->
                        <td
                          v-for="(cell, cellIndex) in row.cells"
                          :key="cellIndex"
                          v-show="!cell.hidden"
                          class="session-cell"
                          :class="[
                            getSessionClass(cell.value),
                            { 'clickable-session': cell.isClickable },
                          ]"
                          :rowspan="cell.rowspan"
                          :colspan="cell.colspan"
                          @click="
                            handleCellClick(
                              $event,
                              cell.value,
                              rowIndex,
                              cellIndex,
                              cell.isClickable
                            )
                          "
                          :title="
                            cell.isClickable
                              ? 'Click to add to calendar 📅'
                              : ''
                          "
                        >
                          <div class="session-content">
                            {{ cell.value || "" }}
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <!-- Calendar selection menu -->
                <div
                  v-if="calendarMenuOpen"
                  class="calendar-menu-overlay"
                  @click="calendarMenuOpen = false"
                >
                  <v-card
                    class="calendar-menu-card"
                    :style="{
                      position: 'fixed',
                      left: menuPosition.x + 'px',
                      top: menuPosition.y + 'px',
                      zIndex: 10000,
                      minWidth: '250px',
                      maxWidth: '300px',
                    }"
                    @click.stop
                  >
                    <v-card-title class="text-subtitle-1 font-weight-bold pa-3">
                      📅 Add to Calendar
                    </v-card-title>
                    <v-divider></v-divider>
                    <v-list density="compact">
                      <v-list-item
                        v-for="calendar in availableCalendars"
                        :key="calendar.id"
                        @click="handleCalendarSelection(calendar)"
                        class="calendar-option"
                        :prepend-icon="getCalendarIcon(calendar.id)"
                      >
                        <v-list-item-title>{{
                          getCalendarName(calendar.id)
                        }}</v-list-item-title>
                        <template v-slot:append>
                          <v-icon
                            v-if="calendar.id === 'download'"
                            size="small"
                          >
                            mdi-download
                          </v-icon>
                          <v-icon v-else size="small"> mdi-open-in-new </v-icon>
                        </template>
                      </v-list-item>
                    </v-list>
                  </v-card>
                </div>
              </div>

              <!-- No data -->
              <div v-else class="text-center pa-8">
                <v-alert type="info" prominent class="ma-4">
                  <div class="text-h6">
                    Loading the program...
                  </div>
                </v-alert>
              </div>
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </v-col>
  </v-row>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import {
  downloadICSFile,
  downloadMergedICSFile,
  isValidEvent,
  getAvailableCalendarOptions,
  generateGoogleCalendarUrl,
  generateOutlookUrl,
  generateAppleCalendarUrl,
} from "../../services/icsService";

// ISMIR 2025 program schedule data - CSV file contents fully hardcoded
// Venue legend mapping
const VENUE_LEGEND = {
  1: {
    symbol: "¹",
    name: "N25 Paik Nam June Hall",
    fullName:
      "Room #3229, Paik Nam June Hall (백남준 Hall), N25 Building, Industrial Design Department, KAIST",
    mapUrl: "https://maps.app.goo.gl/btnbicuVZpe12Cd49",
  },
  2: {
    symbol: "²",
    name: "Golfzon Zoimaru",
    fullName: "Golfzon Zoimaru, Daejeon, South Korea",
    mapUrl:
      "https://www.google.com/maps/place/%EA%B3%A8%ED%94%84%EC%A1%B4+%EC%A1%B0%EC%9D%B4%EB%A7%88%EB%A3%A8/@36.374282,127.3866818,17z/data=!3m1!4b1!4m6!3m5!1s0x3565498f9d9e5fc7:0xee322d1ac4eefeb5!8m2!3d36.374282!4d127.3866818!16s%2Fg%2F11c5r8x8qy",
  },
  3: {
    symbol: "³",
    name: "ICC Hotel",
    fullName: "ICC Hotel, Daejeon, South Korea",
    mapUrl:
      "https://www.google.com/maps/place/%ED%98%B8%ED%85%94ICC/@36.3769613,127.3926565,17z/data=!3m1!4b1!4m6!3m5!1s0x3565498fe8b3e435:0x4601bcf4eb4f2181!8m2!3d36.3769613!4d127.3926565!16s%2Fg%2F1hc1qx8qy",
  },
  4: {
    symbol: "⁴",
    name: "E11 Creative Learning Building",
    fullName: "KAIST Creative Learning Building E11, Daejeon, South Korea",
    mapUrl:
      "https://www.google.com/maps/place/Creative+Learning+Building+E11/@36.3703695,127.3625834,17z/data=!3m1!4b1!4m6!3m5!1s0x35654bc9c84e5adb:0xf0cf3620fc28fc1d!8m2!3d36.3703695!4d127.3625834!16s%2Fg%2F11c5r8x8qy",
  },
  5: {
    symbol: "⁵",
    name: "E15 Main Auditorium",
    fullName: "KAIST Main Auditorium E15, Daejeon, South Korea",
    mapUrl:
      "https://www.google.com/maps/place/KAIST+E15+%EB%8C%80%EA%B0%95%EB%8B%B9/@36.3720843,127.3629259,17z/data=!3m1!4b1!4m6!3m5!1s0x35654bc98a6db1a1:0x8f5575e3fc5de4e7!8m2!3d36.3720843!4d127.3629259!16s%2Fg%2F11c5r8x8qy",
  },
  6: {
    symbol: "⁶",
    name: "Sogang University",
    fullName: "Sogang University, Seoul, South Korea",
    mapUrl: "https://maps.app.goo.gl/wXu9FhD28N1Fj1nj6",
  },
};

// All data from the original program.csv converted into a JavaScript array
const hardcodedProgramData = [
  // Header info (rows 0-3)
  ["", "9/20", "9/21", "9/22", "9/23", "9/24", "9/25", "9/26"],
  ["", "Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri"],
  [
    "",
    "Satellite event",
    "Tutorial",
    "Conference",
    "Conference",
    "Conference",
    "Conference",
    "Satellite event",
  ],
  [
    "Starting at (KST)",
    "@KAIST",
    "@KAIST",
    "@KAIST",
    "@KAIST",
    "@KAIST",
    "@KAIST",
    "@KAIST",
    "@Sogang Univ., Seoul",
  ],

  // Actual schedule data (rows 4-79)
  ["07:00 - 07:30", "", "Registration⁴", "Registration⁵", "", "", "", ""],
  ["07:30 - 08:00", "", "", "", "", "", "", ""],
  [
    "08:00 - 08:30",
    "",
    "",
    "End",
    "Registration⁵",
    "Registration⁵",
    "Registration⁵",
    "",
  ],
  [
    "08:30 - 09:00",
    "",
    "Registration⁴",
    "Opening⁵",
    "Registration⁵",
    "Registration⁵",
    "Registration⁵",
    "",
  ],
  [
    "09:00 - 09:30",
    "",
    "Tutorial \n(T1, T2, T3)⁴",
    "Oral \nSession 1⁵",
    "Oral\nSession 3⁵",
    "Oral\nSession 5⁵",
    "Oral\nSession 7⁵",
    "LLM4MA⁵",
    "DLfM⁶",
  ],
  ["09:30 - 10:00", "", "", "", "", "", "", "", ""],
  ["10:00 - 10:30", "", "", "End", "End", "End", "End", "", ""],
  [
    "10:30 - 11:00",
    "",
    "",
    "Coffee ☕️ \n+\nPoster \nSession 1⁵",
    "Coffee ☕️ \n+\nPoster\nSession 3⁵",
    "Coffee ☕️ \n+\nPoster\nSession 5⁵",
    "Coffee ☕️ \n+\nPoster\nSession 7⁵",
    "",
    "",
  ],
  ["11:00 - 11:30", "", "", "", "", "", "", "", ""],
  ["11:30 - 12:00", "", "", "End", "End", "End", "End", "", ""],
  [
    "12:00 - 12:30",
    "",
    "End",
    "Lunch 🥗⁵",
    "Lunch 🍚⁵",
    "Lunch 🍱⁵",
    "Lunch 🥘⁵",
    "",
    "",
  ],
  ["12:30 - 13:00", "", "Lunch 🍽️⁴", "End", "End", "End", "End", "", ""],
  [
    "13:00 - 13:30",
    "",
    "Lunch 🍽️⁴",
    "Keynote 1⁵",
    "Industry \nSession⁵",
    "Keynote 2⁵",
    "Society Meeting / Board Election⁵",
    "",
    "",
  ],
  ["13:30 - 14:00", "", "", "End", "End", "End", "End", "", ""],
  [
    "14:00 - 14:30",
    "HCMIR25¹",
    "Tutorial \n(T4, T5, T6)⁴",
    "Coffee ☕️⁵",
    "Coffee ☕️⁵",
    "Coffee ☕️⁵",
    "Award and Test-of-Time Talks⁵",
    "",
    "",
  ],
  [
    "14:30 - 15:00",
    "",
    "",
    "Oral \nSession 2⁵",
    "Oral\nSession 4⁵",
    "Oral\nSession 6⁵",
    "Closing Remarks, ISMIR 2026⁵",
    "",
    "",
  ],
  ["15:00 - 15:30", "", "", "", "", "", "Late-Breaking/Demo⁵", "", ""],
  ["15:30 - 16:00", "", "", "End", "End", "End", "", "", ""],
  [
    "16:00 - 16:30",
    "",
    "",
    "Poster \nSession 2⁵",
    "Poster \nSession 4⁵",
    "Poster \nSession 6⁵",
    "",
    "",
    "",
  ],
  ["16:30 - 17:00", "", "", "", "", "", "End", "End", ""],
  ["17:00 - 17:30", "", "End", "End", "End", "End", "Unconference⁵", "", ""],
  [
    "17:30 - 18:00",
    "End",
    "",
    "Industry 🥪 \nMeetup 🍗⁵",
    "WIMIR\nSession⁵",
    "Special\nSession⁵",
    "",
    "",
    "End",
  ],
  ["18:00 - 18:30", "", "", "", "End", "End", "End", "", ""],
  [
    "18:30 - 19:00",
    "",
    "Welcome \nReception²",
    "End",
    "Korean \nTraditional \nMusic Concert⁵",
    "",
    "",
    "",
    "",
  ],
  ["19:00 - 19:30", "", "", "", "End", "", "", "", ""],
  [
    "19:30 - 20:00",
    "",
    "",
    "ISMIR\nMusic \nProgram⁵",
    "K-Culture\nNight⁵",
    "Banquet\n+\nJam session\n🥁🎸³",
    "Rencon",
    "",
    "",
  ],
  ["20:00 - 20:30", "", "", "End", "", "", "", "", ""],
  ["20:30 - 21:00", "", "", "", "", "", "End", "", ""],
  ["21:00 - 21:30", "", "End", "", "End", "", "", "", ""],
  ["21:30 - 22:00", "", "", "", "", "End", "", "", ""],
];

// Reactive data
const loading = ref(false);
const error = ref(null);
const sheetData = ref([]);
const mergedCellsInfo = ref({});
const downloadingAll = ref(false);

// Calendar menu data
const calendarMenuOpen = ref(false);
const selectedEventData = ref(null);
const availableCalendars = ref(getAvailableCalendarOptions());
const menuPosition = ref({ x: 0, y: 0 });

// Compute table data
const tableData = computed(() => {
  if (!sheetData.value || sheetData.value.length === 0) {
    return { headers: [], rows: [] };
  }

  const formattedData = formatDataAsTable(sheetData.value);

  // Filter to 8:30-22:00 only (includes Welcome Reception and Banquet)
  if (formattedData.rows && formattedData.rows.length > 0) {
    const filteredRows = formattedData.rows.filter((row) => {
      if (!row || !row[0]) return false;

      const time = row[0].toString().trim();

      // Check the time format (e.g. "07:00 - 07:30", "09:00 - 09:30")
      const timeMatch = time.match(
        /^(\d{1,2}):(\d{2})\s*-\s*(\d{1,2}):(\d{2})$/
      );
      if (!timeMatch) return false;

      const hours = parseInt(timeMatch[1]);
      const minutes = parseInt(timeMatch[2]);

      // From 7:00 (7h 0m) to 22:00 (22h 0m)
      const totalMinutes = hours * 60 + minutes;
      const startMinutes = 7 * 60; // 7:00
      const endMinutes = 22 * 60; // 22:00

      return totalMinutes >= startMinutes && totalMinutes <= endMinutes;
    });

    return {
      ...formattedData,
      rows: filteredRows,
    };
  }

  return formattedData;
});

// Convert to Vuetify DataTable header format (currently unused)
// const tableHeaders = computed(() => {
//   if (!tableData.value.headers) return [];
//
//   return tableData.value.headers.map((header, index) => ({
//     text: header,
//     value: `col${index}`,
//     sortable: true,
//     width: 'auto'
//   }));
// });

// Fixed column count (9/20-9/25: 6 + 9/26: 2 = 8 total)
const getColumnCount = computed(() => {
  return 8; // Fixed 8 columns
});

// Dynamic column width style
const getColumnStyle = () => {
  const columnCount = getColumnCount.value;
  const sessionColumnWidth = `calc((100% - 120px) / ${columnCount})`;
  return {
    "--session-column-width": sessionColumnWidth,
  };
};

// Determine the time row style class - all times share the same style
const getTimeRowClass = () => {
  return ""; // No special class
};

// Determine the time style class - all times share the same style
const getTimeClass = () => {
  return ""; // No special class
};

// Determine the session style class - sky blue applied uniformly
const getSessionClass = (session) => {
  const classes = [];

  if (session && typeof session === "string") {
    // Normalize line breaks to spaces and strip superscripts
    const normalizedSession = session
      .replace(/\n/g, " ")
      .replace(/\s+/g, " ")
      .replace(/[¹²³⁴⁵⁶⁷⁸⁹⁰]/g, "") // Strip superscripts
      .toLowerCase()
      .trim();

    console.log(
      `SESSION CLASSIFICATION: "${session}" → "${normalizedSession}"`
    );

    // 1. Registration - light green
    if (normalizedSession.includes("registration")) {
      classes.push("registration-session");
    }
    // 2. Tutorial, Oral Session, Keynote - sky blue
    else if (
      normalizedSession.includes("tutorial") ||
      normalizedSession.includes("keynote") ||
      normalizedSession.includes("oral session")
    ) {
      classes.push("keynote-session"); // Use the sky blue class
    }
    // 2. Opening - beige (same as Lunch)
    else if (normalizedSession.includes("opening")) {
      classes.push("lunch-session");
    }
    // 3. Poster Session - lavender
    else if (normalizedSession.includes("poster session")) {
      classes.push("poster-session");
    }
    // 4. Industry Session - light green; Industry Meetup is beige (same as Lunch)
    else if (normalizedSession.includes("industry")) {
      if (normalizedSession.includes("meetup")) {
        classes.push("lunch-session"); // Industry Meetup uses the same color as Lunch
      } else {
        classes.push("industry-session"); // Regular Industry Session is light green
      }
    }
    // 5. Lunch - beige
    else if (normalizedSession.includes("lunch")) {
      classes.push("lunch-session");
    }
    // 6. Coffee (coffee only) - light brown
    else if (
      normalizedSession.includes("coffee") &&
      !normalizedSession.includes("poster")
    ) {
      classes.push("Coffee-session");
    }
    // 7. Coffee + Poster - lavender (matches Poster)
    else if (
      normalizedSession.includes("coffee") &&
      normalizedSession.includes("poster")
    ) {
      classes.push("poster-session");
    }
    // 8. Social Events - coral pink
    else if (
      normalizedSession.includes("welcome") ||
      normalizedSession.includes("reception") ||
      normalizedSession.includes("banquet") ||
      normalizedSession.includes("jam") ||
      normalizedSession.includes("rencon") ||
      normalizedSession.includes("music program") ||
      normalizedSession.includes("k-culture") ||
      normalizedSession.includes("culture night") ||
      normalizedSession.includes("korean") ||
      normalizedSession.includes("traditional music") ||
      normalizedSession.includes("concert") ||
      (normalizedSession.includes("ismir") &&
        normalizedSession.includes("music"))
    ) {
      classes.push("social-session");
    }
    // 9. Closing/Award/Society meeting - light green
    else if (
      normalizedSession.includes("closing") ||
      normalizedSession.includes("award") ||
      normalizedSession.includes("society meeting")
    ) {
      classes.push("ceremony-session");
    }
    // 10. Special Events - mint
    else if (
      normalizedSession.includes("llm4ma") ||
      normalizedSession.includes("dlfm") ||
      normalizedSession.includes("hcmir")
    ) {
      classes.push("special-event-session");
    }
    // 11. WIMIR/Diversity - purple
    else if (
      normalizedSession.includes("wimir") ||
      normalizedSession.includes("special session")
    ) {
      classes.push("diversity-session");
    }
    // 12. Late-Breaking/Demo - lavender (same as Poster Session)
    else if (
      normalizedSession.includes("late-breaking") ||
      normalizedSession.includes("demo")
    ) {
      classes.push("poster-session");
    }
    // 13. Unconference - special event (mint)
    else if (normalizedSession.includes("unconference")) {
      classes.push("special-event-session");
    }
    // Default: keep the session column style
  }

  return classes.join(" ");
};

// Analyze the hardcoded data structure (simple version)
// eslint-disable-next-line no-unused-vars
const analyzeDataStructure = () => {
  console.log("=== Hardcoded data analysis ===");
  console.log("Skipping merge analysis for hardcoded data.");
  console.log("=== END ANALYSIS ===");
};

// Detect vertical blocks in the CSV data and compute rowspan
// eslint-disable-next-line no-unused-vars
const getSessionInfo = (cellValue, currentRowIndex, currentColIndex) => {
  if (!cellValue || typeof cellValue !== "string") {
    return { rowspan: 1, isSpanned: false, sessionType: "" };
  }

  const trimmedValue = cellValue.trim();
  if (!trimmedValue || trimmedValue.toLowerCase() === "end") {
    return { rowspan: 1, isSpanned: false, sessionType: "" };
  }

  // Compute rowspan in the current column up to the next "End" or a different event
  const allRows = tableData.value.rows;
  const actualColIndex = currentColIndex + 1; // Skip the time column

  let rowspan = 1;
  for (let i = currentRowIndex + 1; i < allRows.length; i++) {
    const nextCell =
      allRows[i] && allRows[i][actualColIndex]
        ? allRows[i][actualColIndex].trim()
        : "";

    if (nextCell === "" || nextCell === trimmedValue) {
      // Keep extending through empty cells or the same event
      rowspan++;
    } else if (nextCell.toLowerCase() === "end") {
      // On "End", include that row and stop
      rowspan++;
      break;
    } else {
      // On a different event, stop at the previous row
      break;
    }
  }

  console.log(
    `ROWSPAN calc: "${trimmedValue}" | Row ${currentRowIndex}, Col ${actualColIndex} | Rowspan: ${rowspan}`
  );

  return {
    rowspan,
    isSpanned: false,
    sessionType: rowspan > 1 ? "merged-block" : "single-cell",
  };
};

// Simple rowspan calculation for hardcoded data
// eslint-disable-next-line no-unused-vars
const calculateDynamicRowspan = (currentRowIndex, currentColIndex, allRows) => {
  // Hardcoded data occupies a single row by default
  return 1;
};

// Simple event handling for hardcoded data
// eslint-disable-next-line no-unused-vars
const getColumnEvents = (colIndex, allRows) => {
  // Return an empty array for hardcoded data
  return [];
};

// Find the row index for a given time
// eslint-disable-next-line no-unused-vars
const findRowIndexByTime = (targetTime, allRows) => {
  for (let i = 0; i < allRows.length; i++) {
    if (allRows[i] && allRows[i][0] === targetTime) {
      return i;
    }
  }
  return -1;
};

// Process table rows to build a cell structure with rowspan applied
const getProcessedRows = () => {
  if (!tableData.value.rows || tableData.value.rows.length === 0) return [];

  const rows = [];
  const spannedCells = new Set(); // Track cells already hidden by a span

  for (let rowIndex = 0; rowIndex < tableData.value.rows.length; rowIndex++) {
    const originalRow = tableData.value.rows[rowIndex];
    if (!originalRow) continue;

    const processedRow = {
      originalRow,
      cells: [],
    };

    // Process the session columns (excluding the time column)
    for (let colIndex = 1; colIndex < originalRow.length; colIndex++) {
      const cellKey = `${rowIndex}-${colIndex}`;

      if (spannedCells.has(cellKey)) {
        // Hide cells already covered by a previous row's rowspan
        processedRow.cells.push({
          value: "",
          hidden: true,
          rowspan: 1,
          colspan: 1,
          isClickable: false,
        });
        continue;
      }

      const cellValue = originalRow[colIndex] || "";

      // Hide "End" markers (they are covered by the rowspan)
      if (cellValue && cellValue.trim().toLowerCase() === "end") {
        processedRow.cells.push({
          value: "",
          hidden: true,
          rowspan: 1,
          colspan: 1,
          isClickable: false,
        });
        continue;
      }

      const sessionInfo = getSessionInfo(cellValue, rowIndex, colIndex - 1); // colIndex - 1 because we're excluding time column

      // Apply rowspan
      if (sessionInfo.rowspan > 1) {
        // Add the other rows this cell will occupy to spannedCells
        for (
          let r = rowIndex + 1;
          r < rowIndex + sessionInfo.rowspan && r < tableData.value.rows.length;
          r++
        ) {
          spannedCells.add(`${r}-${colIndex}`);
        }
      }

      processedRow.cells.push({
        value: cellValue,
        hidden: false,
        rowspan: sessionInfo.rowspan,
        colspan: 1,
        isClickable: isValidEvent(cellValue),
      });
    }

    rows.push(processedRow);
  }

  return rows;
};

// Load the hardcoded data
const loadSheetData = async () => {
  loading.value = true;
  error.value = null;

  try {
    // Use the hardcoded data
    sheetData.value = hardcodedProgramData;

    // Merged cell info is not supported for hardcoded data, so use an empty object
    mergedCellsInfo.value = {};

    // Hardcoded data has no merge info, so no extra handling
    // googleSheetsService.getMergedCellsInfo(metadata.sheets, "Program");

    // Debug the data structure
    console.log("=== Hardcoded data debug ===");
    console.log("All data:", hardcodedProgramData);
    if (hardcodedProgramData && hardcodedProgramData.length > 0) {
      console.log("Row 1 (header):", hardcodedProgramData[0]);
      console.log("Row 2:", hardcodedProgramData[1]);
      console.log("Row 3:", hardcodedProgramData[2]);
      console.log("Row 4 (venue):", hardcodedProgramData[3]);
      console.log("Row 5:", hardcodedProgramData[4]);
      console.log("First data row:", hardcodedProgramData[5]);
    }
    console.log("=== Converted table data ===");
    const formatted = formatDataAsTable(hardcodedProgramData);
    console.log("Headers:", formatted.headers);
    console.log("Row count:", formatted.rows.length);
    if (formatted.rows.length > 0) {
      console.log("First row:", formatted.rows[0]);
      console.log("Second row:", formatted.rows[1]);
    }
    console.log("===================");
  } catch (err) {
    console.error("Data load error:", err);
    error.value = err.message || "An error occurred while loading the program.";
  } finally {
    loading.value = false;
  }
};

// Converts the hardcoded data into table format
const formatDataAsTable = (data) => {
  if (!data || data.length === 0) {
    return { headers: [], rows: [] };
  }

  // Use the first row (dates) as the header
  const headers = data[0] || [];

  // Actual data starts at the 4th row (index 3, 0-based)
  const rows = data.slice(4) || [];

  return {
    headers,
    rows,
  };
};

// Cell click handler
const handleCellClick = (
  event,
  cellValue,
  rowIndex,
  cellIndex,
  isClickable
) => {
  if (isClickable) {
    showCalendarMenu(event, cellValue, rowIndex, cellIndex);
  }
};

// Calendar menu display handler
const showCalendarMenu = (event, cellValue, rowIndex, cellIndex) => {
  // Check whether this is a valid event
  if (!isValidEvent(cellValue)) {
    return;
  }

  // Get the time info for this row
  const timeString = tableData.value.rows[rowIndex][0];
  if (!timeString) {
    console.warn("Time information not found");
    return;
  }

  // Column index starts at 1 (excluding the time column)
  const columnIndex = cellIndex + 1;

  console.log("Cell click debug:", {
    cellValue,
    cellIndex,
    columnIndex,
    timeString,
    rowIndex,
  });

  // Build the event data
  const eventData = {
    title: cellValue,
    timeString: timeString,
    columnIndex: columnIndex,
  };

  // Position the menu (relative to the click, respecting screen bounds)
  const menuWidth = 300;
  const menuHeight = 200;
  const padding = 10;

  let x = event.clientX;
  let y = event.clientY;

  // Shift left if it overflows the right edge of the screen
  if (x + menuWidth > window.innerWidth) {
    x = window.innerWidth - menuWidth - padding;
  }

  // Shift up if it overflows the bottom edge of the screen
  if (y + menuHeight > window.innerHeight) {
    y = window.innerHeight - menuHeight - padding;
  }

  // Enforce a minimum position
  x = Math.max(padding, x);
  y = Math.max(padding, y);

  menuPosition.value = { x, y };

  // Store the selected event data
  selectedEventData.value = eventData;

  // Open the menu
  calendarMenuOpen.value = true;
};

// Return the calendar icon
const getCalendarIcon = (calendarId) => {
  const icons = {
    google: "mdi-google",
    outlook: "mdi-microsoft-outlook",
    apple: "mdi-apple",
    download: "mdi-download-circle",
  };
  return icons[calendarId] || "mdi-calendar";
};

// Return the calendar name (English)
const getCalendarName = (calendarId) => {
  const names = {
    google: "Google Calendar",
    outlook: "Microsoft Outlook",
    apple: "Apple Calendar",
    download: "Download ICS File",
  };
  return names[calendarId] || "Calendar";
};

// Calendar selection handler
const handleCalendarSelection = async (calendar) => {
  // Close the menu
  calendarMenuOpen.value = false;

  if (!selectedEventData.value) {
    console.error("No event data selected");
    return;
  }

  try {
    const calendarName = getCalendarName(calendar.id);
    console.log(`${calendarName} selected:`, selectedEventData.value);

    if (calendar.id === "download") {
      // Download ICS file
      downloadICSFile(selectedEventData.value);
    } else if (calendar.id === "google") {
      // Open Google Calendar
      const url = generateGoogleCalendarUrl(selectedEventData.value);
      window.open(url, "_blank");
    } else if (calendar.id === "outlook") {
      // Open Outlook
      const url = generateOutlookUrl(selectedEventData.value);
      window.open(url, "_blank");
    } else if (calendar.id === "apple") {
      // Apple Calendar (iOS)
      const url = generateAppleCalendarUrl(selectedEventData.value);
      window.location.href = url;
    }
  } catch (error) {
    const calendarName = getCalendarName(calendar.id);
    console.error(`Error adding to ${calendarName}:`, error);
    // Fallback: download ICS
    downloadICSFile(selectedEventData.value);
  }
};

// Collect all valid events (deduplicated)
const getAllValidEvents = () => {
  const allEvents = [];
  const seenEvents = new Set(); // Set used for deduplication

  if (!tableData.value.rows || tableData.value.rows.length === 0) {
    return allEvents;
  }

  // Iterate over all rows and columns to find valid events
  for (let rowIndex = 0; rowIndex < tableData.value.rows.length; rowIndex++) {
    const row = tableData.value.rows[rowIndex];
    if (!row) continue;

    const timeString = row[0]; // Time info
    if (!timeString) continue;

    // Check the session columns, excluding the time column (starting at 1)
    for (let colIndex = 1; colIndex < row.length; colIndex++) {
      const cellValue = row[colIndex];

      if (isValidEvent(cellValue)) {
        // Normalize the event type by stripping superscripts
        const normalizedTitle = cellValue
          .replace(/[¹²³⁴⁵⁶⁷⁸⁹⁰]/g, "")
          .replace(/\n/g, " ")
          .replace(/\s+/g, " ")
          .trim();

        // Get the date info (based on column)
        const dateStr = getDateFromColumnIndex(colIndex);

        // Build a unique key for duplicate checking
        const eventKey = `${normalizedTitle}-${dateStr}`;

        // Check whether this event was already processed
        if (!seenEvents.has(eventKey)) {
          seenEvents.add(eventKey);

          const eventData = {
            title: cellValue,
            timeString: timeString,
            columnIndex: colIndex, // 1-based index
          };

          allEvents.push(eventData);
        }
      }
    }
  }

  return allEvents;
};

// Get the date info from a column index
const getDateFromColumnIndex = (columnIndex) => {
  const COLUMN_TO_DATE = {
    1: "9/20", // Satellite
    2: "9/21", // Tutorial
    3: "9/22", // Conference Day 1
    4: "9/23", // Conference Day 2
    5: "9/24", // Conference Day 3
    6: "9/25", // Conference Day 4
    7: "9/26", // Satellite (KAIST)
    8: "9/26", // Satellite (Sogang)
  };
  return COLUMN_TO_DATE[columnIndex] || "unknown";
};

// Download the full schedule
const downloadAllEvents = async () => {
  downloadingAll.value = true;

  try {
    const allEvents = getAllValidEvents();

    if (allEvents.length === 0) {
      alert("No events available for download.");
      return;
    }

    console.log(`Starting download of ${allEvents.length} events`);

    // Download merged ICS file
    await downloadMergedICSFile(allEvents, "ISMIR2025_Complete_Schedule.ics");

    // Success message
    alert(
      `ISMIR 2025 complete schedule has been downloaded! (${allEvents.length} events total)`
    );
  } catch (error) {
    console.error("Error downloading complete schedule:", error);
    alert(
      "An error occurred while downloading the complete schedule. Please try again."
    );
  } finally {
    downloadingAll.value = false;
  }
};

// Load data when the component mounts
onMounted(() => {
  loadSheetData();
});
</script>

<style scoped>
/* Allow line wrapping so the title is not cut off */
.v-card-title {
  white-space: normal !important;
  word-break: break-word !important;
  line-height: 1.4 !important;
}

/* Adjust the title font size on mobile */
@media (max-width: 768px) {
  .v-card-title {
    font-size: 1.5rem !important;
  }
}

@media (max-width: 480px) {
  .v-card-title {
    font-size: 1.25rem !important;
  }
}

.sheets-container {
  position: relative;
  width: 100%;
  overflow: hidden;
  margin: 0;
  padding: 0;
}

/* Table container */
.table-container {
  width: 100%;
}

/* Venue Legend (above the table) styling */
.venue-legend-top {
  margin-bottom: 20px;
}

.legend-card {
  width: 100%;
  max-width: none;
  border: 2px solid #e0e0e0 !important;
  overflow: hidden;
}

/* Horizontal legend layout style */
.legend-items-row {
  display: flex;
  flex-wrap: nowrap;
  gap: 12px;
  justify-content: flex-start;
  align-items: stretch;
  overflow-x: auto;
}

.legend-item-compact {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 12px;
  border-radius: 8px;
  background: #ffffff;
  border: 2px solid #e0e0e0;
  transition: all 0.3s ease;
  min-width: 180px;
  flex-shrink: 0;
}

.legend-item-compact:hover {
  background: #f8f9fa;
  border-color: #1976d2;
}

.legend-info-compact {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.legend-title {
  font-size: 1.1rem !important;
  font-weight: 700 !important;
  padding: 16px 20px 12px 20px !important;
  background: #f5f5f5;
  color: #1565c0 !important;
  border-bottom: 2px solid #e0e0e0;
}

.legend-content {
  padding: 16px 20px 16px 20px !important;
  background: #fafafa;
}

.legend-item {
  display: flex;
  align-items: flex-start;
  margin-bottom: 12px;
  padding: 8px;
  border-radius: 8px;
  background: #fafafa;
  transition: background-color 0.2s;
}

.legend-item:hover {
  background: #f0f0f0;
}

.legend-symbol {
  font-size: 1.4rem;
  font-weight: 900;
  color: #ffffff;
  background: #1976d2;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.legend-info {
  flex: 1;
}

.legend-name {
  font-weight: 700;
  color: #1a1a1a;
  font-size: 0.95rem;
  line-height: 1.4;
}

.legend-full-name {
  font-size: 0.75rem;
  color: #666;
  margin-top: 2px;
  line-height: 1.2;
}

.legend-map-link {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 0.8rem;
  font-weight: 600;
  color: #1976d2;
  text-decoration: none;
  margin-top: 6px;
  padding: 4px 8px;
  border-radius: 6px;
  background: rgba(25, 118, 210, 0.1);
  transition: all 0.2s ease;
}

.legend-map-link:hover {
  color: #ffffff;
  background: #1976d2;
  text-decoration: none;
}

/* Enable horizontal scrolling on mobile */
@media (max-width: 768px) {
  .sheets-container {
    overflow-x: auto;
    overflow-y: hidden;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: thin;
    scrollbar-color: #ccc #f0f0f0;
  }

  .legend-items-row {
    flex-direction: column;
    gap: 8px;
  }

  .legend-item-compact {
    min-width: auto;
    width: 100%;
  }

  .sheets-container::-webkit-scrollbar {
    height: 8px;
  }

  .sheets-container::-webkit-scrollbar-track {
    background: #f0f0f0;
    border-radius: 4px;
  }

  .sheets-container::-webkit-scrollbar-thumb {
    background: #ccc;
    border-radius: 4px;
  }

  .sheets-container::-webkit-scrollbar-thumb:hover {
    background: #999;
  }

  /* Scroll indicator style */
  .sheets-container {
    position: relative;
  }

  .sheets-container::after {
    content: "← Scroll left or right →";
    position: absolute;
    bottom: -25px;
    left: 50%;
    transform: translateX(-50%);
    font-size: 0.7rem;
    color: #666;
    background: rgba(255, 255, 255, 0.9);
    padding: 2px 8px;
    border-radius: 10px;
    opacity: 0.8;
    pointer-events: none;
    white-space: nowrap;
    z-index: 1;
  }
}

/* Daily program schedule table styling */
.program-table {
  width: 100%;
  border-collapse: collapse;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  background: white;
  font-size: 1rem;
  table-layout: fixed; /* Fixed table layout keeps column widths consistent */
  border: 1px solid #000000; /* Outer border of the whole table */
}

/* Set the table minimum width on mobile */
@media (max-width: 768px) {
  .program-table {
    min-width: 800px; /* Minimum width so all columns are visible */
    table-layout: auto; /* Switch to auto layout on mobile */
  }
}

.program-table thead {
  background: #e7e7e7;
  color: #000000;
  font-weight: 600;
  position: sticky;
  top: 0;
  z-index: 10;
}

.time-header {
  padding: 16px 8px;
  border-right: 1px solid #000000;
  background-color: #ffffff;
  text-align: center;
  font-size: 0.875rem;
  min-height: 120px; /* Taller to fit the 4-row header */
  vertical-align: middle;
  width: 120px; /* Fixed time column width */
  font-weight: 700;
  box-shadow: none;
}

/* 4-row header style - gray tone hierarchy */

/* First row: date (darkest gray) */
.date-row {
  background: #d0d0d0;
  color: #000000;
}

.date-cell {
  padding: 8px 4px;
  border-right: 1px solid #000000;
  border-bottom: 1px solid #000000;
  text-align: center;
  vertical-align: middle;
  width: var(--session-column-width, calc((100% - 120px) / 8));
  font-size: 1rem;
  font-weight: 800;
  background-color: #d0d0d0;
  line-height: 1.2;
  letter-spacing: 0.5px;
}

/* Second row: day of week (mid-tone gray) */
.day-row {
  background: #e0e0e0;
  color: #000000;
}

.day-cell {
  padding: 6px 4px;
  border-right: 1px solid #000000;
  border-bottom: 1px solid #000000;
  text-align: center;
  vertical-align: middle;
  width: var(--session-column-width, calc((100% - 120px) / 8));
  font-size: 0.9rem;
  font-weight: 600;
  background-color: #e0e0e0;
  line-height: 1.2;
  text-transform: uppercase;
}

/* Third row: event type (light gray) */
.event-type-row {
  background: #e7e7e7;
  color: #000000;
}

.event-type-cell {
  padding: 6px 4px;
  border-right: 1px solid #000000;
  border-bottom: 1px solid #000000;
  text-align: center;
  vertical-align: middle;
  width: var(--session-column-width, calc((100% - 120px) / 8));
  font-size: 0.85rem;
  font-weight: 600;
  background-color: #e7e7e7;
  color: #000000;
}

/* Fourth row: venue (lightest gray) */
.venue-row {
  background: #f5f5f5;
  color: #000000;
}

.venue-cell {
  padding: 6px 4px;
  border-right: 1px solid #000000;
  border-bottom: 1px solid #000000;
  text-align: center;
  vertical-align: middle;
  width: var(--session-column-width, calc((100% - 120px) / 8));
  font-size: 0.8rem;
  font-weight: 500;
  background-color: #f5f5f5;
  color: #000000;
}

.venue-cell.main-venue {
  font-weight: 600;
}

.venue-cell.sogang-venue {
  font-size: 0.75rem;
  font-weight: 600;
}

.time-row {
  border-bottom: 1px solid #000000;
  border-top: 1px solid #000000;
  transition: background-color 0.2s;
  min-height: 33px;
}

.time-row:hover {
  background-color: #f5f5f5;
}

.time-cell {
  padding: 6px 8px;
  border-right: 1px solid #000000;
  background-color: #e7e7e7;
  font-weight: 600;
  text-align: center;
  color: #000000;
  vertical-align: middle;
  font-size: 0.9rem;
  white-space: nowrap;
  width: 120px; /* Fixed time column width */
}

.session-cell {
  padding: 4px 6px;
  border-right: 1px solid #000000;
  border-bottom: 1px solid #000000;
  background-color: white;
  text-align: center;
  vertical-align: middle;
  word-wrap: break-word;
  line-height: 1.3;
  font-size: 0.85rem;
  position: relative;
  overflow: hidden; /* Hide overflowing text */
  width: var(--session-column-width, calc((100% - 120px) / 8));
}

.session-content {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
}

/* Old header style removed - replaced by the multi-row header */

/* Time styles removed - all times share the same style */

/* Per-event color definitions - based on the provided color spectrum */

/* 1. Registration - light green: registration/check-in */
.registration-session {
  background-color: #e8f5e8 !important;
  color: #000000 !important;
  font-weight: 600 !important;
}

/* 2. Keynote, Tutorial, Oral Session - sky blue: academic/informational */
.keynote-session {
  background-color: #e6f2fd !important;
  color: #000000 !important;
  font-weight: 700 !important;
}

/* 2. Opening - beige: same color as Lunch */

/* 3. Poster Session - lavender: interaction/discussion */
.poster-session {
  background-color: #f3e5f5 !important;
  color: #000000 !important;
  font-weight: 600 !important;
}

/* 4. Industry Session - light green: practice/business */
.industry-session {
  background-color: #c8e6c9 !important;
  color: #000000 !important;
  font-weight: 600 !important;
}

/* 5. Lunch - beige: break/networking */
.lunch-session {
  background-color: #fff8dc !important;
  color: #000000 !important;
  font-weight: 600 !important;
  font-style: italic !important;
}

/* 6. Coffee - light brown: break/cafe */
.Coffee-session {
  background-color: #f5e6d3 !important;
  color: #000000 !important;
  font-weight: 600 !important;
  font-style: italic !important;
}

/* 7. Social Events - coral pink: social/fun */
.social-session {
  background-color: #ffb3ba !important;
  color: #000000 !important;
  font-weight: 600 !important;
}

/* 8. Closing/Award/Society meeting - light green: formal/ceremonial */
.ceremony-session {
  background-color: #c8e6c9 !important;
  color: #000000 !important;
  font-weight: 700 !important;
}

/* 9. Special Events - light orange: special/unique */
.special-event-session {
  background-color: #ffe0b2 !important;
  color: #000000 !important;
  font-weight: 600 !important;
}

/* 10. WIMIR/Diversity - light green: diversity/inclusion */
.diversity-session {
  background-color: #c8e6c9 !important;
  color: #000000 !important;
  font-weight: 600 !important;
}

/* 11. Late-Breaking/Demo - lavender: same as Poster Session */
.demo-session {
  background-color: #ffe0b2 !important;
  color: #000000 !important;
  font-weight: 600 !important;
}

/* Special session styling */
.break-session {
  background-color: #f3e5f5 !important;
  font-style: italic !important;
}

.time-column {
  font-weight: 600 !important;
  color: #1976d2 !important;
  white-space: nowrap;
}

/* Long session style */
.session-cell {
  position: relative;
}

/* Clickable session style */
.clickable-session {
  cursor: pointer !important;
  transition: all 0.2s ease !important;
  position: relative !important;
}

.clickable-session:hover {
  transform: scale(1.02) !important;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15) !important;
  z-index: 5 !important;
}

.clickable-session:active {
  transform: scale(0.98) !important;
}

/* Add a download icon hint to clickable sessions */
.clickable-session::after {
  content: "📅";
  position: absolute;
  top: 2px;
  right: 2px;
  font-size: 0.7rem;
  opacity: 0;
  transition: opacity 0.2s ease;
}

.clickable-session:hover::after {
  opacity: 0.7;
}

/* Responsive design */
@media (max-width: 1200px) {
  .date-cell {
    font-size: 0.9rem;
    padding: 6px 3px;
    line-height: 1.1;
  }

  .day-cell {
    font-size: 0.85rem;
    padding: 5px 3px;
  }

  .event-type-cell {
    font-size: 0.8rem;
    padding: 5px 3px;
  }

  .venue-cell {
    font-size: 0.75rem;
    padding: 5px 3px;
  }

  .venue-cell.sogang-venue {
    font-size: 0.8rem;
    font-weight: 600;
  }

  .session-cell {
    font-size: 0.85rem;
    padding: 4px 3px;
  }

  .time-cell {
    font-size: 0.85rem;
  }

  .time-header {
    font-size: 0.95rem;
    min-height: 105px; /* Adjusted for the 4-row header */
  }
}

@media (max-width: 768px) {
  .date-cell {
    font-size: 0.85rem;
    padding: 6px 4px;
    line-height: 1.2;
    min-width: 80px; /* Guarantee a minimum width */
  }

  .day-cell {
    font-size: 0.8rem;
    padding: 5px 4px;
    min-width: 80px;
  }

  .event-type-cell {
    font-size: 0.8rem;
    padding: 5px 4px;
    min-width: 80px;
  }

  .venue-cell {
    font-size: 0.75rem;
    padding: 5px 4px;
    min-width: 80px;
  }

  .venue-cell.sogang-venue {
    font-size: 0.75rem;
    font-weight: 600;
  }

  .session-cell {
    font-size: 0.75rem;
    padding: 4px 3px;
    min-width: 80px;
    line-height: 1.3;
  }

  .time-cell {
    font-size: 0.85rem;
    width: 80px; /* Wider time column on mobile */
    min-width: 80px;
    padding: 6px 4px;
  }

  .time-header {
    font-size: 0.9rem;
    min-height: 100px; /* Adjusted for the 4-row header */
    width: 80px; /* Wider time column on mobile */
    min-width: 80px;
  }
}

@media (max-width: 480px) {
  .date-cell {
    font-size: 0.8rem;
    padding: 5px 3px;
    line-height: 1.1;
    min-width: 75px;
  }

  .day-cell {
    font-size: 0.75rem;
    padding: 4px 3px;
    min-width: 75px;
  }

  .event-type-cell {
    font-size: 0.75rem;
    padding: 4px 3px;
    min-width: 75px;
  }

  .venue-cell {
    font-size: 0.7rem;
    padding: 4px 3px;
    min-width: 75px;
  }

  .venue-cell.sogang-venue {
    font-size: 0.7rem;
    font-weight: 600;
  }

  .session-cell {
    font-size: 0.7rem;
    padding: 3px 2px;
    min-width: 75px;
    line-height: 1.2;
  }

  .time-cell {
    font-size: 0.8rem;
    width: 75px; /* Time column width on mobile */
    min-width: 75px;
    padding: 5px 3px;
  }

  .time-header {
    font-size: 0.85rem;
    min-height: 85px; /* Adjusted for the 4-row header */
    width: 75px; /* Time column width on mobile */
    min-width: 75px;
  }

  /* Program table minimum width on very small screens */
  .program-table {
    min-width: 700px;
  }
}

/* Calendar menu style */
.calendar-menu-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.1);
  z-index: 9999;
  backdrop-filter: blur(1px);
}

.calendar-menu-card {
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15) !important;
  border-radius: 8px !important;
  animation: menuFadeIn 0.2s ease-out;
}

@keyframes menuFadeIn {
  from {
    opacity: 0;
    transform: scale(0.95) translateY(-10px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

.calendar-option {
  transition: all 0.2s ease !important;
  border-radius: 4px !important;
  margin: 2px 8px !important;
}

.calendar-option:hover {
  background-color: rgba(25, 118, 210, 0.08) !important;
  transform: translateX(4px);
}

.calendar-icon {
  font-size: 1.2rem;
  margin-right: 8px;
}
</style>
