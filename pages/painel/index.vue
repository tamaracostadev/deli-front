<template>
	<v-container fluid>
		<div class="pl-4 flex items-end gap-4">
			<v-icon size="35" color="cyan darken-4 "
				>mdi-view-dashboard-outline</v-icon
			>
			<h1 class="font-weight-regular text-2xl">Dashboard</h1>
		</div>
		<v-divider class="my-4"></v-divider>
		<v-container fluid>
			<v-row dense>
				<v-col cols="6" md="4" lg="3">
					<v-card 
						class="pa-4"
						color="#26c6da"
						dark
					>
						<v-card-title class="pa-0">
							<v-icon size="35" color="cyan darken-4 "
								>mdi-cash-multiple</v-icon
							>
							<h2 class="font-weight-regular text-2xl">Saldo</h2>
						</v-card-title>
					</v-card>
				</v-col>
				<v-col cols="6" md="4" lg="3">
					<v-card class="pa-4">
						<v-card-title class="pa-0">
							<v-icon size="35" color="cyan darken-4 "
								>mdi-cash-multiple</v-icon
							>
							<h2 class="font-weight-regular text-2xl">
								Entradas
							</h2>
						</v-card-title>
					</v-card>
				</v-col>
				<v-col cols="6" md="4" lg="3">
					<v-card class="pa-4">
						<v-card-title class="pa-0">
							<v-icon size="35" color="cyan darken-4 "
								>mdi-cash-multiple</v-icon
							>
							<h2 class="font-weight-regular text-2xl">
								Saídas
							</h2>
						</v-card-title>
					</v-card>
				</v-col>
			</v-row>
		</v-container>
	</v-container>
</template>

<script>
export default {
	name: 'DashboardPage',
};
</script>
