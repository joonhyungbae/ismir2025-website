<template>
  <v-app>
    <!-- AppbarPage component -->
    <AppbarPage />
    <v-main>
      <router-view />
    </v-main>
    <!-- Footer component -->
    <FooterPage />
  </v-app>
</template>

<script>
import FooterPage from "@/components/FooterPage.vue"; // Adjust to match the Footer component path
import AppbarPage from "@/components/AppbarPage.vue"; // Adjust to match the AppbarPage component path

export default {
  name: "App",

  components: {
    FooterPage,
    AppbarPage, // Register AppbarPage as a component
  },

  data() {
    return {
      darkTheme: false,
    };
  },

  methods: {
    toggleTheme() {
      this.darkTheme = !this.darkTheme;
    },
  },
};
</script>

<style>
/* Global styles - apply the Noto Sans font to all elements */
* {
  font-family: "Noto Sans", sans-serif !important;
}

body {
  font-family: "Noto Sans", sans-serif !important;
}

.v-application {
  font-family: "Noto Sans", sans-serif !important;
}

/* Apply the font to Vuetify components as well */
.v-btn,
.v-card,
.v-list,
.v-navigation-drawer,
.v-toolbar,
.v-footer {
  font-family: "Noto Sans", sans-serif !important;
}

/* Text elements */
h1,
h2,
h3,
h4,
h5,
h6,
p,
span,
div,
a,
button,
input,
textarea,
select {
  font-family: "Noto Sans", sans-serif !important;
}
</style>
