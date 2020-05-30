import colors from 'vuetify/es5/util/colors'

export default {
  mode: 'universal',
  /*
   ** Headers of the page
   */
  head: {
    titleTemplate: '%s - ' + process.env.npm_package_name,
    lang: 'fr',
    htmlAttrs: {
      lang: 'fr'
    },
    title: 'Fabien Grignoux, développeur web à Lyon',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content:
          "J'accompagne les entreprises à développer les outils web dont elles ont besoin pour atteindre leurs objectifs."
      }
    ],

    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },

      {
        rel: 'stylesheet',
        href:
          'https://fonts.googleapis.com/css2?family=Nunito&family=Raleway&display=swap'
      }
    ]
  },
  env: {
    siteUrl: 'https://developpeurfullstack.fr',
    siteTitle: 'Fabien Grignoux, développeur web à Lyon',
    siteDescription:
      "J'accompagne les entreprises à développer les outils web dont elles ont besoin pour atteindre leurs objectifs."
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },
  /*
   ** Global CSS
   */
  css: ['@/assets/scss/main.scss'],

  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    {
      src: '~/plugins/lazyload.js',
      mode: 'client'
    },
    { src: '~plugins/ga.js', mode: 'client' },
    { src: '~/plugins/jsonld', mode: 'server' },
    { src: '~/plugins/eventBus', mode: 'client' },
    { src: '~/plugins/prism', mode: 'client' }
  ],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: ['@nuxt/typescript-build', '@nuxtjs/vuetify'],
  /*
   ** Nuxt.js modules
   */
  modules: [
    '@nuxtjs/pwa',
    '@nuxtjs/apollo',
    '@nuxtjs/markdownit',
    '@nuxtjs/axios',
    [
      'nuxt-fontawesome',
      {
        imports: [
          {
            set: '@fortawesome/free-solid-svg-icons',
            icons: ['fas']
          },
          {
            set: '@fortawesome/free-brands-svg-icons',
            icons: ['fab']
          }
        ]
      }
    ]
  ],
  markdownit: {
    preset: 'default',
    linkify: true,
    breaks: true,
    injected: true
  },
  axios: {},
  /*
   ** vuetify module configuration
   ** https://github.com/nuxt-community/vuetify-module
   */
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: false,
      themes: {
        light: {
          primary: '#1d976c',
          accent: '#000080',
          secondary: '#50389a',
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3,
          topBar: '#15885f'
          //topBar: '#010080'
          //topBar: '#a92686'
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
    babel: {
      presets({ isServer }) {
        return [
          [
            require.resolve('@nuxt/babel-preset-app'),
            // require.resolve('@nuxt/babel-preset-app-edge'), // For nuxt-edge users
            {
              buildTarget: isServer ? 'server' : 'client',
              corejs: { version: 3 }
            }
          ]
        ]
      }
    },

    extend(config, ctx) {}
  },

  apollo: {
    // required
    clientConfigs: {
      default: {
        // required
        httpEndpoint: 'https://fgrx-strapi.herokuapp.com/graphql'
        //httpEndpoint: 'http://localhost:1337/graphql'
      }
    }
  }
}
