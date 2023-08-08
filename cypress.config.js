const { defineConfig } = require("cypress");

module.exports = defineConfig({
  viewportHeight: 1080,
  viewportWidth: 1920,
  e2e: {
    baseUrl: "https://diegosarmiento.co",
    specPattern: "cypress/e2e/**/*.cy.{js,jsx,ts,tsx}",
    excludeSpecPattern: [
      "**/1-getting-started/**",
      "**/2-advanced-examples/**",
    ],
  },
});
