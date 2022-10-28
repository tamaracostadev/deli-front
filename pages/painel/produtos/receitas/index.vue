<template>
	<v-container fluid>
		<div class="d-inline-flex align-center mb-3">
			<v-toolbar flat>
				<h1 class="text-xl mr-2 mb-0">
				<v-icon size="30" color="cyan darken-4 "
					>mdi-package-variant-closed</v-icon
				>
				Receitas
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
						Adicionar Nova
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
										v-model="editedItem.item"
										label="Nome Receita"
									></v-text-field>
								</v-col>
								<v-col cols="6">
									<vuetify-money
										v-model="editedItem.yield"
										:options="optionsfloat"
										label="Rendimento"
										@keyup="calcRecipeCost()"
									></vuetify-money>
								</v-col>
								<v-col cols="6">
									<v-select
									v-model="editedItem.measure"
									:items="medidas"
									label="Unidade de Medida"
									item-text="description"
									item-value="name"
									menu-props="auto"
									@change="calcRecipeCost()"
									></v-select>
								</v-col>
								<v-col cols="6">
									<vuetify-money
										v-model="editedItem.pack_cost"
										label="Custo Receita"
										:options="options"
										:disabled="true"
									></vuetify-money>
								</v-col>
								<v-col cols="6">
									<vuetify-money
										v-model="editedItem.unity_cost"
										label="Custo Por unidade"
										:options="options"
										:disabled="true"
									></vuetify-money>
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
									<v-textarea
										v-model="editedItem.preparation"
										label="Descrição/Modo de Preparo"
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
														:items="insumos"
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
				:items="receitas"
				item-key="id"
				:items-per-page="10"
				class="elevation-2"
				:loading="loadingtbl"
				loading-text="Carregando receitas... Aguarde um momento"
			>
				<template #[`item.actions`]="{ item }">
					<v-icon
						color="success"
						class="mr-2"
						@click="editRecipe(item)"
					>
						mdi-pencil
					</v-icon>
					<v-icon color="error" @click="deleteRecipe(item)">
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
					text: 'Nome',
					align: 'start',
					sortable: true,
					value: 'item',
				},
				{
					text: 'Rendimento',
					align: 'start',
					sortable: true,
					value: 'packsize',
				},
				{
					text: 'Preço Custo',
					align: 'start',
					sortable: true,
					value: 'pack_cost',
				},
				{
					text: 'Categoria',
					align: 'start',
					sortable: true,
					value: 'category',
				},
				{
					text: 'Ação',
					value: 'actions',
					sortable: false,
				},
			],
			
			icon: 'success',
			loading: false,
			loadingtbl: true,
			dialog: false,
			editedItem: {
				id: null,
				item: '',
				measure: '',
				unity_cost: 0,
				pack_cost: 0,
				category_id: '',
				yield: '',
				preparation: '',
				
			},
			editedIngredients:[
				{
					id_input: null,
					id_item: '',
					ammount: '',
					measure: '',
					cost: 0,
				}
			],
			defaultIngredients:[
				{
					id_input: null,
					id_item: '',
					ammount: '',
					measure: '',
					cost: 0,
				}
			],
			
			defaultItem: {
				id: null,
				item: '',
				measure: '',
				unity_cost: 0,
				pack_cost: 0,
				category_id: '',
				yield: '',
				preparation: '',
			},
			options: {
                locale: "pt-BR",
                prefix: "R$ ",
                suffix: "",
                length: 11,
                precision: 2
            },
			optionsfloat: {
                locale: "pt-BR",
                prefix: "",
                suffix: "",
                length: 11,
                precision: 0
            },
			editedIndex: -1,
		};
	},
	computed: {
		...mapGetters({
			medidas: 'products/recipes/getMeasures',
			receitas: 'products/recipes/getRecipes',
			ingredientes: 'products/recipes/getIngredients',
			insumos: "products/inputs/getInputs",
            categorias: "categories/getInputCategories",
			
		}),
		formTitle() {
			return this.editedIndex === -1
				? 'Nova Receita'
				: 'Editar Receita';
		},
	},
	watch: {
		dialog(val) {
			val || this.close();
		},
	},
	async created() {
		await this.$store.dispatch('products/recipes/fetchRecipes');
		await this.$store.dispatch('products/inputs/fetchInputs');
		await this.$store.dispatch('categories/fetchCategories');

		this.loadingtbl = false;
	},
	methods: {
		newRecipe() {
			this.dialog = true;
		},
		editRecipe(item) {
			this.editedIndex = this.receitas.indexOf(item);
			this.editedItem = Object.assign({}, item);
			this.editedIngredients = JSON.parse(JSON.stringify(this.ingredientes.filter(
				(ing) => ing.id_input === item.id
			)));
			this.editedIngredients = this.editedIngredients.map((ing) => {
				const unityCost = this.insumos.find((input) => input.id === ing.id_item).unity_cost;
				ing.cost = ing.ammount * unityCost;
				return ing;
			});
			this.dialog = true;
		},
		deleteRecipe(item) {
			this.$swal({
				title: `Excluir Receita ${item.item}?`,
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
						'products/recipes/deleteRecipe',
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
		calcRecipeCost(){
			const cost = this.editedIngredients.reduce((acc, item) => {
				return acc + item.cost;
			}, 0);

			this.editedItem.pack_cost = cost;
			this.editedItem.unity_cost = cost / this.editedItem.yield;
		
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
			const input = this.insumos.find(input => input.id === item.id_item);
			
			item.cost = input.unity_cost * item.ammount;
			item.measure = input.measure;
			this.editedIngredients.splice(index, 1, item);
			this.calcRecipeCost();

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
					`products/recipes/updateRecipe`,
					recipe
				);
			} else {
				response = await this.$store.dispatch(
					`products/recipes/addRecipe`,
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
	},
};
</script>
