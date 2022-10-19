<template>
	<v-container fluid>
		<div class="d-inline-flex align-center mb-3">
			<h1 class="text-xl mr-2 mb-0">
				<v-icon size="30" color="cyan darken-4 "
					>mdi-package-variant-closed</v-icon
				>
				Produtos
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
					text: 'PDV',
					align: 'start',
					sortable: true,
					value: 'id',
				},
				{
					text: 'Nome',
					align: 'start',
					sortable: true,
					value: 'name',
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
					value: 'costPrice',
				},
				{
					text: 'Preço de venda',
					align: 'start',
					sortable: true,
					value: 'sellPrice',
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
