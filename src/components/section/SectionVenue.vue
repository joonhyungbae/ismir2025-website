<template>
  <v-row justify="center" id="venue">
    <v-col cols="12" md="8">
      <v-card outlined elevation="0" class="pa-4 my-4">
        <v-card-title class="text-h4 mb-3 font-weight-bold">Venue</v-card-title>
        <v-card-text class="text-body">
          <!-- KAIST campus image -->
          <v-row class="my-4">
            <v-col cols="12">
              <v-img
                :src="require('@/assets/CoverImages/fhd/k1.webp')"
                alt="KAIST Campus"
                class="venue-image-optimized"
                aspect-ratio="16/9"
                cover
              ></v-img>
            </v-col>
          </v-row>
          <br />
          We are honored and proud to hold the 2025 edition of the 26th
          International Society for Music Information Retrieval Conference at
          the Korea Advanced Institute of Science and Technology (KAIST),
          located in Daejeon, South Korea.
          <br /><br />
          KAIST is a top-ranked public research university established in 1971
          as South Korea's first research-oriented science and engineering
          institution. It is ranked 53rd in the QS World University Rankings
          2025 and has been consistently recognized as one of the leading
          universities in Asia-Pacific for innovation and research excellence.
          The university has established itself as a global research hub,
          actively fostering international collaborations and attracting
          world-class researchers to advance scientific breakthroughs across
          multiple disciplines. KAIST Institutes is located in the middle of the
          KAIST Main Campus in the Daedeok Research Complex in the city of
          Daejeon, 150 kilometers south of the capital, Seoul.
          <br /><br />
          KAIST houses the Music and Audio Computing Lab, led by Professor Juhan
          Nam, who serves as one of the General Chairs for ISMIR 2025. The lab
          conducts cutting-edge research in music information retrieval, audio
          signal processing, and AI-based music analysis, with notable
          contributions including singing voice synthesis, multimodal music
          retrieval, and neural audio processing. The university's commitment to
          interdisciplinary research and its state-of-the-art facilities make it
          an ideal venue for advancing the field of music information retrieval.
          <br /><br />
          Strolling through the KAIST campus, you'll often spot geese leisurely
          grazing on the lawns. To reflect this iconic scenery of KAIST, a goose
          has been included in the ISMIR 2025 conference logo. We encourage you
          to keep an eye out for the geese roaming around campus—it's sure to
          add another layer of enjoyment to your visit! 🦢
        </v-card-text>

        <br />
        <v-divider></v-divider>
        <br />
      </v-card>

      <v-card outlined elevation="0" class="pa-4 my-4">
        <v-card-title class="text-h4 mb-3 font-weight-bold"
          >Conference Venues</v-card-title
        >
        <v-card-text class="text-body">
          The ISMIR 2025 conference will be held at KAIST's main campus in
          Daejeon, approximately 150 kilometers south of Seoul.
          <br /><br />

          <!-- Venues laid out as cards -->
          <v-row class="my-4">
            <!-- Tutorial Sessions Venue -->
            <v-col cols="12" lg="6">
              <v-card class="venue-card pa-4" elevation="2">
                <v-card-title class="text-h6 highlight-text mb-3">
                  Tutorial Sessions
                </v-card-title>
                <v-card-subtitle class="text-subtitle-1 mb-3">
                  September 21 @ KAIST Creative Learning Building E11
                </v-card-subtitle>

                <!-- E11 image -->
                <v-img
                  :src="require('@/assets/E11.png')"
                  alt="Creative Learning Building E11"
                  class="venue-card-image mb-3"
                ></v-img>

                <!-- E11 Google Map -->
                <div class="map-container mb-2">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3213.8!2d127.3625834!3d36.3703695!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x35654bc9c84e5adb%3A0xf0cf3620fc28fc1d!2sCreative%20Learning%20Building%20E11!5e0!3m2!1sen!2skr!4v1635000000000!5m2!1sen!2skr"
                    width="100%"
                    height="220"
                    style="border: 0"
                    allowfullscreen=""
                    loading="lazy"
                    referrerpolicy="no-referrer-when-downgrade"
                    class="google-map-embed"
                  >
                  </iframe>
                </div>
              </v-card>
            </v-col>

            <!-- Main Conference Venue -->
            <v-col cols="12" lg="6">
              <v-card class="venue-card pa-4" elevation="2">
                <v-card-title class="text-h6 highlight-text mb-3">
                  Main Conference Program
                </v-card-title>
                <v-card-subtitle class="text-subtitle-1 mb-3">
                  September 22-25 @ KAIST Main Auditorium E15
                </v-card-subtitle>

                <!-- E15 image -->
                <v-img
                  :src="require('@/assets/E15.webp')"
                  alt="Main auditorium E15"
                  class="venue-card-image mb-3"
                ></v-img>

                <!-- E15 Google Map -->
                <div class="map-container mb-2">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3213.7!2d127.3629259!3d36.3720843!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x35654bc98a6db1a1%3A0x8f5575e3fc5de4e7!2sKAIST%20E15%20%EB%8C%80%EA%B0%95%EB%8B%B9%2C%20%EB%8C%80%EC%A0%84%EA%B4%91%EC%97%AD%EC%8B%9C%20%EC%9C%A0%EC%84%B1%EA%B5%AC%20%EC%98%A8%EC%B2%9C2%EB%8F%99!5e0!3m2!1sko!2skr!4v1735000000000!5m2!1sko!2skr"
                    width="100%"
                    height="220"
                    style="border: 0"
                    allowfullscreen=""
                    loading="lazy"
                    referrerpolicy="no-referrer-when-downgrade"
                    class="google-map-embed"
                  >
                  </iframe>
                </div>
              </v-card>
            </v-col>

            <!-- Welcome Reception Venue -->
            <v-col cols="12" lg="6">
              <v-card class="venue-card pa-4" elevation="2">
                <v-card-title class="text-h6 highlight-text mb-3">
                  Welcome Reception
                </v-card-title>
                <v-card-subtitle class="text-subtitle-1 mb-3">
                  Sep 21 (Sun) 18:30 - 21:00 @ Golfzon Zoimaru
                </v-card-subtitle>

                <!-- Zoimaru image -->
                <v-img
                  :src="require('@/assets/Venue/zoimaru.jpg')"
                  alt="Golfzon Zoimaru"
                  class="venue-card-image mb-3"
                ></v-img>

                <!-- Zoimaru Google Map -->
                <div class="map-container mb-2">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d2672.5016382088193!2d127.38668181435982!3d36.374281945767635!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3565498f9d9e5fc7%3A0xee322d1ac4eefeb5!2z6rOo7ZSE7KG0IOyhsOydtOuniOujqA!5e0!3m2!1sko!2skr!4v1755760756061!5m2!1sko!2skr"
                    width="100%"
                    height="220"
                    style="border: 0"
                    allowfullscreen=""
                    loading="lazy"
                    referrerpolicy="no-referrer-when-downgrade"
                    class="google-map-embed"
                  >
                  </iframe>
                </div>
              </v-card>
            </v-col>

            <!-- Banquet & Jam Session Venue -->
            <v-col cols="12" lg="6">
              <v-card class="venue-card pa-4" elevation="2">
                <v-card-title class="text-h6 highlight-text mb-3">
                  Banquet & Jam Session
                </v-card-title>
                <v-card-subtitle class="text-subtitle-1 mb-3">
                  Sep 24 (Wed) 19:30 - 22:00 @ ICC Hotel
                </v-card-subtitle>

                <!-- ICC Hotel image -->
                <v-img
                  :src="require('@/assets/ICC_1.jpg')"
                  alt="ICC Hotel"
                  class="venue-card-image mb-3"
                ></v-img>

                <!-- ICC Hotel Google Map -->
                <div class="map-container mb-2">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3213.4!2d127.3926565!3d36.3769613!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3565498fe8b3e435%3A0x4601bcf4eb4f2181!2s%ED%98%B8%ED%85%94ICC!5e0!3m2!1sko!2skr!4v1735000000000!5m2!1sko!2skr"
                    width="100%"
                    height="220"
                    style="border: 0"
                    allowfullscreen=""
                    loading="lazy"
                    referrerpolicy="no-referrer-when-downgrade"
                    class="google-map-embed"
                  >
                  </iframe>
                </div>
              </v-card>
            </v-col>
          </v-row>

          <br />
          KAIST's main auditorium is renowned for hosting diverse cultural
          events and has welcomed world-class musicians including soprano Sumi
          Jo and pianist Yunchan Lim, making it a prestigious venue that bridges
          the worlds of technology and the arts.
          <br />
        </v-card-text>
        <br />
        <v-divider></v-divider>
        <br />
      </v-card>

      <br /><br /><br />
    </v-col>
  </v-row>
