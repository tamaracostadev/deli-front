<template>
	<div>
		<v-container fluid class="bg-[#ffe1e1] h-full">
			<!-- section main container bg color #FFE1E1-->
			<v-container>
				<v-row full-width>
					<v-col cols="6" md="6" class="d-flex flex-column justify-between py-10">
						<v-img
							:src="require('~/assets/img/logo_big.svg')"
							contain
							max-height="150px"
							max-width="300px"
						/>
						<div class="mt-14">
							<h1 class="text-4xl font-semibold">Gaste seu tempo no que importa!</h1>
							<p class="text-xl mt-3">Tenha o cadastro dos insumos e fichas técnicas em um só lugar.
								Saiba rapidamente o preço de custo dos seus produtos,
								além de sugestão de preço mínimo de venda para ter lucro no seu negócio.
							</p>
							<div class="d-flex justify-center">
								<v-btn
									color="secondary"
									x-large
									class="mt-8"
									@click="register()"
								>Comece gratuitamente</v-btn>
							</div>
						</div>
					</v-col>
					<v-col cols="6" md="6" class="d-flex justify-start align-content-end">
						<img
							:src="require('~/assets/img/img_home.svg')"
							class="w-full"
						/>
					</v-col>
				</v-row>
			</v-container>
		</v-container>
		<v-container class="my-10">
			<h1 class="text-4xl font-semibold text-center">A plataforma de ERP que vai levar seu restaurante a um novo patamar</h1>
			<p class="text-xl mt-5 text-center">
				Cerca de 80% dos novos bares e restaurantes fecham antes de completar 2 anos. <br>
				Um dos principais motivos é a falta de controle financeiro. <br>
				No Delimenu, você tem o cálculo do preço de custo e preço mínimo de venda de forma rápida e intuitiva, <br>
				além do controle de entradas, saídas e ponto de equilíbrio.
			</p>
			<div class="d-flex justify-center">
				<v-btn
					color="secondary"
					large
					class="my-3"
					@click="register()"
				>Aproveite seu ERP grátis</v-btn>
			</div>
		</v-container>

		<div class="w-full bg-gray-200">
			<v-container>
				<v-row>
					<v-col cols="4" md="4" class="mt-14 py-10 d-flex justify-center">
						<v-card
							elevation="5"
							disabled
							max-width="300"
						>
							<v-card-title class="text-center">
								<h1 class="w-full text-3xl font-semibold">Plano Premium</h1>
							</v-card-title>
							<v-card-text class="pb-0">
								<p class="mb-2">
									<v-icon color="success">mdi-check</v-icon>
									Itens do plano básico
								</p>
								<p class="mb-2">
									<v-icon>mdi-check</v-icon>
									Cadastro de clientes
								</p>
								<p class="mb-2">
									<v-icon>mdi-check</v-icon>
									PDV
								</p>
								<p class="mb-2">
									<v-icon>mdi-check</v-icon>
									Controle de preparo de pedidos na cozinha
								</p>
								<p class="mb-2">
									<v-icon>mdi-check</v-icon>
									Controle de formas de pagamento
								</p>
								<p class="mb-2">
									<v-icon>mdi-check</v-icon>
									Cadastro de funcionários
								</p>
							</v-card-text>
							<v-card-actions class="d-flex justify-center mb-4">
								<v-btn
									@click="register()"
								>Em breve</v-btn>
							</v-card-actions>
						</v-card>
					</v-col>
					<v-col cols="4" md="4" class="py-10 d-flex justify-center align-start">
						<v-card
							elevation="5"
							max-width="300"
						>
							<v-card-title class="text-center">
								<h1 class="w-full text-3xl font-semibold">Plano Básico</h1>
							</v-card-title>
							<v-card-text class="pb-0">
								<p class="mb-2">
									<v-icon color="success">mdi-check</v-icon>
									Cadastro de insumos
								</p>
								<p class="mb-2">
									<v-icon color="success">mdi-check</v-icon>
									Cadastro de fichas técnicas
								</p>
								<p class="mb-2">
									<v-icon color="success">mdi-check</v-icon>
									Cálculo de preço de custo
								</p>
								<p class="mb-2">
									<v-icon color="success">mdi-check</v-icon>
									Sugestão de preço de venda
								</p>
								<p class="mb-2">
									<v-icon color="success">mdi-check</v-icon>
									Controle de vendas
								</p>
								<p class="mb-2">
									<v-icon color="success">mdi-check</v-icon>
									Controle de custos fixos e variáveis
								</p>
								<p class="mb-2">
									<v-icon color="success">mdi-check</v-icon>
									Controle do faturamento e saúde da empresa
								</p>
							</v-card-text>
							<v-card-actions class="d-flex justify-center mb-4">
								<v-btn
									color="secondary"
									@click="register()"
								>Comece gratuitamente</v-btn>
							</v-card-actions>
						</v-card>
					</v-col>
					<v-col cols="4" md="4" class="py-10 d-flex justify-center align-end">
						<v-card
							elevation="5"
							disabled
							max-width="300"
						>
							<v-card-title class="text-center">
								<h1 class="w-full text-3xl font-semibold">Plano Delivery</h1>
							</v-card-title>
							<v-card-text class="pb-0">
								<p class="mb-2">
									<v-icon color="success">mdi-check</v-icon>
									Itens do plano básico
								</p>
								<p class="mb-2">
									<v-icon>mdi-check</v-icon>
									Controle de entregas
								</p>
								<p class="mb-2">
									<v-icon>mdi-check</v-icon>
									Integração com ifood
								</p>
								<p class="mb-2">
									<v-icon>mdi-check</v-icon>
									Página para receber os pedidos do seu restaurante
								</p>
								<p class="mb-2">
									<v-icon>mdi-check</v-icon>
									Controle do valor final a receber dos pedidos ifood
								</p>
							</v-card-text>
							<v-card-actions class="d-flex justify-center mb-4">
								<v-btn
									@click="register()"
								>Em breve</v-btn>
							</v-card-actions>
						</v-card>
					</v-col>
				</v-row>

			</v-container>
		</div>
	</div>
</template>

<script>

export default {
	name: 'IndexPage',
	layout: 'main',
	auth: false,
	data() {
		return {
			//
		};
	},
	methods: {
		register() {
			this.$router.push('/registrar');
		},
	},
};
</script>
