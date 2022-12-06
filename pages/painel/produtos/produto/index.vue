<template>
	<v-container fluid>
		<div class="d-inline-flex align-center mb-3">
			<v-toolbar flat>
				<h1 class="text-xl mr-2 mb-0">
				<v-icon size="30" color="cyan darken-4 "
					>mdi-package-variant-closed</v-icon
				>
				Produtos
			</h1>
			</v-toolbar>
			<v-dialog v-model="dialog" max-width="600px">
				<template #activator="{ on, attrs }">
					<v-btn
						color="success"
						elevation="5"
						x-small
						v-bind="attrs"
						v-on="on"
					>
						Adicionar Novo
					</v-btn>
				</template>
				<v-card>
					<v-card-title>
						<span class="text-h5">{{ formTitle }}</span>
					</v-card-title>

					<v-card-text>
						<v-container>
							<v-row dense>
								<v-col cols="12">
									<v-text-field
										v-model="editedItem.product"
										label="Nome Produto"
									></v-text-field>
								</v-col>
								<v-col cols="12">
									<v-text-field
										v-model="editedItem.pdv"
										label="Código Produto (PDV)"
									></v-text-field>
								</v-col>
								<v-col cols="12">
									<v-select
									v-model="editedItem.category_id"
									:items="categorias"
									label="Categoria"
									item-text="name"
									item-value="id"
									menu-props="auto"
									dense
									></v-select>
								</v-col>
								<v-col cols="12">
									<v-radio-group
									v-model="editedItem.type"
									row
									>
									<v-radio
									label="Produto"
									value="produto"
									></v-radio>
									<v-radio
									label="Complemento"
									value="complemento"
									></v-radio>
									</v-radio-group>

								</v-col>
								<v-col cols="6">
									<vuetify-money
										v-model="editedItem.sell"
										label="Preço de Venda"
										:options="options"
										@keyup="calcProductCost()"
									></vuetify-money>
								</v-col>
								<v-col cols="6">
									<vuetify-money
										v-model="editedItem.cost"
										label="Preço de Custo"
										:options="options"
										:disabled="true"
									></vuetify-money>
								</v-col>
								<v-col cols="6">
									<vuetify-money
										v-model="editedItem.sugestedPrice"
										label="Preço Sugerido"
										:options="options"
										:disabled="true"
									></vuetify-money>
								</v-col>
								<v-col cols="6">
									<vuetify-money
										v-model="editedItem.profit"
										label="Porcentagem de Lucro"
										:options="optionsPorc"
										:disabled="true"
									></vuetify-money>
								</v-col>



								<v-col cols="12">
									<v-textarea
										v-model="editedItem.preparation"
										label="Descrição"
										auto-grow
										counter
										clearable
										rows="1"
										max-rows="4"
									></v-textarea>
								</v-col>
								<v-col cols="12">
									<div class="d-inline-flex align-center mb-3">
										<h1 class="text-xl mr-2 mb-0">
											Lista de Ingredientes
										</h1>
										<v-btn color="success" elevation="5" x-small @click="addIngredient()">
											Adicionar Ingrediente
										</v-btn>
									</div>
									<v-simple-table>
										<template #default>
											<thead>
												<tr>
													<th class="text-left">Ingrediente</th>
													<th class="text-left">Quantidade</th>
													<th class="text-left">Unidade</th>
													<th class="text-left">Custo</th>
													<th class="text-left">Ação</th>
												</tr>
											</thead>
											<tbody>
												<tr v-for="(item, i) in editedIngredients" :key="i">
													<td>
														<v-select
														v-model="item.id_item"
														:items="ingredientes"
														label="Ingrediente"
														item-text="item"
														item-value="id"
														menu-props="auto"
														@change="calcCost(i)"
														></v-select>
													</td>
													<td><v-text-field
														v-model="item.ammount"
														v-mask="'######'"
														label="Qtd"
														@keyup="calcCost(i)"
													></v-text-field></td>
													<td>{{ item.measure }}</td>
													<td>R$ {{ item.cost.toLocaleString('pt-br') }}</td>
													<td>
														<v-btn
															color="error"
															x-small
															fab
															@click="removeIngredient(i)"
														>
															<v-icon>mdi-delete</v-icon>
														</v-btn>
													</td>
												</tr>
											</tbody>
										</template>
									</v-simple-table>
								</v-col>
							</v-row>
						</v-container>
					</v-card-text>

					<v-card-actions>
						<v-spacer></v-spacer>
						<v-btn color="blue darken-1" text @click="close">
							Cancelar
						</v-btn>
						<v-btn
							color="blue darken-1"
							text
							:loading="loading"
							@click="save"
						>
							Salvar
						</v-btn>
					</v-card-actions>
				</v-card>
			</v-dialog>
		</div>
		<v-container>
			<v-data-table
				:headers="headers"
				:items="produtos"
				item-key="id"
				:items-per-page="10"
				class="elevation-2"
				:loading="loadingtbl"
				loading-text="Carregando produtos... Aguarde um momento"
			>
				<template #[`item.actions`]="{ item }">
					<v-icon
						color="success"
						class="mr-2"
						@click="editProduct(item)"
					>
						mdi-pencil
					</v-icon>
					<v-icon color="error" @click="deleteProduct(item)">
						mdi-trash-can
					</v-icon>
				</template>
			</v-data-table>
		</v-container>
	</v-container>
