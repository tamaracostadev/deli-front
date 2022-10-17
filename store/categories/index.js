export const state = () => {
	return {
		input: [],
		product: [],
	};
};

export const mutations = {
	SET_INPUT_CATEGORIES(state, categories) {
		state.input = categories;
	},
	SET_PRODUCT_CATEGORIES(state, categories) {
		state.product = categories;
	},
	ADD_CATEGORY(state, category) {
		state[category.type].push(category);
	},
	UPDATE_CATEGORY(state, category) {
		const index = state[category.type].findIndex(
			(item) => item.id === category.id
		);
		state[category.type][index] = category;
	},
	DELETE_CATEGORY(state, category) {
		const index = state[category.type].findIndex(
			(item) => item.id === category.id
		);
		state[category.type].splice(index, 1);
	},
};

export const actions = {
	async fetchCategories({ commit }) {
		const input = await this.$axios.$get(
			process.env.apiUrl + '/category/show?type=I'
		);
		const product = await this.$axios.$get(
			process.env.apiUrl + '/category/show?type=P'
		);
		commit('SET_INPUT_CATEGORIES', input);
		commit('SET_PRODUCT_CATEGORIES', product);
	},
	async addCategory({ commit }, category) {
		try {
			const newCategory = await this.$axios
				.$post(process.env.apiUrl + '/category/new', {
					name: category.name,
					type: category.type,
				})
				.catch((err) => {
					return err.response.data;
				});
			if (newCategory.errors) {
				return newCategory;
			}
			commit('ADD_CATEGORY', newCategory.category);
			return newCategory;
		} catch (error) {
			return error;
		}
	},
	async deleteCategory({ commit }, category) {
		try {
			const deletedCategory = await this.$axios
				.$delete(process.env.apiUrl + '/category/delete/' + category.id)
				.catch((err) => {
					return err.response.data;
				});
			if (deletedCategory.errors) {
				return deletedCategory;
			}
			commit('DELETE_CATEGORY', category);
			return deletedCategory;
		} catch (error) {
			return error;
		}
	},
	async updateCategory({ commit }, category) {
		try {
			const updatedCategory = await this.$axios
				.$put(
					process.env.apiUrl + `/category/update/${category.id}`,
					category
				)
				.catch((err) => {
					return err.response.data;
				});
			if (updatedCategory.errors) {
				return updatedCategory;
			}
			commit('UPDATE_CATEGORY', updatedCategory.category);
			return updatedCategory;
		} catch (error) {
			return error;
		}
	},
};
