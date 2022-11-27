<template>
	<v-app light>
		<v-navigation-drawer
			v-model="drawer"
			:mini-variant="miniVariant"
			mini-variant-width="70px"
			app
			fixed
			expand-on-hover
			color="secondary"
			class="cscroll full-height"
			:style="`margin-top: ${$vuetify.application.top}px`"
			:value="true"
		>
			<v-list>
				<v-list-item-group active-class="blue darken-2 text--white">
					<v-list-item class="px-2" to="/painel/user">
						<v-list-item-avatar>
							<v-img
								:src="require('~/assets/img/profile/download.png')"
							></v-img>
						</v-list-item-avatar>
						<v-list-item-title class="text-[#EEEEEE]">{{
							$auth.user.user.name
						}}</v-list-item-title>
					</v-list-item>
					<v-divider class="bg-[#616161]"></v-divider>
					<template v-for="item in items">
						<v-list-item
							v-if="item.to"
							:key="`list${item.id}`"
							:to="item.to"
							router
							exact
						>
							<v-list-item-action>
								<v-icon color="grey lighten-1">{{
									item.icon
								}}</v-icon>
							</v-list-item-action>
							<v-list-item-content>
								<v-list-item-title
									class="text-[#EEEEEE]"
									v-text="item.title"
								/>
							</v-list-item-content>
						</v-list-item>
						<v-list-group
							v-else
							:key="`sublist${item.id}`"
							v-model="item.active"
							color="grey lighten-1"
							active-class="blue-grey darken-3"
						>
							<template #appendIcon>
								<v-icon color="grey lighten-1"
									>mdi-chevron-up</v-icon
								>
							</template>
							<template #activator>
								<v-list-item-action>
									<v-icon color="grey lighten-1">{{
										item.icon
									}}</v-icon>
								</v-list-item-action>
								<v-list-item-content>
									<v-list-item-title
										class="text-[#EEEEEE]"
										v-text="item.title"
									/>
								</v-list-item-content>
							</template>
							<v-list-item
								v-for="(sub, i) in item.sub"
								:key="i"
								:to="item.group + sub.to"
								router
								exact
								active-class="blue-grey darken-2"
								class="bg-slate-800 border-l-4 border-gray-200"
							>
								<v-list-item-icon>
									<v-icon color="grey lighten-1">{{
										sub.icon
									}}</v-icon>
								</v-list-item-icon>
								<v-list-item-title
									class="text-[#EEEEEE]"
									v-text="sub.title"
								/>
							</v-list-item>
						</v-list-group>
					</template>
				</v-list-item-group>
			</v-list>
		</v-navigation-drawer>
		<v-app-bar color="primary white--text" clipped-left app>
			<v-app-bar-nav-icon color="white" @click.stop="drawer = !drawer" />
			
			<v-toolbar-title v-text="title" />

			<v-spacer />
			<v-btn icon>
				<v-icon>mdi-magnify</v-icon>
			</v-btn>
			<v-btn icon>
				<v-icon>mdi-bell</v-icon>
			</v-btn>
			<v-btn icon>
				<v-icon>mdi-account</v-icon>
			</v-btn>
			
			<v-btn
				icon
				@click.stop="$vuetify.theme.dark = !$vuetify.theme.dark"
			>
				<v-icon
					>mdi-{{
						`${
							$vuetify.theme.dark ? 'weather' : 'white-balance'
						}-sunny`
					}}</v-icon
				>
			</v-btn>
		</v-app-bar>
		<v-main>
			<v-container fluid>
				<Nuxt />
			</v-container>
		</v-main>
		<v-footer absolute app>
			<span>&copy; {{ new Date().getFullYear() }}</span>
		</v-footer>
	</v-app>
</template>

<script>
export default {
	name: 'DashboardLayout',
	data() {
		return {
			drawer: false,
			items: [
				{
					id: 0,
					icon: 'mdi-chart-box-outline',
					title: 'Dashboard',
					to: '/painel',
				},
				{
					id: 1,
					icon: 'mdi-food-outline',
					title: 'Produtos',
					group: '/painel/produtos',
					active: true,
					sub: [
						{
							id: 'sub-0',
							icon: 'mdi-package-variant-closed',
							title: 'Insumos',
							to: '/insumos/',
						},
						{
							id: 'sub-1',
							icon: 'mdi-coffee-maker-check-outline',
							title: 'Produto Venda',
							to: '/produto/',
						},
						{
							id: 'sub-2',
							icon: 'mdi-notebook-check-outline',
							title: 'Receitas',
							to: '/receitas/',
						},
					],
				},
				{
					id: 'sub-3',
					icon: 'mdi-label-multiple-outline',
					title: 'Categorias',
					to: '/painel/categorias/',
				},
				{
					id: 2,
					icon: 'mdi-factory',
					title: 'Fornecedores',
					to: '/painel/fornecedores/',
				},
				/* {
					id: 3,
					icon: 'mdi-bike-fast',
					title: 'Delivery',
					to: '/painel/delivery/',
				}, */

				{
					id: 4,
					icon: 'mdi-contacts-outline',
					title: 'Clientes',
					to: '/painel/clientes/',
				},
				{
					id: 5,
					icon: 'mdi-food-outline',
					title: 'Financeiro',
					group: '/painel/financeiro',
					active: true,
					sub: [
						{
							id: 'sub-0',
							icon: 'mdi-basket-outline',
							title: 'Vendas',
							to: '/vendas/',
						},
						{
							id: 'sub-1',
							icon: 'mdi-coffee-maker-check-outline',
							title: 'Custos Fixos',
							to: '/custofixo/',
						},
						{
							id: 'sub-2',
							icon: 'mdi-notebook-check-outline',
							title: 'Custos Variáveis',
							to: '/custovariavel/',
						},
						{
							id: 'sub-2',
							icon: 'mdi-notebook-check-outline',
							title: 'Depreciação',
							to: '/depreciacao/',
						},
					],
				},
				{
					id: 6,
					icon: 'mdi-room-service-outline',
					title: 'PDV',
					to: '/painel/pedidos/',
				},
				{
					id: 7,
					icon: 'mdi-store-settings-outline',
					title: 'Empresa',
					to: '/painel/empresa/',
				},
				{
					id: 8,
					icon: 'mdi-power',
					title: 'Sair',
					to: '/logout/',
				},
			],
			miniVariant: true,
			title: 'Dashboard',
		};
	},
};
</script>
<style lang="scss">
.cscroll {
	overflow: auto;
	::-webkit-scrollbar {
		width: 10px;
		height: 10px;
	}
	/* Track */
	::-webkit-scrollbar-track {
		background: #374850;
	}
	/* Handle */
	::-webkit-scrollbar-thumb {
		border: 2px solid #374850;
		background: #485f69;
	}
	/* Handle on hover */
	::-webkit-scrollbar-thumb:hover {
		background: #55707c;
	}
}
</style>
