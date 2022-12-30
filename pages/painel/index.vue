<template>
	<v-container fluid>
		<div class="pl-4 flex items-end gap-4">
			<v-icon size="35" color="cyan darken-4 "
				>mdi-view-dashboard-outline</v-icon
			>
			<h1 class="font-weight-regular text-2xl">Dashboard</h1>
		</div>
		<v-divider class="my-4"></v-divider>
		<v-container fluid>
			<v-row dense>
				<v-col cols="6" md="4" lg="3">
					<v-card
						class="pa-3"
					>
						<v-card-title class="pa-0 flex align-items-center gap-3">
							<div>
								<v-btn
									color="gray lighten-5"
									tile
									icon
									x-large
									dark
									elevation="4"
									class="mr-4 cyan darken-1 rounded-sm"
								>
									<v-icon>mdi-home-analytics</v-icon>
								</v-btn>
							</div>
							<div class="pa-0 flex flex-column justify-space-between">
								<h2 class="font-weight-regular text-xl">Custos fixos</h2>
								<p class="font-weight-regular text-lg mb-0">{{ somaCustoFixo.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) }}</p>
							</div>
						</v-card-title>
					</v-card>
				</v-col>
				<v-col cols="6" md="4" lg="3">
					<v-card class="pa-3">
						<v-card-title class="pa-0 flex align-items-center gap-3">
							<div>
								<v-btn
									color="gray lighten-5"
									tile
									icon
									x-large
									dark
									elevation="4"
									class="mr-4 bg-yellow-400 rounded-sm"
								>
									<v-icon>mdi-chart-line</v-icon>
								</v-btn>
							</div>
							<div class="pa-0 flex flex-column justify-space-between">
								<h2 class="font-weight-regular text-xl">Custos variáveis</h2>
								<p class="font-weight-regular text-lg mb-0">{{ somaCustoVariavel.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}}</p>
							</div>
						</v-card-title>
					</v-card>
				</v-col>
				<v-col cols="6" md="4" lg="3">
					<v-card class="pa-3">
						<v-card-title class="pa-0 flex align-items-center gap-3">
							<div>
								<v-btn
									color="gray lighten-5"
									tile
									icon
									x-large
									dark
									elevation="4"
									class="mr-4 bg-green-400 rounded-sm"
								>
									<v-icon>mdi-currency-usd</v-icon>
								</v-btn>
							</div>
							<div class="pa-0 flex flex-column justify-space-between">
								<h2 class="font-weight-regular text-xl">Entradas</h2>
								<p class="font-weight-regular text-lg mb-0">{{ somaVenda.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) }}</p>
							</div>
						</v-card-title>
					</v-card>
				</v-col>
				<v-col cols="6" md="4" lg="3">
					<v-card class="pa-3">
						<v-card-title class="pa-0 flex align-items-center gap-3">
							<div>
								<v-btn
									color="gray lighten-5"
									tile
									icon
									x-large
									dark
									elevation="4"
									:class="`mr-4 ${ saldo < 0 ? 'bg-red-500': 'bg-green-400'} rounded-sm`"
								>
									<v-icon>mdi-scale-balance</v-icon>
								</v-btn>
							</div>
							<div class="pa-0 flex flex-column justify-space-between">
								<h2 class="font-weight-regular text-xl">Saldo Mês</h2>
								<p class="font-weight-regular text-lg mb-0"> {{ saldo.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) }}</p>
							</div>
						</v-card-title>
					</v-card>
				</v-col>
			</v-row>
			<!-- table last orders -->
			<!-- table last items / categories -->
			<v-row>
				<v-col cols="12" md="8">
					<v-card class="pa-0">
						<v-card-title class="pt-2">
							<h2>Últimos Produtos</h2>
						</v-card-title>
						<v-card-text>
							<v-data-table
								:headers="headerProdutos"
								:items="produtos"
								item-key="id"
								:items-per-page="10"
								class="elevation-2"
								:loading="loadingtbl"
								loading-text="Carregando produtos... Aguarde um momento"
							>
							</v-data-table>
						</v-card-text>
					</v-card>
				</v-col>
				<!-- Categorias -->
				<v-col cols="12" md="4">
					<v-card class="pa-0">
						<v-card-title class="pt-2">
							<h2>Categorias</h2>
						</v-card-title>
						<v-card-text>
							<!-- tabs categorias -->
							<v-tabs
								centered
							>
								<v-tab>Insumos</v-tab>
								<v-tab>Produtos</v-tab>
								<v-tab-item>
									<v-card-text>
										<v-simple-table>
											<thead>
												<tr>
													<th class="w-full">Categoria</th>
													<th class="text-center">Ação</th>
												</tr>
											</thead>
											<tbody>
												<tr v-for="insumo in categoriasInsumos" :key="insumo.id">
													<td>{{ insumo.name }}</td>
													<td class="flex">
														<v-btn
															color="success"
															icon
															@click="
																editCategory(insumo.id, 'input')
															"
														>
															<v-icon dark>mdi-pencil</v-icon>
														</v-btn>
														<v-btn
															color="error"
															icon
															@click="
																deleteCategory(insumo, 'input')
															"
														>
															<v-icon dark>mdi-trash-can</v-icon>
														</v-btn>
													</td>
												</tr>
											</tbody>
										</v-simple-table>
									</v-card-text>
								</v-tab-item>
								<v-tab-item>
									<v-card-text>
										<v-simple-table>
											<thead>
												<tr>
													<th class="w-full">Categoria</th>
													<th class="text-center">Ação</th>
												</tr>
											</thead>
											<tbody>
												<tr v-for="produto in categoriasProdutos" :key="produto.id">
													<td>{{ produto.name }}</td>
													<td class="flex">
														<v-btn
															color="success"
															icon
															@click="
																editCategory(produto.id, 'product')
															"
														>
															<v-icon dark>mdi-pencil</v-icon>
														</v-btn>
														<v-btn
															color="error"
															icon
															@click="
																deleteCategory(produto, 'product')
															"
														>
															<v-icon dark>mdi-trash-can</v-icon>
														</v-btn>
													</td>
												</tr>
											</tbody>
										</v-simple-table>
									</v-card-text>
								</v-tab-item>
							</v-tabs>
						</v-card-text>
					</v-card>
				</v-col>
			</v-row>
		</v-container>
		<Modal
				v-if="open"
				:id="id"
				:type="type"
				:mode="mode"
				@close="open = !open"
			/>
	</v-container>
