<template>
	<v-container fluid>
		<div class="d-inline-flex align-center mb-3">
			<v-toolbar flat>
				<h1 class="text-xl mr-2 mb-0">
					<v-icon size="30" color="cyan darken-4 "
						>mdi-factory</v-icon
					>
					Fornecedores
				</h1>
			</v-toolbar>
			<v-dialog v-model="dialog" max-width="500px">
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
										v-model="editedItem.provider"
										label="Razão Social"
									></v-text-field>
								</v-col>
								<v-col cols="12">
									<v-text-field
										v-model="editedItem.cnpj"
										v-mask="'##.###.###/####-##'"
										label="CNPJ"
									></v-text-field>
								</v-col>
								<v-col cols="12">
									<v-text-field
										v-model="editedItem.email"
										label="Email"
									></v-text-field>
								</v-col>
								<v-col cols="12">
									<v-text-field
										v-model="editedItem.phone"
										v-mask="'(##) #####-####'"
										label="Telefone"
									></v-text-field>
								</v-col>
								<v-col cols="12">
									<v-text-field
										v-model="editedItem.address"
										label="Endereço"
									></v-text-field>
								</v-col>
								<v-col cols="12">
									<v-text-field
										v-model="editedItem.obs"
										label="Observações"
									></v-text-field>
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
				:items="fornecedores"
				item-key="id"
				:items-per-page="10"
				class="elevation-2"
				:loading="loading"
				loading-text="Carregando... Aguarde um momento"
			>
				<template #[`item.actions`]="{ item }">
					<v-icon
						color="success"
						class="mr-2"
						@click="editProvider(item)"
					>
						mdi-pencil
					</v-icon>
					<v-icon color="error" @click="deleteProvider(item)">
						mdi-trash-can
					</v-icon>
				</template>
			</v-data-table>
		</v-container>
	</v-container>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
	data() {
		return {
			headers: [
				{
					text: 'Fornecedor',
					align: 'start',
					sortable: true,
					value: 'provider',
				},
				{
					text: 'Endereço',
					align: 'start',
					sortable: true,
					value: 'address',
				},
				{
					text: 'Email',
					align: 'start',
					sortable: true,
					value: 'email',
				},
				{
					text: 'Telefone',
					align: 'start',
					sortable: true,
					value: 'phone',
				},
				{
					text: 'Ações',
					align: 'start',
					sortable: true,
					value: 'actions',
				},
			],
			icon: 'success',
			loading: false,
			dialog: false,
			editedItem: {
				id: null,
				provider: '',
				cnpj: '',
				email: '',
				phone: '',
				address: '',
				obs: '',
			},
			defaultItem: {
				id: null,
				provider: '',
				cnpj: '',
				email: '',
				phone: '',
				address: '',
				obs: '',
			},
			editedIndex: -1,
		};
	},
	computed: {
		...mapGetters({
			fornecedores: 'providers/getProviders',
		}),
		formTitle() {
			return this.editedIndex === -1
				? 'Novo Fornecedor'
				: 'Editar Fornecedor';
		},
	},
	watch: {
		dialog(val) {
			val || this.close();
		},
	},
	async created() {
		await this.$store.dispatch('providers/fetchProviders');
		this.loading = false;
	},
	methods: {
		editProvider(item) {
			this.editedItem = Object.assign({}, item);
			this.editedIndex = this.fornecedores.indexOf(item);
			this.dialog = true;
		},
		deleteProvider(item) {
			this.$swal({
				title: `Excluir Fornecedor ${item.provider}?`,
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
						'providers/deleteProvider',
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
					`providers/updateProvider`,
					this.editedItem
				);
			} else {
				response = await this.$store.dispatch(
					`providers/addProvider`,
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
