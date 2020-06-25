import colors from 'vuetify/es5/util/colors';
const { createApolloFetch } = require('apollo-fetch');

const buildRoutes = async () => {
	const routes = [];
	const uri = 'https://fgrx-strapi.herokuapp.com/graphql';
	const apolloFetch = createApolloFetch({ uri });
	const queryPortfolio = `
  query Porfolios {
    portfolios {
      slug 
    }
  }
      `;

	const resultPortfolios = await apolloFetch({ query: queryPortfolio }); // all apolloFetch arguments are optional
	resultPortfolios.data.portfolios.forEach((portfolio) => {
		const route = `/portfolio/${portfolio.slug}`;
		routes.push(route);
	});

	const queryPosts = `
  query Posts {
    articles {
      slug 
    }
  }
      `;

	const resultPosts = await apolloFetch({ query: queryPosts }); // all apolloFetch arguments are optional
	resultPosts.data.articles.forEach((post) => {
		const route = `/posts/${post.slug}`;
		routes.push(route);
	});

	const queryTechnos = `
  query Technos {
    technos {
      slug 
    }
  }
      `;

	const resultTechnos = await apolloFetch({ query: queryTechnos }); // all apolloFetch arguments are optional
	resultTechnos.data.technos.forEach((techno) => {
		const route = `/technos/${techno.slug}`;
		routes.push(route);
	});

	return routes;
};

export default {
	mode: 'universal',
	target: 'static',
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
				href: 'https://fonts.googleapis.com/css2?family=Nunito&family=Raleway&display=swap'
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
	css: [ '@/assets/scss/main.scss' ],

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
		{ src: '~/plugins/highlight', mode: 'client' }
	],
	/*
   ** Nuxt.js dev-modules
   */
	buildModules: [
		'@nuxt/typescript-build',
		'@nuxtjs/vuetify',
		[
			'@nuxtjs/google-analytics',
			{
				id: 'UA-141104841-1'
			}
		]
	],
	/*
   ** Nuxt.js modules
   */
	modules: [
		'@nuxtjs/pwa',
		'@nuxtjs/apollo',
		'@nuxtjs/markdownit',
		'@nuxtjs/axios',
		'@nuxtjs/sitemap',
		[
			'nuxt-fontawesome',
			{
				imports: [
					{
						set: '@fortawesome/free-solid-svg-icons',
						icons: [ 'fas' ]
					},
					{
						set: '@fortawesome/free-brands-svg-icons',
						icons: [ 'fab' ]
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
		customVariables: [ '~/assets/variables.scss' ],
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
				];
			}
		},

		extend(config, ctx) {}
	},

	generate: {
		routes: buildRoutes
	},
	pwa: {
		icon: {
			/* icon options */
		}
	},

	sitemap: {
		hostname: 'https://developpeurfullstack.fr',
		gzip: true,
		routes: buildRoutes
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
};
