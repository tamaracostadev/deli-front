<template>
	<v-app>
		<v-app-bar  color="accent" app>
			<v-container class="d-flex py-0">
				<nuxt-link to="/">
					<img :src="require('~/assets/img/logo_big.svg')" class=" h-11"/>	
				</nuxt-link>
				<v-spacer />

				<nuxt-link v-ripple="{ class: 'red--text' }" to="/login"  text class="text p-4 transition ease-in-out delay-150  hover:bg-[#FFD0D0]" >ENTRAR</nuxt-link>
				<nuxt-link v-ripple="{ class: 'red--text' }" to="/registrar"  text class="text p-4 transition ease-in-out delay-150 hover:bg-[#FFD0D0]">CADASTRAR</nuxt-link>

			</v-container>
		</v-app-bar>
		<v-main>
			<Nuxt />
		</v-main>
		<v-footer 
		padless
		color="primary">
			<v-card
				flat
				tile
				
				class="primary text-center white--text w-full"
			>
				<v-card-text>
					
				</v-card-text>
				<v-divider></v-divider>
				<v-card-text>
					<span class="white--text">
						&copy; {{ new Date().getFullYear() }} Delimenu
					</span>
				</v-card-text>
			</v-card>
		</v-footer>
	</v-app>
</template>

<script>
export default {
	name: 'MainLayout',
	data() {
		return {
			title: 'Deli Menu',
		};
	},
};
</script>
