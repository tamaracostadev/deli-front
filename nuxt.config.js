import colors from 'vuetify/es5/util/colors';
import pt from 'vuetify/src/locale/pt';
//const API_URL = "http://localhost:8000/api";
//const AUTH_URL = "http://localhost:8000";
 const API_URL = "https://deli-backe.herokuapp.com/api";
 const AUTH_URL = "https://deli-backe.herokuapp.com";
export default {
	ssr: false,
	// Global page headers: https://go.nuxtjs.dev/config-head
	head: {
		titleTemplate: '%s - Deli Menu',
		title: 'Deli Menu',
		meta: [
			{ charset: 'utf-8' },
			{
				name: 'viewport',
				content: 'width=device-width, initial-scale=1',
			},
			{ hid: 'description', name: 'description', content: '' },
			{ name: 'format-detection', content: 'telephone=no' },
		],
		link: [{ rel: 'icon', type: 'image/x-icon', href: '/Deli.png' }],
	},

	// Global CSS: https://go.nuxtjs.dev/config-css
	css: ['@/assets/css/main.css'],

	// Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
	plugins: ['~/plugins/toast.js', '~/plugins/vmask.js',{src: '~/plugins/chart.js', mode: 'client'}],

	// Auto import components: https://go.nuxtjs.dev/config-components
	components: true,

	// Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
	buildModules: [
		// https://go.nuxtjs.dev/eslint
		'@nuxtjs/eslint-module',
		// https://go.nuxtjs.dev/vuetify
		'@nuxtjs/vuetify',
		'@nuxt/postcss8',
		'@nuxtjs/google-fonts',
	],

	// Modules: https://go.nuxtjs.dev/config-modules
	modules: [
		// https://go.nuxtjs.dev/axios
		'@nuxtjs/axios',
		// https://go.nuxtjs.dev/pwa
		'@nuxtjs/pwa',
		'@nuxtjs/auth-next',
		'vue-sweetalert2/nuxt',
	],

	// Axios module configuration: https://go.nuxtjs.dev/config-axios
	axios: {
		// Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
		baseURL: API_URL || '/',
		proxy: true,
		credentials: true,
		withCredentials: true,
	},
	env: {
		apiUrl: '/back/api',
		authUrl: AUTH_URL || 'http://localhost:3000',
	},
	proxy: {
		'/back': {
			target: AUTH_URL,
			pathRewrite: { '^/back': '/' }
		}
	},
	// PWA module configuration: https://go.nuxtjs.dev/pwa
	pwa: {
		manifest: {
			lang: 'pt-br',
		},
	},
	auth: {
		rewriteRedirects: true,
		redirect: {
			login: '/',
			logout: '/',
			home: '/painel',
		},
		localStorage: false,
		cookie: {
			prefix: 'auth.',
			options: {
				path: '/',
				expires: 7,
			},
			cookie: {
				name: 'XSRF-TOKEN',
			},
		},
		strategies: {

			laravelPassport: {
				provider: 'laravel/passport',
				endpoints: {
					login: {
						url: '/api/login',
						method: 'post',
					},
					logout: {
						url: '/api/logout',
						method: 'post',
					},
					token: AUTH_URL + '/oauth/token',
					user: {url: '/api/user', method: 'get'},
					userInfo: '/api/user',
				},
				grantType: 'password',
				url: AUTH_URL,
				clientId: '2',
				clientSecret: 'UMAdy14FCE0Fk1jMSXnywxXqPeXdtXzENBaZ5RqZ',
			},
			laravelSanctum: {
				provider: 'laravel/sanctum',
				url: '/back',
				endpoints: {
					// (optional) If set, we send a get request to this endpoint before login
					csrf: {
						url: '/sanctum/csrf-cookie',
					},
					login: {
						url: '/api/login',
						method: 'post',
					},
					logout: {
						url: '/api/logout',
						method: 'post',
					},
					user: {
						url: '/api/user',
						method: 'get',
					},

				}
			},
		}
	},
	googleFonts: {
		download: true,
		families: {
			Roboto: true,
			'Nunito+Sans': true,
			Lato: [100, 300],
		  }
	  },
	// Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
	vuetify: {
		treeShake: true,
		defaultAssets: {
			font: {
				family: 'Nunito Sans',
			},
		},
		customVariables: ['~/assets/variables.scss'],
		lang: { locales: { pt }, current: 'pt' },
		theme: {
			light: true,
			dark: false,
			themes: {
				dark: {
					primary: '#2F2E41',
					accent: '#ffe1e1',
					secondary: '#FF4117',
					info: colors.teal.lighten1,
					warning: colors.amber.base,
					error: colors.deepOrange.accent4,
					success: colors.green,
				},
				light: {
					primary: '#2F2E41',
					accent: '#ffe1e1',
					secondary: '#FF4117',
					info: colors.teal.lighten1,
					warning: colors.amber.base,
					error: colors.deepOrange.accent4,
					success: colors.green,
				},
			},
		},
	},
	router: {
		middleware: ['auth'],
	},

	// Build Configuration: https://go.nuxtjs.dev/config-build
	build: {
		postcss: {
			plugins: {
				tailwindcss: {},
				autoprefixer: {},
			},
		},
	},
	watchers: {
		chokidar: {
			ignored: [
				'pages/docs',
				'assets/json/**/*.json',
				'node_modules',
				'.git',
				'.vscode',
			],
		},
		webpack: {
			ignored: [
				'pages/docs',
				'assets/json/**/*.json',
				'node_modules',
				'.git',
				'.vscode',
			],
		},
	},
};
