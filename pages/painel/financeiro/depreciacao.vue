<template>
  <v-container fluid>
    <div class="pl-4 flex items-end gap-4">
			<v-icon size="35" color="cyan darken-4 "
				>mdi-view-dashboard-outline</v-icon
			>
			<h1 class="font-weight-regular text-2xl">Depreciação</h1>
		</div>
    <v-card class="pa-4">
            <v-card-text>
                <v-data-table
                    :headers="headers"
                    :items="depreciacao"
                    :items-per-page="5"
                    class="elevation-1"
                >
                    <template #[`item.actions`]="{ item }">
                        <v-icon small class="mr-2" @click="editItem(item)">
                            mdi-pencil
                        </v-icon>
                        <v-icon small @click="deleteItem(item)">
                            mdi-delete
                        </v-icon>
                    </template>
                </v-data-table>
            </v-card-text>
        </v-card>
  </v-container>
</template>

<script>
export default {
    data: () => ({
        headers: [
        {
            text: "Descrição",
            align: "start",
            sortable: false,
            value: "descricao",
        },
        { text: "Valor", value: "valor" },
        { text: "Data", value: "data" },
        { text: "Ações", value: "actions", sortable: false },
        ],
        depreciacao: [
        {
            descricao: "Máquina de Café",
            valor: "R$ 500,00",
            data: "01/01/2021",
        },
        {
            descricao: "Máquina de Café",
            valor: "R$ 500,00",
            data: "01/01/2021",

        },
    ],
    }),
}
</script>

<style>

</style>