import colors from 'vuetify/es5/util/colors';
import pt from 'vuetify/src/locale/pt';
const API_URL = "https://deli-backe.herokuapp.com/api";
const AUTH_URL = "https://deli-backe.herokuapp.com";
export default {
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
	},
	env: {
		apiUrl: API_URL || 'http://localhost:3000',
		authUrl: AUTH_URL || 'http://localhost:3000',
	},
	proxy: {},
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
			},
			cookie: {
				name: 'XSRF-TOKEN',
			},
		},
		strategies: {
			local: {
				token: {
					property: 'token',
					global: true,
					required: true,
					type: 'Bearer',
				},
				user: {
					property: 'user',
				},
				endpoints: {
					login: { url: 'back/api/login', method: 'post' },
					logout: { url: 'back/api/logout', method: 'post' },
					user: { url: 'back/api/user', method: 'get' },
				},
			},
			laravelPassport: {
				provider: 'laravel/passport',
				endpoints: {
					login: {
						url: API_URL + '/login',
						method: 'post',
					},
					logout: {
						url: API_URL + '/logout',
						method: 'post',
					},
					token: 'https://deli-backe.herokuapp.com/oauth/token',
					user: { url: API_URL + '/user', method: 'get' },
					userInfo: API_URL + '/user',
				},
				grantType: 'password',
				url: "https://deli-backe.herokuapp.com",
				clientId: '2',
				clientSecret: '3y5kd3NqQhGcDJHYYMeKMyC9BazybvNuJfoKUpGq',
			},
		},
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
