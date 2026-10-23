<template>
  <v-row justify="center" id="newcomer-squad">
    <v-col cols="12" md="8">
      <v-card outlined elevation="0" class="pa-4 my-4">
        <v-card-title class="text-h3 mb-4 font-weight-bold text-center">
          🎵 Join the ISMIR2025 Newcomer Squad
          <br />
          – Connect, Learn & Enjoy! 🎵
        </v-card-title>
        <v-card-text class="text-body text-center mb-4">
          Is this your first ISMIR and you're not sure how to make the most of
          it?<br />
          Or are you a seasoned attendee who'd love to give back and welcome
          newcomers?<br />
          Either way, the Newcomer Squad at ISMIR2025 (South Korea!) is for you!
        </v-card-text>
        <br />
        <v-divider></v-divider>
        <br /><br />
        <v-card-title class="text-h4 mb-3 font-weight-bold"
          >What's the Newcomer Squad?</v-card-title
        >
        <v-card-text class="text-body">
          It's a small, friendly group that pairs first-time attendees with
          experienced ISMIR folks.<br /><br />
          <strong>Newcomers</strong> get guidance, tips, and new friends.<br />
          <strong>Leaders</strong> get to share their ISMIR journey and help
          others thrive.
        </v-card-text>
        <br />
        <v-divider></v-divider>
        <br /><br />
        <v-card-title class="text-h4 mb-3 font-weight-bold"
          >What's new in 2025?</v-card-title
        >
        <v-card-text class="text-body">
          <strong>Squads by research field</strong> → meet people working on
          similar topics.
        </v-card-text>

        <br />
        <v-divider></v-divider>
        <br /><br />
        <v-card-title class="text-h4 mb-3 font-weight-bold"
          >If you're a Newcomer (first/second-time attendee):</v-card-title
        >
        <ul class="dot-list">
          <li>Get insider tips from your squad leader</li>
          <li>Build your MIR network from day one</li>
          <li>Learn how to navigate sessions, workshops, and events</li>
          <li>Join your squad's Slack channel for questions & ideas</li>
        </ul>

        <br />
        <v-divider></v-divider>
        <br /><br />
        <v-card-title class="text-h4 mb-3 font-weight-bold"
          >If you're a Squad Leader (experienced attendee):</v-card-title
        >
        <ul class="dot-list">
          <li>Welcome newcomers with warmth and support</li>
          <li>Share your experience and pro tips</li>
          <li>Host one or more in-person meetups</li>
        </ul>

        <br /><br />
        <v-card-title
          class="text-h5 mb-2 font-weight-regular"
          style="font-size: 16px; color: #666"
        >
          Requirements:</v-card-title
        >
        <v-card-text class="text-body-small">
          Attend most of ISMIR2025 in South Korea + at least 2 past ISMIRs in
          person
        </v-card-text>
        <br />
        <v-divider></v-divider>
        <br /><br />
        <v-card-title class="text-h4 mb-3 font-weight-bold"
          >Don't miss the Newcomer Onboarding Session!</v-card-title
        >
        <v-card-text class="text-body"> We'll cover: </v-card-text>
        <ul class="dot-list">
          <li>ISMIR 2025 program highlights</li>
          <li>Tips for making the most of the conference</li>
          <li>Meeting your squad members</li>
        </ul>

        <br />
        <v-divider></v-divider>
        <br /><br />
        <v-card-title class="text-h4 mb-3 font-weight-bold"
          >Ready to join? Sign up here:</v-card-title
        >
        <v-card-text class="text-body">
          <strong>Squad Leader:</strong>
          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLSecSJ_4U66G2tvQkLqOJ-XcFiiczDWEAl2EdRx7S7Dk0B611Q/viewform"
            target="_blank"
            style="color: #1487c8; margin-left: 10px"
          >
            Sign up here
          </a>
          <br /><br />
          <strong>Newcomer Member:</strong>
          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLSfvOwtt84CvIcC6IY7uVTJ_sAiwPcZOjRDyEO3UpsnF62UISw/viewform"
            target="_blank"
            style="color: #1487c8; margin-left: 10px"
          >
            Sign up here
          </a>
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
    return {};
  },
};
</script>

<style scoped>
.dot-list {
  list-style-type: disc; /* Bullet style */
  font-size: 18px;
  padding-left: 40px; /* Adjust indentation */
  line-height: 1.6;
}
.text-body {
  font-size: 18px; /* Adjust text font size */
  line-height: 1.8; /* Line spacing for readability */
  white-space: normal; /* Allow line wrapping */
  overflow-wrap: break-word; /* Wrap at word boundaries so words do not overflow the line */
}
.text-body-small {
  font-size: 14px; /* Small text font size */
  line-height: 1.6; /* Adjust line spacing */
  white-space: normal; /* Allow line wrapping */
  overflow-wrap: break-word; /* Wrap at word boundaries so words do not overflow the line */
  color: #666; /* Gray text */
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
</style>
