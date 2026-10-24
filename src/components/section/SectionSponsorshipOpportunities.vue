<template>
  <v-row justify="center" id="call-for-papers">
    <v-col cols="12" md="8">
      <!-- 1) Call for Sponsors area -->
      <v-card outlined elevation="0" class="pa-4 my-4">
        <v-card-title class="text-h4 mb-3 font-weight-bold">
          Call for Sponsors
        </v-card-title>

        <!-- Intro text -->
        <v-card-text class="text-body">
          We are excited to announce the Call for Sponsors for the 26th
          International Society for Music Information Retrieval Conference
          (ISMIR 2025), taking place in Daejeon, Korea, from September 21–25,
          2025.
        </v-card-text>

        <v-card-text class="text-body mt-3">
          The International Society for Music Information Retrieval Conference
          (ISMIR 2025) is an annual gathering of researchers, engineers,
          artists, and industry professionals from across the globe. Sponsoring
          ISMIR 2025 offers a valuable opportunity to present your latest
          technologies to the MIR community, engage with top talent in the
          field, and stay at the forefront of innovation in the industry.
        </v-card-text>
        <v-card-text class="text-body">
          The deadline for expressing your interest to sponsor ISMIR 2025 and/or
          WIMIR will be on
          <span class="highlight-text">August 15, 2025.</span>
        </v-card-text>
        <!-- PDF download button (placed near the top) -->
        <!-- 
        <v-card-text class="text-center mt-5">
          <v-btn
            disabled
            large
            rounded
            style="
              background-color: #9e9e9e;
              color: #fff;
              width: 100%;
              font-weight: bold;
              font-size: 18px;
            "
            class="px-10"
          >
            Download Detailed PDF
          </v-btn>
        </v-card-text>
        -->

        <br />
        <v-divider></v-divider>
      </v-card>

      <!-- 2) Sponsorship Packages area -->
      <v-card outlined elevation="0" class="pa-4 my-4">
        <v-card-title class="text-h4 mb-3 font-weight-bold">
          Sponsorship Packages
        </v-card-title>

        <v-card-text class="text-body">
          Sponsorship packages are available at the Platinum, Gold, Silver, and
          Bronze levels, each designed to offer meaningful visibility and
          engagement. We also offer the opportunity to support
          <span class="highlight-text">WIMIR (Widening Inclusion in MIR)</span>
          initiatives.
        </v-card-text>

        <v-card-text class="text-body mt-3">
          Please find the benefits for Conference Sponsorship and WIMIR
          Sponsorship below.
        </v-card-text>

        <!-- =============== ISMIR Sponsorship Table =============== -->
        <v-card-text class="text-body mt-5">
          <h3>ISMIR Sponsorship Packages</h3>
          <v-container class="table-container" fluid>
            <!-- Header row -->
            <v-row class="table-row styled-row table-header">
              <v-col cols="4">Tier</v-col>
              <v-col cols="2" class="text-center header-medium">Platinum</v-col>
              <v-col cols="2" class="text-center">Gold</v-col>
              <v-col cols="2" class="text-center">Silver</v-col>
              <v-col cols="2" class="text-center">Bronze</v-col>
            </v-row>

            <v-row class="table-row styled-row">
              <v-col cols="4">Price</v-col>
              <v-col cols="2" class="text-center">$10,000</v-col>
              <v-col cols="2" class="text-center">$7,000</v-col>
              <v-col cols="2" class="text-center">$4,000</v-col>
              <v-col cols="2" class="text-center">$2,000</v-col>
            </v-row>

            <v-row class="table-row styled-row">
              <v-col cols="4">Full conference registration</v-col>
              <v-col cols="2" class="text-center">6</v-col>
              <v-col cols="2" class="text-center">4</v-col>
              <v-col cols="2" class="text-center">2 + α</v-col>
              <v-col cols="2" class="text-center">1 + α</v-col>
            </v-row>

            <v-row class="table-row styled-row">
              <v-col cols="4">1-day registration</v-col>
              <v-col cols="2" class="text-center">3</v-col>
              <v-col cols="2" class="text-center">2</v-col>
              <v-col cols="2" class="text-center">1</v-col>
              <v-col cols="2" class="text-center">0</v-col>
            </v-row>

            <v-row class="table-row styled-row">
              <v-col cols="4">Presentation</v-col>
              <v-col cols="2" class="text-center">✅</v-col>
              <v-col cols="2" class="text-center">✅</v-col>
              <v-col cols="2" class="text-center">α</v-col>
              <v-col cols="2" class="text-center">.</v-col>
            </v-row>

            <v-row class="table-row styled-row">
              <v-col cols="4">Booth</v-col>
              <v-col cols="2" class="text-center">4d</v-col>
              <v-col cols="2" class="text-center">4d</v-col>
              <v-col cols="2" class="text-center">1day + α</v-col>
              <v-col cols="2" class="text-center">α</v-col>
            </v-row>

            <v-row class="table-row styled-row">
              <v-col cols="4">Sponsorship logo</v-col>
              <v-col cols="2" class="text-center">Large</v-col>
              <v-col cols="2" class="text-center">Medium</v-col>
              <v-col cols="2" class="text-center">Small</v-col>
              <v-col cols="2" class="text-center">Small</v-col>
            </v-row>

            <v-row class="table-row styled-row">
              <v-col cols="4">Logo on conference bag</v-col>
              <v-col cols="2" class="text-center">✅</v-col>
              <v-col cols="2" class="text-center">.</v-col>
              <v-col cols="2" class="text-center">.</v-col>
              <v-col cols="2" class="text-center">.</v-col>
            </v-row>

            <v-row class="table-row styled-row">
              <v-col cols="4">Acknowledgement on social media</v-col>
              <v-col cols="2" class="text-center">✅</v-col>
              <v-col cols="2" class="text-center">✅</v-col>
              <v-col cols="2" class="text-center">✅</v-col>
              <v-col cols="2" class="text-center">✅</v-col>
            </v-row>

            <v-row class="table-row styled-row">
              <v-col cols="4">Access to CV pool</v-col>
              <v-col cols="2" class="text-center">✅</v-col>
              <v-col cols="2" class="text-center">✅</v-col>
              <v-col cols="2" class="text-center">.</v-col>
              <v-col cols="2" class="text-center">.</v-col>
            </v-row>

            <v-row class="table-row styled-row">
              <v-col cols="4">Access to job board</v-col>
              <v-col cols="2" class="text-center">✅</v-col>
              <v-col cols="2" class="text-center">✅</v-col>
              <v-col cols="2" class="text-center">.</v-col>
              <v-col cols="2" class="text-center">.</v-col>
            </v-row>

            <v-row class="table-row styled-row">
              <v-col cols="4">Dedicated Slack channel</v-col>
              <v-col cols="2" class="text-center">✅</v-col>
              <v-col cols="2" class="text-center">✅</v-col>
              <v-col cols="2" class="text-center">✅</v-col>
              <v-col cols="2" class="text-center">✅</v-col>
            </v-row>
          </v-container>
          *α refers to a single additional benefit, selected from a list of
          options by the sponsor.
        </v-card-text>

        <!-- WIMIR Sponsorship Table -->
        <!-- WIMIR Sponsorship Table -->
        <v-card-text class="text-body mt-8">
          <h3>WIMIR Sponsorship Packages</h3>

          <v-container class="table-container" fluid>
            <!-- Header -->
            <v-row class="table-row styled-row table-header">
              <v-col cols="6">Tier</v-col>
              <v-col cols="2" class="text-center">Patron</v-col>
              <v-col cols="2" class="text-center header-small">Contributor</v-col>
              <v-col cols="2" class="text-center header-small">Supporter</v-col>
            </v-row>

            <!-- Price -->
            <v-row class="table-row styled-row">
              <v-col cols="6">Price</v-col>
              <v-col cols="2" class="text-center">$5,000</v-col>
              <v-col cols="2" class="text-center">$2,500</v-col>
              <v-col cols="2" class="text-center">$500</v-col>
            </v-row>

            <!-- Social media acknowledgment -->
            <v-row class="table-row styled-row">
              <v-col cols="6">
                Social media acknowledgment through WIMIR's Twitter account
              </v-col>
              <v-col cols="2" class="text-center">✅</v-col>
              <v-col cols="2" class="text-center">✅</v-col>
              <v-col cols="2" class="text-center">✅</v-col>
            </v-row>

            <!-- Acknowledgment in dedicated program elements -->
            <v-row class="table-row styled-row">
              <v-col cols="6">
                Acknowledgement in dedicated WIMIR program elements
              </v-col>
              <v-col cols="2" class="text-center">✅</v-col>
              <v-col cols="2" class="text-center">✅</v-col>
              <v-col cols="2" class="text-center">✅</v-col>
            </v-row>

            <!-- Logo size -->
            <v-row class="table-row styled-row">
              <v-col cols="6">
                Logo (WIMIR website, official WIMIR @ ISMIR 2025 presentations)
              </v-col>
              <v-col cols="2" class="text-center">Large</v-col>
              <v-col cols="2" class="text-center">Medium</v-col>
              <v-col cols="2" class="text-center">Small</v-col>
            </v-row>
          </v-container>
        </v-card-text>

        <br />
        <v-divider></v-divider>
      </v-card>

      <!-- 3) Deadline & Contact area -->
      <v-card outlined elevation="0" class="pa-4 my-4">
        <v-card-title class="text-h4 mb-3 font-weight-bold">
          Contact
        </v-card-title>

        <!-- Inquiries -->
        <ul class="dot-list mt-3">
          <li>Minz Won (Sponsorship Chair, ISMIR 2025)</li>
          <li><a href="mailto:ismir2025-sponsorship@ismir.net" style="color:#1487c8;text-decoration:underline">ismir2025-sponsorship@ismir.net</a></li>
        </ul>

        <br />
      </v-card>
      <br /><br /><br />
    </v-col>
  </v-row>
