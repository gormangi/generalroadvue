// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({

  devtools: {enabled: false},

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    'public/css/reset.css',
    'public/css/style.css'
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
  ],

  ssr: true,

  nitro: {
    routeRules: {
      "/api/**": {
        proxy: "http://146.56.114.49:14010/**",
      },
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }

})
