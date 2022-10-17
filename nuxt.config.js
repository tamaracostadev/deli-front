import colors from 'vuetify/es5/util/colors';

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
		link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
	},

	// Global CSS: https://go.nuxtjs.dev/config-css
	css: ['@/assets/css/main.css'],

	// Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
	plugins: ['~/plugins/toast.js'],

	// Auto import components: https://go.nuxtjs.dev/config-components
	components: true,

	// Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
	buildModules: [
		// https://go.nuxtjs.dev/eslint
		'@nuxtjs/eslint-module',
		// https://go.nuxtjs.dev/vuetify
		'@nuxtjs/vuetify',
		'@nuxt/postcss8',
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
		baseURL: process.env.API_URL || '/',
		proxy: true,
	},
	env: {
		apiUrl: process.env.API_URL || 'http://localhost:3000',
		authUrl: process.env.AUTH_URL || 'http://localhost:3000',
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
			logout: '/logout',
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
						url: process.env.API_URL + '/login',
						method: 'post',
					},
					logout: {
						url: process.env.API_URL + '/logout',
						method: 'post',
					},
					token: process.env.AUTH_URL + '/oauth/token',
					user: { url: process.env.API_URL + '/user', method: 'get' },
					userInfo: process.env.API_URL + '/user',
				},
				grantType: 'password',
				url: process.env.AUTH_URL,
				clientId: '2',
				clientSecret: 'fydun9wm2dVSlmgfD1J1FHcaebOtISzYut83JYMf',
			},
		},
	},
	// Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
	vuetify: {
		customVariables: ['~/assets/variables.scss'],
		theme: {
			light: true,
			dark: false,
			themes: {
				dark: {
					primary: colors.blue.darken2,
					accent: colors.blue.darken2,
					secondary: colors.blueGrey.darken4,
					info: colors.teal.lighten1,
					warning: colors.amber.base,
					error: colors.deepOrange.accent4,
					success: colors.green,
				},
				light: {
					primary: colors.blue.darken2,
					accent: colors.blue.darken3,
					secondary: colors.blueGrey.darken4,
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
