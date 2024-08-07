// https://nuxt.com/docs/api/configuration/nuxt-config
// @ts-ignore
export default defineNuxtConfig({

  devtools: {enabled: false},

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
      'nuxt-file-storage'
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
