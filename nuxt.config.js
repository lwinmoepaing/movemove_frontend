const colors = require('vuetify/es5/util/colors').default
require('dotenv').config()

module.exports = {
  mode: 'universal',
  /*
   ** Headers of the page
   */
  head: {
    titleTemplate: 'MoveMove Blog',
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.png' },

      // All Fonts Setup
      {
        // Josefin
        rel: 'stylesheet',
        href:
          'https://fonts.googleapis.com/css2?family=Josefin+Sans:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;1,100;1,200;1,300;1,400;1,500;1,600;1,700&display=swap'
      },
      {
        // Lato
        rel: 'stylesheet',
        href:
          'https://fonts.googleapis.com/css2?family=Lato:ital@0;1&display=swap'
      },
      {
        // Padauk
        rel: 'stylesheet',
        href:
          'https://fonts.googleapis.com/css2?family=Padauk:wght@400;700&display=swap'
      }
    ]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#ff8f00' },
  /*
   ** Global CSS
   */
  css: ['~/assets/css/global.css'],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    '~/plugins/ComponentRegister',
    // '~/plugins/i18n.js',
    '~/plugins/axios.js',
    //  Doc: https://github.com/xkjyeah/vue-google-maps/tree/8d6bbac96b0797cf1e5b9537d58920c23ba75bd2#readme
    '~/plugins/googleMap.js'
  ],
  /*
   ** Middleware for Router to localize
   */
  router: {
    // middleware: 'i18n'
  },
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
    '@nuxtjs/vuetify'
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    // Doc: https://github.com/nuxt-community/dotenv-module
    '@nuxtjs/dotenv'
  ],
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {
    // proxy: false
  },
  /*
   ** vuetify module configuration
   ** https://github.com/nuxt-community/vuetify-module
   */
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: false,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          error: colors.deepOrange.accent4,
          info: colors.blue.lighten1,
          warning: colors.amber.base,
          success: colors.green.accent3
        },
        light: {
          primary: '#3a87f1',
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          error: colors.deepOrange.accent4,
          info: colors.blue.lighten1,
          warning: colors.amber.base,
          success: colors.green.accent3
        }
      }
    }
  },
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    transpile: [/^vue2-google-maps($|\/)/],
    extend(config, ctx) {}
  }
}