</template>

<script>
export default {};
</script>

<style scoped>
.dot-list {
  list-style-type: disc;
  font-size: 18px;
  padding-left: 40px;
  line-height: 1.8;
}

.text-body {
  font-size: 18px;
  line-height: 1.6;
  white-space: normal;
  overflow-wrap: break-word;
}

.v-card-title {
  white-space: normal;
  overflow-wrap: break-word;
}

.styled-row {
  border-bottom: 1px solid #d3d3d3; /* Gray line under each row */
  padding-bottom: 8px;
  align-items: center; /* Vertically align text */
}

.table-header {
  background-color: #f7f7f7; /* Header row background color */
  font-weight: 600;
}

.highlight-text {
  color: #004191;
  font-weight: bold;
}

.table-container {
  width: 100%;
  margin: 0;
}

.table-container .table-row .v-col {
  text-align: center;
  font-size: 15px; /* Text size inside the table */
}

/* Adjust table text size on mobile */
@media (max-width: 768px) {
  .table-container .table-row .v-col {
    font-size: 12px; /* Slightly smaller on mobile */
    padding-left: 6px !important; /* Reduce only the horizontal spacing on mobile */
    padding-right: 6px !important;
  }
  .table-header {
    font-size: 13px !important; /* Also adjust the header font size on mobile */
  }
  .header-medium {
    font-size: 10px !important; /* Platinum header size */
  }
  .header-small {
    font-size: 8px !important; /* Make the Contributor and Supporter headers smaller */
  }
  .table-container {
    padding: 0 8px; /* Also reduce the container horizontal padding */
    margin-top: 24px !important; /* Increase the vertical margin around the table on mobile */
    margin-bottom: 24px !important;
  }
}
</style>
