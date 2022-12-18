import { defineConfig } from 'cypress'

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    testIsolation: false,
  },
  env: {
    APP_URL: 'http://localhost:5173',
    FIREBASE_EMULATION_URL: 'http://localhost:9099',

    USER: 'Vincent VanHogh',
    EMAIL: 'VanHogh@howest.be',
    PASSWORD: 'VanGogh123.',
  },
})
