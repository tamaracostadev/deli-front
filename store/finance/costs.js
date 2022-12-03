export const state = () => ({
    fixedCosts: [],
    variableCosts: [],
});

export const mutations = {
    SET_FIXED_COSTS(state, fixedCosts) {
        state.fixedCosts = fixedCosts;
        // state.fixedCostsTotal = state.fixedCosts.reduce((a, b) => a + b.value, 0);
    },
    SET_VARIABLE_COSTS(state, variableCosts) {
        state.variableCosts = variableCosts;
        // state.variableCostsTotal = state.variableCosts.reduce((a, b) => a + b.value, 0);
    },
    ADD_FIXED_COST(state, fixedCost) {
        state.fixedCosts.push(fixedCost);
    },
    ADD_VARIABLE_COST(state, variableCost) {
        state.variableCosts.push(variableCost);
    },
    REMOVE_FIXED_COST(state, fixedCost) {
        state.fixedCosts.splice(state.fixedCosts.indexOf(fixedCost), 1);
    },
    REMOVE_VARIABLE_COST(state, variableCost) {
        state.variableCosts.splice(state.variableCosts.indexOf(variableCost), 1);
    },
    UPDATE_FIXED_COST(state, fixedCost) {
        const index = state.fixedCosts.findIndex(
			(item) => item.id === fixedCost.id
		);
		state.fixedCosts.splice(index, 1, fixedCost);
    },
    UPDATE_VARIABLE_COST(state, variableCost) {
        const index = state.variableCosts.findIndex(
			(item) => item.id === variableCost.id
		);
		state.variableCosts.splice(index, 1, variableCost);
    }


};

export const actions = {
    async fetchFixedCosts({ commit }) {
        const fixedCosts = await this.$axios.$get(
            `${process.env.apiUrl}/costs?type=fixed`
        );
        commit('SET_FIXED_COSTS', fixedCosts.costs);
    },
    async fetchVariableCosts({ commit }) {
        const variableCosts = await this.$axios.$get(
            `${process.env.apiUrl}/costs?type=variable`
        );
        commit('SET_VARIABLE_COSTS', variableCosts.costs);
    },
    async addFixedCost({ commit }, fixedCost) {
        try {
            fixedCost.type = 'fixed';
            const newFixedCost = await this.$axios
                .post(process.env.apiUrl + '/costs/new', fixedCost)
                .catch((err) => {
                    return err.response.data;
                });
            if (newFixedCost.data.errors) {
                return newFixedCost;
            }
            commit('ADD_FIXED_COST', newFixedCost.data.cost);
            return newFixedCost.data;
        } catch (error) {
            return error;
        }
    },
    async addVariableCost({ commit }, variableCost) {
        try {
            variableCost.type = 'variable';
            const newVariableCost = await this.$axios
                .post(process.env.apiUrl + '/costs/new', variableCost)
                .catch((err) => {
                    return err.response.data;
                });
            if (newVariableCost.data.errors) {
                return newVariableCost;
            }
            commit('ADD_VARIABLE_COST', newVariableCost.data.cost);
            return newVariableCost.data;
        } catch (error) {
            return error;
        }
    },
    async updateFixedCost({ commit }, fixedCost) {
        try {
            const updatedFixedCost = await this.$axios
                .put(
                    process.env.apiUrl + '/costs/update/' + fixedCost.id,
                    fixedCost
                )
                .catch((err) => {
                    return err.response.data;
                });
            if (updatedFixedCost.data.errors) {
                return updatedFixedCost;
            }
            commit('UPDATE_FIXED_COST', updatedFixedCost.data.cost);
            return updatedFixedCost.data;
        } catch (error) {
            return error;
        }
    },
    async updateVariableCost({ commit }, variableCost) {
        try {
            const updatedVariableCost = await this.$axios
                .put(
                    process.env.apiUrl + '/costs/update/' + variableCost.id,
                    variableCost
                )
                .catch((err) => {
                    return err.response.data;
                });
            if (updatedVariableCost.data.errors) {
                return updatedVariableCost;
            }
            commit('UPDATE_VARIABLE_COST', updatedVariableCost.data.cost);
            return updatedVariableCost.data;
        } catch (error) {
            return error;
        }
    },
    async deleteFixedCost({ commit }, fixedCost) {
        try {
            const deletedFixedCost = await this.$axios
                .delete(
                    process.env.apiUrl + '/costs/delete/' + fixedCost.id
                )
                .catch((err) => {
                    return err.response.data;
                });
            if (deletedFixedCost.data.errors) {
                return deletedFixedCost;
            }
            commit('REMOVE_FIXED_COST', deletedFixedCost.data);
            return deletedFixedCost.data;
        } catch (error) {
            return error;
        }
    },
    async deleteVariableCost({ commit }, variableCost) {
        try {
            const deletedVariableCost = await this.$axios
                .delete(
                    process.env.apiUrl + '/costs/delete/' + variableCost.id
                )
                .catch((err) => {
                    return err.response.data;
                });
            if (deletedVariableCost.data.errors) {
                return deletedVariableCost;
            }
            commit('REMOVE_VARIABLE_COST', deletedVariableCost.data);
            return deletedVariableCost.data;
        } catch (error) {
            return error;
        }
    },
};

export const getters = {
    fixedCosts: (state) => state.fixedCosts,
    variableCosts: (state) => state.variableCosts,
};

