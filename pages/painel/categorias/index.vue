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
                        >
                            Adicionar Nova
                        </v-btn>
                    </div>
					<v-card class="pa-2" outlined tile>
						One of two columns
					</v-card>
				</v-col>
				<v-col  cols="12" sm="6" >
                    <div class="d-inline-flex align-center mb-3">
                        <p class="text-xl mr-2 mb-0">Produtos</p>
                        <v-btn
                        color="success"
                        elevation="5"
                        x-small
                        >
                            Adicionar Nova
                        </v-btn>
                    </div>
					<v-card class="pa-2" outlined tile>
						One of two columns
					</v-card>
				</v-col>
			</v-row>
		</v-container>
	</v-container>
</template>

<script>
export default {
	name: 'Categorias',
};
</script>

<style></style>
