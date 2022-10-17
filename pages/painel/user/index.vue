<template>
	<v-container fluid>
		<div class="pl-4 flex items-end gap-4">
			<v-icon size="35" color="cyan darken-4 ">mdi-account-cog</v-icon>
			<h1 class="font-weight-regular text-2xl">
				Configurações de Usuário
			</h1>
		</div>
		<div>
			<v-container>
				<v-row>
					<v-col cols="12" md="6">
						<v-card class="pa-4">
							<v-card-title class="font-weight-regular text-2xl"
								>Dados Do Usuário</v-card-title
							>
							<v-card-text>
								<v-form
									ref="form"
									v-model="valid"
									lazy-validation
								>
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
										:append-icon="
											showPassword
												? 'mdi-eye'
												: 'mdi-eye-off'
										"
										:type="
											showPassword ? 'text' : 'password'
										"
										label="Senha"
										hint="Deixe em branco para manter a senha atual"
										counter
										@click:append="
											showPassword = !showPassword
										"
									></v-text-field>
								</v-form>
							</v-card-text>
							<v-card-actions>
								<v-spacer></v-spacer>
								<v-btn color="cyan darken-4" text @click="save"
									>Salvar</v-btn
								>
							</v-card-actions>
						</v-card>
					</v-col>
				</v-row>
			</v-container>
		</div>
	</v-container>
</template>

<script>
export default {
	name: 'UserPage',
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
		showPassword: false,
	}),
};
</script>

<style></style>
