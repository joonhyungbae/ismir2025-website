<template>
  <v-row justify="center" id="call-for-papers">
    <v-col cols="12" md="8">
      <v-card outlined elevation="0" class="pa-4 my-4">
        <v-card-title class="text-h4 mb-3 font-weight-bold"
          >12th International Conference on Digital Libraries for
          Musicology</v-card-title
        >

        <v-card-title class="text-h5 mb-3"
          >September 26th (Friday) at Sogang University, Seoul</v-card-title
        >
        <v-card-text class="text-body">
          <span class="highlight-bold-text"
            >More info on the workshop webpage:
          </span>
          <a
            href="https://dlfm.web.ox.ac.uk/"
            target="_blank"
            style="color: #1487c8"
          >
            https://dlfm.web.ox.ac.uk/
          </a>
          <br /><br />
          <span class="highlight-text"
            >The Digital Libraries for Musicology (DLfM) conference is the
            premiere venue for scholars engaging with digital libraries in the
            domain of music and musicology. It provides a forum for musicians,
            musicologists, librarians, and technologists to share findings and
            expertise.</span
          ><br /><br />
          While Digital Libraries have long offered facilities to provide
          multimedia content, the requirements of systems for library music are
          complex. The many forms taken by musical data, the needs for
          connections between these, and the importance of scholarly and
          historical contextual information all require special care to support
          meaningful engagement with the materials.<br /><br />
          The Digital Libraries for Musicology (DLfM) conference presents a
          venue specifically for those working on, and with, Digital Library
          systems and content in the domain of music and musicology. This
          includes Music Digital Library systems, their application and use in
          musicology, technologies for enhanced access and organisation of
          musics in Digital Libraries, bibliographic and metadata for music,
          intersections with music Linked Data, and the challenges of working
          with the multiple representations of music across large-scale digital
          collections such as the Internet Archive and HathiTrust.<br /><br />
          DLfM focuses on the implications of music for Digital Libraries and
          Digital Libraries research, especially when pushing the boundaries of
          contemporary musicology through the application of techniques from
          more technology-oriented fora such as ISMIR and ICMC. This instalment
          of DLfM conference follows previous conferences in Stellenbosch,
          Milan, Prague, Montreal, The Hague, Paris, New York, Shanghai,
          Knoxville and London. <br /><br />
          DLfM partners with IAML, ISMIR, and other conferences to encourage new
          collaborations and discussions surrounding prominent issues in our
          shared field. <br /><br />

          DLfM welcomes contributions related to any aspect of digital libraries
          and musicology, including topics related to musical archiving and
          retrieval, cataloguing and classification, musical databases, special
          collections, music encodings and representations, computational
          musicology, or music information retrieval (MIR).<br /><br />

          Topics of interest include, but are not limited to: <br /><br />
          <ul class="dot-list">
            <li>Building and managing digital music collections</li>
            <li>Access, interfaces, and ergonomics</li>
            <li>Musicological knowledge</li>
            <li>Improving data for musicology</li>
          </ul>
          <br />

          <span class="highlight-text">Important dates</span>

          <br /><br />
          <ul class="dot-list">
            <li>
              Provisional title, abstract, author list submission deadline: May
              9th, 2025
            </li>
            <li>
              Paper (full paper and short paper) submission deadline: Extended
              to May 16th, 2025
            </li>
            <li>Notification of paper acceptance: June 27th, 2025</li>
            <li>Poster submission deadline: July 12th, 2025</li>
            <li>
              Space for Music Libraries Challenge submission deadline: July
              12th, 2025
            </li>
            <li>
              Camera-ready submission deadline (full and short papers)*: July
              16th, 2025
            </li>
            <li>Conference registration deadline: September 19th, 2025</li>
            <li>Conference: September 26th, 2025, Seoul, South Korea</li>
          </ul>
          <br />
          <span class="highlight-text"
            >* At least one author must be registered by the camera-ready
            submission deadline in order for accepted submissions to be included
            in the conference programme.</span
          >
          <br /><br />
          All deadlines are at 23:59 AoE.
        </v-card-text>
      </v-card>
      <br /><br /><br />
    </v-col>
  </v-row>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      expandedPanels: [], // Array tracking the currently expanded panels
      sections: [
        {
          items: [
            { content: "Abstract Submission Due", date: "March 21, 2025" },
            { content: "Full Paper Submission Due", date: "March 28, 2025" },
            { content: "Acceptance Notification", date: "June 6, 2025" },
            { content: "Camera-Ready Upload Due", date: "June 28, 2025" },
          ],
        },
      ],
    };
  },
};
</script>

<style scoped>
.dot-list {
  list-style-type: disc; /* Bullet style */
  font-size: 18px;
  padding-left: 40px; /* Adjust indentation */
  line-height: 1.8;
}
.text-body {
  font-size: 18px; /* Adjust text font size */
  line-height: 1.6; /* Line spacing for readability */
  white-space: normal; /* Allow line wrapping */
  overflow-wrap: break-word; /* Wrap at word boundaries so words do not overflow the line */
}
.v-card-title {
  white-space: normal; /* Allow line wrapping in titles */
  overflow-wrap: break-word; /* Wrap so words are not cut off */
}
.styled-row {
  border-bottom: 1px solid #d3d3d3; /* Gray line */
  padding-bottom: 8px; /* Space between the line and the content */
}
/* Notion-style code block */
.code-block {
  background-color: #f5f5f5; /* Light gray background */
  border: 1px solid #e0e0e0; /* Light border */
  border-radius: 4px; /* Rounded corners */
  padding: 12px; /* Inner padding */
  font-family: "Noto Sans", sans-serif; /* Noto Sans font */
  font-size: 14px; /* Moderate text size */
  overflow-x: auto; /* Add scrolling for long code */
  white-space: pre-wrap; /* Wrap code lines */
}
.highlight-text {
  color: #004191;
  font-weight: bold;
}
.highlight-bold-text {
  color: #000000;
  font-weight: bold;
}
</style>
