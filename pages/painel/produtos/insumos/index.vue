<template>
	<v-container fluid>
		<div class="d-inline-flex align-center mb-3">
			<v-toolbar flat>
				<h1 class="text-xl mr-2 mb-0">
					<v-icon size="30" color="cyan darken-4 "
						>mdi-package-variant-closed</v-icon
					>
					Insumos
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
							<v-row>
								<v-col cols="12">
									<v-text-field
										v-model="editedItem.item"
										label="Insumo"
									></v-text-field>
								</v-col>
								
								<v-col cols="12">
									<v-text-field
										v-model="editedItem.packsize"
										label="Tamanho Pacote"
									></v-text-field>
								</v-col>
								<v-col cols="12">
									<p>Medida</p>
									<v-radio-group
										v-model="editedItem.measure"
										mandatory
										row
									>
										<v-radio label="Unidade" value="un"></v-radio>
										<v-radio label="Quilo" value="kg"></v-radio>
										<v-radio label="Grama" value="g"></v-radio>
										<v-radio label="Litro" value="l"></v-radio>
										<v-radio label="Mililitro" value="ml"></v-radio>
								</v-radio-group>
								</v-col>
								<v-col cols="12">
									<vuetify-money
										v-model="editedItem.pack_cost"
										:options="options"
										label="Custo Pacote"
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
									<v-select
									v-model="editedItem.provider_id"
									:items="fornecedores"
									item-text="provider"
									item-value="id"
									menu-props="auto"
									label="Fornecedor"
									dense
									></v-select>
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
				:items="insumos"
				item-key="id"
				:items-per-page="10"
				class="elevation-2"
				:loading="loadingtbl"
				loading-text="Carregando Insumos... Aguarde um momento"
			>
				<template #[`item.actions`]="{ item }">
					<v-icon
						color="success"
						class="mr-2"
						@click="editInput(item)"
					>
						mdi-pencil
					</v-icon>
					<v-icon color="error" @click="deleteInput(item)">
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
                    text: "Item",
                    align: "start",
                    sortable: true,
                    value: "item",
                },
                {
                    text: "Tamanho Pcte",
                    align: "start",
                    sortable: true,
                    value: "packsize",
                },
                {
                    text: "Preço Pcte",
                    align: "start",
                    sortable: true,
                    value: "pack_cost",
                },
                {
                    text: "Categoria",
                    align: "start",
                    sortable: true,
                    value: "category",
                },
                {
                    text: "Fornecedor",
                    align: "start",
                    sortable: true,
                    value: "provider",
                },
                {
                    text: "Ação",
                    value: "actions",
                    sortable: false,
                },
            ],
            icon: "success",
            loading: false,
			loadingtbl: true,
            dialog: false,
            editedIndex: -1,
            editedItem: {
                id: null,
                item: "",
                measure: "",
                packsize: 0,
                pack_cost: 0,				
                category_id: null,
                provider_id: null,
            },
            defaultItem: {
                id: null,
                item: "",
                measure: "",
                packsize: 0,
                pack_cost: 0,
                category_id: null,
                provider_id: null,
            },
            options: {
                locale: "pt-BR",
                prefix: "R$ ",
                suffix: "",
                length: 11,
                precision: 2
            },
        };
    },
    computed: {
        ...mapGetters({
			insumos: "products/inputs/getInputs",
            fornecedores: "providers/getProviders",
            categorias: "categories/getInputCategories",
        }),
        formTitle() {
            return this.editedIndex === -1
                ? "Novo Insumo"
                : "Editar Insumo";
        },
    },
    watch: {
        dialog(val) {
            val || this.close();
        },
    },
    async created() {
        await this.$store.dispatch("providers/fetchProviders");
        await this.$store.dispatch("categories/fetchCategories");
        await this.$store.dispatch("products/inputs/fetchInputs");
        this.loadingtbl = false;
    },
    methods: {
        editInput(item) {
            this.editedIndex = this.insumos.indexOf(item);
            this.editedItem = Object.assign({}, item);
            this.dialog = true;
        },
        deleteInput(item) {
			this.$swal({
				title: `Excluir Insumo ${item.item}?`,
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
						'products/inputs/deleteInput',
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
        close() {
            this.dialog = false;
            this.$nextTick(() => {
                this.editedItem = Object.assign({}, this.defaultItem);
                this.editedIndex = -1;
            });
        },
        async save() {
            this.loading = true;
			let response;
			if (this.editedIndex > -1) {
				response = await this.$store.dispatch(
					`products/inputs/updateInput`,
					this.editedItem
				);
			} else {
				response = await this.$store.dispatch(
					`products/inputs/addInput`,
					this.editedItem
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
