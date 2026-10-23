// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import '@/styles/variables.scss'

// Vuetify
import { createVuetify } from 'vuetify'
import { aliases, mdi } from 'vuetify/iconsets/mdi' 
// Import aliases and mdi from vuetify/iconsets/mdi

export default createVuetify({
  icons: {
    defaultSet: 'mdi', // Use the font-based MDI set as the default icon set
    aliases,
    sets: {
      mdi,
    },
  },
})
