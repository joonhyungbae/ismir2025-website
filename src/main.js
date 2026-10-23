import { createApp } from 'vue';
import App from './App.vue';
import router from './router'; // Import the router
import vuetify from './plugins/vuetify'; // Vuetify configuration
import '@mdi/font/css/materialdesignicons.css'

createApp(App)
  .use(router) // Use the router
  .use(vuetify) // Use Vuetify
  .mount('#app');
