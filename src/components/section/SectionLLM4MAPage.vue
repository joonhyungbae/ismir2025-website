<template>
  <v-row justify="center" id="call-for-papers">
    <v-col cols="12" md="8">
      <v-card outlined elevation="0" class="pa-4 my-4">
        <v-card-title class="text-h4 mb-3 font-weight-bold"
          >1st Workshop on Large Language Models for Music & Audio</v-card-title
        >

        <v-card-title class="text-h5 mb-3"
          >September 26th (Friday) at KAIST, Daejeon, Korea</v-card-title
        >
        <v-card-text class="text-body">
          <span class="highlight-bold-text"
            >More info and submission entrance on the workshop webpage:
          </span>
          <a
            href="https://m-a-p.ai/LLM4Music/"
            target="_blank"
            style="color: #1487c8; text-decoration: underline"
            >https://m-a-p.ai/LLM4Music/</a
          >
          <br /><br />
          <span class="highlight-text"
            >LLM4MA: Large Language Models for Music & Audio is a dedicated
            workshop that explores the rapidly evolving intersection of large
            language models (LLMs) and music/audio understanding and
            generation.</span
          ><br /><br />
          As LLMs transform how machines process, compose, and interpret musical
          content across modalities—text, audio, image, and video—this workshop
          provides a crucial forum for discussing advances in tokenisation,
          long-context modelling, multimodal alignment, and controllability in
          music applications.<br /><br />
          It aims to foster early-stage research and community exchange on
          emerging methods, challenges, and ethical considerations in AI-driven
          music creation, especially for works not yet suited to main conference
          or demo tracks.<br /><br />

          We welcome contributions on topics including, but not limited to:<br /><br />
          <ul class="dot-list">
            <li>Tokenisation of Music</li>
            <li>Long Sequence Modelling of Music</li>
            <li>Instruction fine-tuning of Music</li>
            <li>Reinforcement Fine-Tuning of Music</li>
            <li>Artistic Creation & Music Evaluation</li>
            <li>Entertainment & Music Industry Applications</li>
            <li>Enhanced Musical Diversity with LLMs</li>
            <li>Scaling Laws and Emergent Abilities of Music LLMs</li>
            <li>Dataset Design & Generalizability of Music LLMs</li>
            <li>LLM Modality Extension</li>
            <li>(Pre-)training Paradigms with Music knowledge</li>
            <li>Inference and Prompt Engineering of Music LLMs</li>
            <li>In-Context Learning of Music LLMs</li>
            <li>Chain-of-Thought and Music Reasoning</li>
            <li>Autonomous Music Agents</li>
            <li>Deepfake detection on Music LLMs</li>
            <li>And other applications of LLMs for all kinds of MIR tasks</li>
          </ul>
          <br />

          <span class="highlight-text">Important dates</span>

          <br /><br />
          <ul class="dot-list">
            <li>Open submission: 6th June, 2025</li>
            <li>Paper submission deadline: 10th Aug, 2025</li>
            <li>Author notification: 31st Aug, 2025</li>
            <li>Camera-ready version: 14th September, 2025</li>
            <li>Satellite event date: 26th September, 2025</li>
          </ul>
          <br />
          <span class="highlight-text">Submission</span>
          <br /><br />
          <span>Please submit your paper through OpenReview: </span>
          <a
            href="https://openreview.net/group?id=ISMIR.net%2F2025%2FWorkshop%2FLLM4Music&referrer=%5BHomepage%5D%28%2F%29#tab-your-consoles"
            target="_blank"
            style="color: #1487c8; text-decoration: underline"
            >Submission Portal</a
          >
          <br /><br />
          <span class="highlight-text">Reviewer Invitation</span>
          <br /><br />
          <span
            >We are looking for reviewers for our workshop. If you are
            interested in reviewing papers for LLM4MA, please fill out the form:
          </span>
          <a
            href="https://forms.cloud.microsoft/e/N0qQg361bG"
            target="_blank"
            style="color: #1487c8; text-decoration: underline"
            >https://forms.cloud.microsoft/e/N0qQg361bG</a
          >
          <br /><br />
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
            { content: "Open submission", date: "6th June, 2025" },
            { content: "Paper submission deadline", date: "10th Aug, 2025" },
            { content: "Author notification", date: "31st Aug, 2025" },
            { content: "Camera-ready version", date: "14th September, 2025" },
            { content: "Satellite event date", date: "26th September, 2025" },
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