</template>

<script>
import { mapGetters } from 'vuex';
import VuetifyMoney from '../../../../components/VuetifyMoney.vue';
export default {
	components: { VuetifyMoney },
	data() {
		return {
			headers: [
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
				},
				{
					text: 'Ação',
					value: 'actions',
					sortable: false,
				},
			],
			icon: 'success',
			loadingtbl: true,
			loading: false,
			dialog: false,
			editedIngredients:[
				{
				id_input: null,
				id_item: '',
				ammount: 0,
				measure: '',
				cost: 0,
				}
			],
			defaultIngredients: [{
				id_input: null,
				id_item: '',
				ammount: 0,
				measure: '',
				cost: 0,
			}],
			defaultItem: {
				id: '',
				product: '',
				category: '',
				type: '',
				cost: '',
				sugestedPrice: '',
				sell: '',
				profit: '',
			},
			editedItem: {
				id: '',
				product: '',
				category: '',
				type: '',
				cost: '',
				sell: '',
				profit: '',
				sugestedPrice: '',
			},
			options: {
                locale: "pt-BR",
                prefix: "R$ ",
                suffix: "",
                length: 11,
                precision: 2
            },
			optionsPorc: {
                locale: "pt-BR",
                prefix: "",
                suffix: "%",
                length: 11,
                precision: 2
            },
			editedIndex: -1,
			ingredientes: []
		};
	},
	computed: {
		...mapGetters({
			produtos: 'products/getProducts',
			ingredientesProdutos: 'products/getIngredients',
			medidas: 'products/recipes/getMeasures',
			receitas: 'products/recipes/getRecipes',
			insumos: "products/inputs/getInputs",
            categorias: "categories/getProductCategories",
		}),
		formTitle() {
			return this.editedIndex === -1
				? 'Novo Produto'
				: 'Editar Produto';
		},
	},
	watch: {
		dialog(val) {
			val || this.close();
		},
	},
	async created() {
		await this.$store.dispatch('products/inputs/fetchInputs');
		await this.$store.dispatch('products/fetchProducts');
		await this.$store.dispatch('products/recipes/fetchRecipes');
		this.ingredientes = [...this.receitas, ...this.insumos];
		await this.$store.dispatch('categories/fetchCategories');
		this.loadingtbl = false;
	},
	methods:{
		newProduct() {
			this.dialog = true;
		},
		editProduct(item) {
			this.editedIndex = this.produtos.indexOf(item);
			this.editedItem = Object.assign({}, item);
			const ingredients = JSON.parse(JSON.stringify(this.ingredientesProdutos.filter(
				(ing) => ing.id_input === item.id
			)));
			const idInput = this.editedIndex === -1 ? null : item.id;
			this.editedIngredients = ingredients.map((ing) => {
				const unityCost = this.ingredientes.find(input => input.id === ing.id_item).unity_cost;
				const cost = ing.ammount * unityCost;
				return {
					id_input: idInput,
					id_item: ing.id_item,
					ammount: ing.ammount,
					measure: ing.measure,
					cost,
				};
			});
			this.calcProductCost();
			this.dialog = true;
		},
		deleteProduct(item) {
			this.$swal({
				title: `Excluir Produto ${item.product}?`,
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
						'products/deleteProduct',
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

		addIngredient() {
			this.editedIngredients.push({
				id_input: null,
				id_item: '',
				ammount: '',
				cost: '',
				measure: '',
			});
		},
		removeIngredient(index) {
			this.editedIngredients.splice(index, 1);
		},
		calcCost(index){
			const item = Object.assign({}, this.editedIngredients[index]);
			const input = this.ingredientes.find(input => input.id === item.id_item);

			item.cost = input.unity_cost * item.ammount;
			item.measure = input.measure;
			this.editedIngredients.splice(index, 1, item);
			this.calcProductCost();

		},
		calcProductCost(){
			const cost = this.editedIngredients.reduce((acc, ing) => {
				return acc + ing.cost;
			}, 0);
			this.editedItem.cost = cost;
			this.editedItem.sugestedPrice = cost * 3;
			this.editedItem.profit = (1-(this.editedItem.cost / this.editedItem.sell)) * 100;
		},
		close() {
			this.dialog = false;
			this.$nextTick(() => {
				this.editedItem = Object.assign({}, this.defaultItem);
				this.editedIngredients = Object.assign({}, this.defaultIngredients);
				this.editedIndex = -1;
			});
		},
		async save() {
			this.loading = true;
			let response;
			const recipe = Object.assign({}, this.editedItem);
			recipe.ingredients = this.editedIngredients;
			if (this.editedIndex > -1) {
				response = await this.$store.dispatch(
					`products/updateProduct`,
					recipe
				);
			} else {
				response = await this.$store.dispatch(
					`products/addProduct`,
					recipe
				);
			}
			this.icon = response.errors ? 'error' : 'success';
			this.loading = false;
			this.$toast(
				this.icon,
				response.errors ? response.message.join(' ') : response.message
			);
			this.close();
		},
	}
};
</script>
