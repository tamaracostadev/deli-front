<template>
	<v-container>
		<v-card>
			<v-card-title>Login</v-card-title>
			<v-card-text>
				<v-form>
					<v-container fluid>
						<v-text-field v-model="login" label="Usuário" required>
						</v-text-field>
						<v-text-field
							v-model="senha"
							label="Senha"
							:type="show ? 'text' : 'password'"
							hint="No mínimo 6 caracteres"
							required
							@click:append="show = !show"
						>
						</v-text-field>
						<nuxt-link to="/recuperar"
							>Esqueci minha senha</nuxt-link
						>
					</v-container>
				</v-form>
			</v-card-text>
			<v-card-actions class="d-flex justify-center">
				<v-btn class="w-[140px] mx-2" color="success" @click="logar()"
					>Entrar</v-btn
				>
				<v-btn
					class="w-[140px] mx-2"
					color="primary"
					@click="goToRegister"
					>Cadastre-se</v-btn
				>
			</v-card-actions>
		</v-card>
	</v-container>
</template>

<script>
export default {
	name: 'LoginPage',
	layout: 'main',
	auth: false,
	data() {
		return {
			show: false,
			login: '',
			senha: '',
		};
	},
	methods: {
		async logar() {
			await this.$auth
				.loginWith('laravelSanctum', {
					data: {
						email: this.login,
						password: this.senha,
					},
				})
				.then((response) => {
					let redirect = '/painel';
					if (this.$auth.$state.redirect) {
						redirect = this.$auth.$state.redirect;
					}
					this.$router.push(redirect);
				});
		},
		goToRegister() {
			this.$router.push('/registrar');
		},
	},
};
</script>
