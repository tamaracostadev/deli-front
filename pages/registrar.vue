<template>
	<v-container>
		<v-card>
			<v-card-title>Cadastre-se</v-card-title>
			<v-card-text>
				<v-form ref="form" v-model="valid" lazy-validation>
					<v-text-field
						v-model="name"
						:rules="nameRules"
						label="Nome"
						required
					></v-text-field>
					<v-text-field
						v-model="email"
						:rules="emailRules"
						label="E-mail"
						required
					></v-text-field>
					<v-text-field
						v-model="password"
						:append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
						:type="showPassword ? 'text' : 'password'"
						:rules="passwordRules"
						label="Senha"
						required
						hint="A senha deve ter, no mínimo, 6 caracteres"
						counter
						@click:append="showPassword = !showPassword"
					></v-text-field>
					<v-text-field
						v-model="confirmPassword"
						:append-icon="
							showConfirmPassword ? 'mdi-eye' : 'mdi-eye-off'
						"
						:type="showConfirmPassword ? 'text' : 'password'"
						:rules="confirmPasswordRules"
						label="Confirme a Senha"
						required
						hint="A senha deve ter, no mínimo, 6 caracteres"
						counter
						@click:append="
							showConfirmPassword = !showConfirmPassword
						"
					></v-text-field>
				</v-form>
			</v-card-text>
			<v-card-actions class="d-flex justify-center">
				<v-btn class="w-[140px] mx-2" color="success">Cadastrar</v-btn>
				<v-btn
					class="w-[200px] mx-2"
					color="primary"
					@click="goToLogin"
					>Já tenho uma conta</v-btn
				>
			</v-card-actions>
		</v-card>
	</v-container>
</template>

<script>
export default {
	name: 'Registrar',
	auth: false,
	layout: 'main',
	data: () => ({
		valid: true,
		name: '',
		nameRules: [
			(v) => !!v || 'Nome é obrigatório',
			(v) =>
				(v && v.length <= 10) ||
				'Nome deve ter menos que 10 caracteres',
		],
		email: '',
		emailRules: [
			(v) => !!v || 'E-mail é obrigatório',
			(v) => /.+@.+\..+/.test(v) || 'E-mail deve ser válido',
		],
		password: '',
		passwordRules: [
			(v) => !!v || 'A senha é obrigatória',
			(v) =>
				(v && v.length >= 6) ||
				'A senha deve ter, pelo menos, 6 caracteres',
		],
		confirmPassword: '',
		confirmPasswordRules: [
			(v) => !!v || 'A confirmação de senha é obrigatória',
			(v) =>
				(v && v.length >= 6 && v === this.password) ||
				'A confirmação de senha deve ser igual a senha',
		],
		showPassword: false,
		showConfirmPassword: false,
	}),
	methods: {
		goToLogin() {
			this.$router.push('/login');
		},
	},

};
</script>

<style></style>