</template>

<script>
export default {
  components: {},
  data() {
    return {};
  },
};
</script>

<style scoped>
.dot-list {
  list-style-type: disc; /* Bullet style */
  font-size: 18px;
  padding-left: 40px; /* Indentation */
  line-height: 1.8;
}
.text-body {
  font-size: 18px; /* Text font size */
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
  padding: 12px; /* Inner padding */
  font-family: "Noto Sans", sans-serif; /* Noto Sans font */
  font-size: 14px; /* Moderate text size */
  overflow-x: auto; /* Scroll for long code */
  white-space: pre-wrap; /* Wrap code lines */
}
.highlight-text {
  color: #004191;
  font-weight: bold;
}
.venue-image {
  max-height: 400px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}
.venue-image-optimized {
  width: 100%;
  transition: transform 0.3s ease;
}
.venue-image-optimized:hover {
  transform: translateY(-2px);
}
.venue-image-fixed-height {
  width: 100%;
  height: 300px;
  transition: transform 0.3s ease;
}
.venue-image-fixed-height:hover {
  transform: translateY(-2px);
}
.google-map-embed {
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}
.venue-card {
  border-radius: 12px !important;
}
.venue-card-image {
  width: 100%;
  border-radius: 8px;
  overflow: hidden;
}
.venue-card .v-card-title {
  padding-bottom: 0;
}
.venue-card .v-card-subtitle {
  opacity: 0.8;
  font-size: 0.9rem;
  margin-bottom: 8px;
}
.map-container {
  position: relative;
  border-radius: 8px;
  overflow: hidden;
  background-color: #f5f5f5;
  margin-top: 8px;
}
.map-container-large {
  position: relative;
  border-radius: 12px;
  overflow: hidden;
  background-color: #f5f5f5;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}
.google-map-embed-large {
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}
</style>
