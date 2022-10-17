<template>
	<v-container fluid>
		<template v-if="register">
			<Registrar @show-login="register = !register" />
		</template>
		<template v-else>
			<Login @show-register="register = !register" />
		</template>
	</v-container>
</template>

<script>
import Login from '~/components/auth/login.vue';
import Registrar from '~/components/auth/registrar.vue';
export default {
	name: 'IndexPage',
	components: { Login, Registrar },
	layout: 'main',
	auth: false,
	data() {
		return {
			register: false,
		};
	},
};
</script>
