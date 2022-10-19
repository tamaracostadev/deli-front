export const state = () => {
	return {
		providers: [],
	};
};

export const mutations = {
	SET_PROVIDERS(state, providers) {
		state.providers = providers;
	},
	ADD_PROVIDER(state, provider) {
		state.providers.push(provider);
	},
	UPDATE_PROVIDER(state, provider) {
		const index = state.providers.findIndex(
			(item) => item.id === provider.id
		);
		state.providers.splice(index, 1, provider);
	},
	DELETE_PROVIDER(state, provider) {
		const index = state.providers.findIndex(
			(item) => item.id === provider.id
		);
		state.providers.splice(index, 1);
	},
};

export const actions = {
	async fetchProviders({ commit }) {
		const providers = await this.$axios.$get(
			`${process.env.apiUrl}/provider/show`
		);
		commit('SET_PROVIDERS', providers);
	},
	async addProvider({ commit }, provider) {
		try {
			const newProvider = await this.$axios
				.post(process.env.apiUrl + '/provider/new', provider)
				.catch((err) => {
					return err.response.data;
				});
			if (newProvider.data.errors) {
				return newProvider;
			}
			commit('ADD_PROVIDER', newProvider.data.provider);
			return newProvider.data;
		} catch (error) {
			return error;
		}
	},
	async updateProvider({ commit }, provider) {
		try {
			const updatedProvider = await this.$axios
				.put(
					process.env.apiUrl + '/provider/update/' + provider.id,
					provider
				)
				.catch((err) => {
					return err.response.data;
				});
			if (updatedProvider.errors) {
				return updatedProvider;
			}
			commit('UPDATE_PROVIDER', updatedProvider.data.provider);
			return updatedProvider.data;
		} catch (error) {
			return error;
		}
	},
	async deleteProvider({ commit }, provider) {
		try {
			const deletedProvider = await this.$axios
				.delete(process.env.apiUrl + '/provider/delete/' + provider.id)
				.catch((err) => {
					return err.response.data;
				});
			if (deletedProvider.data.errors) {
				return deletedProvider.data;
			}
			commit('DELETE_PROVIDER', provider);
			return deletedProvider.data;
		} catch (error) {
			return error;
		}
	},
};

export const getters = {
	getProviders(state) {
		return state.providers;
	},
};
