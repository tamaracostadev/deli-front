<template>
	<v-container fluid>
		<div class="pl-4 flex items-end gap-4">
			<v-icon size="35" color="cyan darken-4 "
				>mdi-view-dashboard-outline</v-icon
			>
			<h1 class="font-weight-regular text-2xl">Custos Variáveis</h1>
		</div>
		<v-divider class="my-4"></v-divider>
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
										v-model="editedItem.description"
										label="Nome"
									></v-text-field>
								</v-col>
								<v-col cols="12">
									<vuetify-money
										v-model="editedItem.cost"
                                        :options="options"
										label="Custo"
									></vuetify-money>
								</v-col>
								<v-col cols="12">
									<v-menu
										v-model="menu"
										:close-on-content-click="false"
										transition="scale-transition"
										offset-y
										max-width="290px"
										min-width="auto"
									>
										<template #activator="{ on, attrs }">
											<v-text-field
												v-model="dateFormatted"
												label="Data Vencimento"
												hint="DD/MM/YYYY"
												persistent-hint
												v-bind="attrs"
												prepend-icon="mdi-calendar"
												v-on="on"
												@blur="editedItem.date = parseDate(dateFormatted)"
											>
											</v-text-field>
										</template>
										<v-date-picker
											v-model="date"
											no-title
											color="secondary"
											@input="menu = false"
										></v-date-picker>
									</v-menu>
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
		<v-data-table
			:headers="headers"
			:items="custoFixo"
			:items-per-page="5"
			:loading="loading"
			class="elevation-1"
		>
			<template #[`item.cost`]="{ item }">
				{{ item.cost.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) }}
			</template>
			<template #[`item.date`]="{ item }">
				{{  formatDate(item.date.substring(0,10)) }}
			</template>
			<template #[`item.actions`]="{ item }">
				<v-icon small class="mr-2" @click="editItem(item)">
					mdi-pencil
				</v-icon>
				<v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
			</template>
		</v-data-table>
	</v-container>
</template>

<script>
import { mapGetters } from 'vuex';
import VuetifyMoney from '../../../components/VuetifyMoney.vue';
export default {
    components: { VuetifyMoney },
	data: () => ({
        dialog: false,
        loading: false,
		menu: false,
        editedIndex: -1,
		icon:'',
        editedItem: {
			id: '',
            description: '',
            cost: '',
            date: '',
			type: 'variable'
        },
        defaultItem: {
			id: '',
            description: '',
            cost: '',
            date: '',
			type: 'variable'
        },
        options: {
                locale: "pt-BR",
                prefix: "R$ ",
                suffix: "",
                length: 11,
                precision: 2
            },
		headers: [
			{
				text: 'Item',
				align: 'start',
				value: 'description',
			},
			{ text: 'Valor', value: 'cost' },
			{ text: 'Data', value: 'date' },
			{ text: 'Ações', value: 'actions', sortable: false },
		],
		date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substring(0, 10),
      	dateFormatted: '',
	}),
    computed: {
        formTitle() {
            return this.editedIndex === -1 ? 'Novo Item' : 'Editar Item'
        },
		...mapGetters({
			custoFixo: 'finance/costs/variableCosts',
		}),
    },
	watch: {
        dialog(val) {
            val || this.close()
        },
		date (val) {
			this.dateFormatted = this.formatDate(this.date)
			this.editedItem.date = this.date
		},
    },
	async created() {
		this.loading = true
		await this.$store.dispatch('finance/costs/fetchVariableCosts');
		this.loading = false
	},
    
    methods: {
		formatDate (date) {
			if (!date) return null

			const [year, month, day] = date.split('-')
			return `${day}/${month}/${year}`
		},
		parseDate (date) {
			if (!date) return null

			const [day, month, year] = date.split('/')
			return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
		},
        editItem(item) {
            this.editedIndex = this.custoFixo.indexOf(item)
            this.editedItem = Object.assign({}, item)
			this.date = this.editedItem.date.substring(0,10)
            this.dialog = true
        },
        deleteItem(item) {
			this.$swal({
				title: `Excluir Custo ${item.description}?`,
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
						'finance/costs/deleteVariableCost',
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
            this.dialog = false
            this.$nextTick(() => {
                this.editedItem = Object.assign({}, this.defaultItem)
                this.editedIndex = -1
            })
        },
        async save() {
			this.loading = true;
			let response;
			if (this.editedIndex > -1) {
				response = await this.$store.dispatch(
					`finance/costs/updateVariableCost`,
					this.editedItem
				);
			} else {
				response = await this.$store.dispatch(
					`finance/costs/addVariableCost`,
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
