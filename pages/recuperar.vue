<template>
	<v-container>
		<v-card>
			<v-card-title>Recuperar Senha</v-card-title>
			<v-card-text>
				<v-form>
					<v-container fluid>
						<v-text-field 
						v-model="email" 
						label="Email Cadastrado"
						hint="Digite o email cadastrado"
						 required>
						</v-text-field>
					</v-container>
				</v-form>
			</v-card-text>
			<v-card-actions class="d-flex justify-center">
				<v-btn class="mx-2" color="success" @click="recuperar()"
					>Recuperar Senha</v-btn
				>
				<v-btn
					class="w-[140px] mx-2"
					color="primary"
					@click="goToLogin"
					>Entrar</v-btn
				>
			</v-card-actions>
		</v-card>
	</v-container>
</template>

<script>
export default {
	name: 'RecuperarPage',
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
				.loginWith('laravelPassport', {
					data: {
						username: this.login,
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
		goToLogin() {
			this.$router.push('/login');
		},
	},
};
</script>