</template>

<script>
import { mapGetters } from 'vuex';
import Modal from '~/components/category/modal.vue';
export default {

	name: 'DashboardPage',
	components: { Modal },
	data() {
		return {
			open: false,
			id: null,
			type: null,
			mode: null,
			loadingtbl: false,
			headerProdutos: [
				{
					text: 'PDV',
					align: 'start',
					sortable: true,
					value: 'pdv',
				},
				{
					text: 'Nome',
					align: 'start',
					sortable: true,
					value: 'product',
				},
				{
					text: 'Categoria',
					align: 'start',
					sortable: true,
					value: 'category',
				},
				{
					text: 'Tipo',
					align: 'start',
					sortable: true,
					value: 'type',
				},
				{
					text: 'Preço de custo',
					align: 'start',
					sortable: true,
					value: 'cost',
				},
				{
					text: 'Preço de venda',
					align: 'start',
					sortable: true,
					value: 'sell',
				}
			],
			somaCustoFixo: 0,
			somaCustoVariavel: 0,
			somaVenda: 0,
			saldo: 0,
		}
	},
	computed: {
		...mapGetters({
			categoriasInsumos: 'categories/getInputCategories',
			categoriasProdutos: 'categories/getProductCategories',
			produtos: 'products/getProducts',
			custoFixo: 'finance/costs/fixedCosts',
			custoVariavel: 'finance/costs/variableCosts',
			pedidos: 'finance/orders/getOrders',

		}),
	},
	async created() {
		this.loadingtbl = true;
		await this.$store.dispatch('categories/fetchCategories');
		await this.$store.dispatch('products/fetchProducts');
		await this.$store.dispatch('finance/costs/fetchFixedCosts');
		await this.$store.dispatch('finance/costs/fetchVariableCosts');
		this.getSomas()
		this.loadingtbl = false;
	},
	methods: {
		getSomas(){
			this.somaCustoFixo = this.custoFixo.reduce((a, b) => parseFloat(a) + parseFloat(b.cost), 0);
			this.somaCustoVariavel = this.custoVariavel.reduce((a, b) => parseFloat(a)  +  parseFloat(b.cost), 0);
			this.somaVenda = this.pedidos.reduce((a, b) => parseFloat(a)  + parseFloat(b.sell), 0);
			this.saldo = this.somaVenda - (this.somaCustoFixo + this.somaCustoVariavel);
		},
		editCategory(id, type) {
			this.type = type === 'input' ? 'Insumo' : 'Produto';
			this.mode = 'Editar';
			this.open = true;
			this.id = id;
		},
		deleteCategory(item) {
			this.$swal({
				title: `Excluir Categoria ${item.name}?`,
				text: 'Essa ação não poderá ser desfeita!',
				icon: 'warning',
				buttons: true,
				dangerMode: true,
				showCancelButton: true,
				cancelButtonText: 'Cancelar',
				confirmButtonText: 'Excluir',
				showLoaderOnConfirm: true,
				preConfirm: async () => {
					const response = await this.$store.dispatch(
						'categories/deleteCategory',
						item
					);
					this.icon = response.errors ? 'error' : 'success';
					this.$toast(
						this.icon,
						response.errors
							? response.message.join(' ')
							: response.message
					);
				},
			});
		},
	},
};
</script>
