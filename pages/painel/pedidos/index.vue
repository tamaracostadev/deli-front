<template>
	<v-container fluid>
		<div class="d-inline-flex align-center mb-3">
			<h1 class="text-xl mr-2 mb-0">
				<v-icon size="30" color="cyan darken-4 "
					>mdi-package-variant-closed</v-icon
				>
				Pedidos
			</h1>
			<v-btn color="success" elevation="5" x-small @click="newInput()">
				Adicionar Novo
			</v-btn>
		</div>
		<v-container>
			<v-data-table
				:headers="headers"
				:items="items"
				:items-per-page="10"
				class="elevation-2"
			>
			</v-data-table>
		</v-container>
	</v-container>
</template>

<script>
export default {
	data() {
		return {
			headers: [
				{
					text: 'Id',
					align: 'start',
					sortable: true,
					value: 'id',
				},
				{
					text: 'Cliente',
					align: 'start',
					sortable: true,
					value: 'Client',
				},
				{
					text: 'Valor Pedido',
					align: 'start',
					sortable: true,
					value: 'orderPrice',
				},
				{
					text: 'Forma Pgto',
					align: 'start',
					sortable: true,
					value: 'payMethod',
				},
				{
					text: 'Origem',
					align: 'start',
					sortable: true,
					value: 'origin',
				},
				{
					text: 'Tipo Entrega',
					align: 'start',
					sortable: true,
					value: 'deliveryType',
				},
				{
					text: 'Valor Entrega',
					align: 'start',
					sortable: true,
					value: 'deliveryFee',
				},
				{
					text: 'Status',
					align: 'start',
					sortable: true,
					value: 'status',
				},
				{
					text: 'Ação',
					value: 'action',
					sortable: false,
				},
			],
		};
	},
};
</script>
