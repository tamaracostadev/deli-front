import Vue from 'vue';

Vue.mixin({
	methods: {
		$toast(type, message) {
			this.$swal.fire({
				toast: true,
				position: 'top-right',
				icon: type,
				title: message,
				timerProgressBar: true,
				showConfirmButton: false,
				timer: 2000,
			});
		},
	},
});
