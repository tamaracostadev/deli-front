<template>
	<v-container fluid>
		<h1 class="text-xl">
			<v-icon size="25" color="cyan darken-4 "
				>mdi-label-multiple-outline</v-icon
			>
			Categorias
		</h1>
		<v-container>
			<v-row fill-height dense>
				<v-col  cols="12" sm="6">
                    <div class="d-inline-flex align-center mb-3">
                        <p class="text-xl mr-2 mb-0">Insumos</p>
                        <v-btn
                        color="success"
                        elevation="5"
                        x-small
						@click="newCategory('Insumo')"
                        >
                            Adicionar Nova
                        </v-btn>
                    </div>
					<v-card class="pa-2" tile>
						<v-simple-table>
							<thead>
								<tr>
									<th class="w-full">Nome Categoria</th>
									<th class="text-center">Ação</th>
								</tr>
							</thead>
							<tbody>
								<tr  v-for="insumo in insumos" :key="insumo.id" >
									<td>{{insumo.name}}</td>
									<td class="flex">
										<v-btn
											color="success"
											icon
											@click="editCategory(insumo.id, 'input')"
										>
										<v-icon dark>mdi-pencil</v-icon>
										</v-btn>
										<v-btn
											color="error"
											icon
											@click="deleteCategory(insumo,'input')"
										>
											<v-icon dark>mdi-trash-can</v-icon>
										</v-btn>
									</td>
								</tr>
							</tbody>	
						</v-simple-table>
					</v-card>
				</v-col>
				<v-col  cols="12" sm="6" >
                    <div class="d-inline-flex align-center mb-3">
                        <p class="text-xl mr-2 mb-0">Produtos</p>
                        <v-btn
                        color="success"
                        elevation="5"
                        x-small
						@click="newCategory('Produto')"
                        >
                            Adicionar Nova
                        </v-btn>
                    </div>
					<v-card class="pa-2" tile>
						<v-simple-table>
							<thead>
								<tr>
									<th class="w-full">Nome Categoria</th>
									<th class="text-center">Ação</th>
								</tr>
							</thead>
							<tbody>
								<tr  v-for="produto in produtos" :key="produto.id" >
									<td>{{produto.name}}</td>
									<td class="flex">
										<v-btn
											color="success"
											icon
											@click="editCategory(produto.id,'product')"
										>
										<v-icon dark>mdi-pencil</v-icon>
										</v-btn>
										<v-btn
											color="error"
											icon
											@click="deleteCategory(produto,'product')"
										>
											<v-icon dark>mdi-trash-can</v-icon>
										</v-btn>
									</td>
								</tr>
							</tbody>	
						</v-simple-table>
					</v-card>
				</v-col>
			</v-row>
		</v-container>

		<Modal v-if="open" :id="id" :type="type"  :mode="mode"  @close="open = !open"/>
	</v-container>
</template>

<script>
import Modal from '~/components/category/modal.vue';
export default {
    name: "Categorias",
	components: { Modal },
	data() {
		return {
			type: "Insumo",
			open:false,
			icon: "success",
			mode: "Nova",
			id: 0,
		};
	},
    computed: {
         insumos() { return this.$store.state.categories.input; },
		 produtos() { return this.$store.state.categories.product; }
    },
    created() {
        this.$store.dispatch("categories/fetchCategories");
    },
	methods: {
		newCategory(type) { 
			this.open = true;
			this.mode = "Nova";
			this.type = type;
		},
		editCategory(id,type) {
			this.type = type === 'input' ? 'Insumo' : 'Produto';
			this.mode = "Editar";
			this.open = true;
			this.id = id;

		},
		deleteCategory(item) {
			this.$swal({
				title: `Excluir Categoria ${item.name}?`,
				text: "Essa ação não poderá ser desfeita!",
				icon: "warning",
				buttons: true,
				dangerMode: true,
				showCancelButton: true,
				cancelButtonText: "Cancelar",	
				confirmButtonText: 'Excluir',
				showLoaderOnConfirm: true,
				preConfirm: async() => {
					const response = await this.$store.dispatch("categories/deleteCategory", item);
					this.icon = response.errors ? 'error' : 'success';
					this.$toast(this.icon,response.errors ? response.message.join(' '): response.message);		
				},
			})
		},
	},
	
    
};
</script>

