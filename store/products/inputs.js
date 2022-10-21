export const state = () => {
	return {
		inputs: [],
	};
};

export const mutations = {
	SET_INPUTS(state, inputs) {
		state.inputs = inputs;
	},
	ADD_INPUT(state, input) {
		state.inputs.push(input);
	},
	UPDATE_INPUT(state, input) {
		const index = state.inputs.findIndex(
			(item) => item.id === input.id
		);
		state.inputs.splice(index, 1, input);
	},
	DELETE_INPUT(state, input) {
		const index = state.inputs.findIndex(
			(item) => item.id === input.id
		);
		state.inputs.splice(index, 1);
	},
};

export const actions = {
	async fetchInputs({ commit }) {
		const inputs = await this.$axios.$get(
			`${process.env.apiUrl}/input/show`
		);
		commit('SET_INPUTS', inputs);
	},
	async addInput({ commit }, input) {
		try {
			const newInput = await this.$axios
				.post(process.env.apiUrl + '/input/new', input)
				.catch((err) => {
					return err.response.data;
				});
			if (newInput.data.errors) {
				return newInput;
			}
			commit('ADD_INPUT', newInput.data.input);
			return newInput.data;
		} catch (error) {
			return error;
		}
	},
	async updateInput({ commit }, input) {
		try {
			const updatedInput = await this.$axios
				.put(
					process.env.apiUrl + '/input/update/' + input.id,
					input
				)
				.catch((err) => {
					return err.response.data;
				});
			if (updatedInput.errors) {
				return updatedInput;
			}
			commit('UPDATE_INPUT', updatedInput.data.input);
			return updatedInput.data;
		} catch (error) {
			return error;
		}
	},
	async deleteInput({ commit }, input) {
		try {
			const deletedInput = await this.$axios
				.delete(process.env.apiUrl + '/input/delete/' + input.id)
				.catch((err) => {
					return err.response.data;
				});
			if (deletedInput.data.errors) {
				return deletedInput.data;
			}
			commit('DELETE_INPUT', input);
			return deletedInput.data;
		} catch (error) {
			return error;
		}
	},
};

export const getters = {
	getInputs(state) {
		return state.inputs;
	},
};
