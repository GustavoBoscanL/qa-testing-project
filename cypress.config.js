const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // Tarea para verificar si un archivo existe
      on('task', {
        fileExists(filePath) {
          const fs = require('fs')
          return fs.existsSync(filePath)
        }
      })
    },
    // Optimizaciones de rendimiento
    experimentalRunAllSpecs: true,
    numTestsKeptInMemory: 0,
    experimentalMemoryManagement: true,
    baseUrl: 'https://automationexercise.com', // Aplicación de ecommerce para testing
    viewportWidth: 1280,
    viewportHeight: 720,
    video: false,
    screenshotOnRunFailure: true,
    defaultCommandTimeout: 5000,
    requestTimeout: 5000,
    responseTimeout: 5000,
  },
  env: {
    // Variables de entorno para tests
    apiUrl: 'https://echo-serv.tbxnet.com', // API para tests del ejercicio
  }
})
