export const state = () => {
    return {
        recipes: [],
        ingredients: [],
        measure:[
            {id:1, name:'g', description:'Grama'},
            {id:2, name:'kg', description:'Quilograma'},
            {id:3, name:'ml', description:'Mililitro'},
            {id:4, name:'l', description:'Litro'},
            {id:5, name:'un', description:'Unidade'},

        ]
    };
};

export const mutations = {
    SET_RECIPES(state, recipes) {
        state.recipes = recipes.recipes;
        state.ingredients = recipes.ingredients;
    },
    ADD_RECIPE(state, recipe) {
        state.recipes.push(...recipe.recipe);
        state.ingredients.push(...recipe.ingredients);

    },
    UPDATE_RECIPE(state, recipe) {
        const index = state.recipes.findIndex(
            (item) => item.id === recipe.id
        );
        state.recipes.splice(index, 1, ...recipe.recipe);
        state.ingredients = state.ingredients.filter(item => item.id_input !== recipe.id);
        state.ingredients.push(...recipe.ingredients);
    },
    DELETE_RECIPE(state, recipe) {
        const index = state.recipes.findIndex(
            (item) => item.id === recipe.id
        );
        state.recipes.splice(index, 1);
        state.ingredients = state.ingredients.filter(item => item.id_input !== recipe.id);
    }
};

export const actions = {
    async fetchRecipes({ commit }) {
        const recipes = await this.$axios.$get(
            `${process.env.apiUrl}/recipe/show`
        );
        commit('SET_RECIPES', recipes);
    },
    async addRecipe({ commit }, recipe) {
        try {
            const newRecipe = await this.$axios
                .post(process.env.apiUrl + '/recipe/new', recipe)
                .catch((err) => {
                    return err.response.data;
                });
            if (newRecipe.data.errors) {
                return newRecipe;
            }
            commit('ADD_RECIPE', newRecipe.data);
            return newRecipe.data;
        } catch (error) {
            return error;
        }
    },
    async updateRecipe({ commit }, recipe) {
        try {
            const updatedRecipe = await this.$axios
                .put(
                    process.env.apiUrl + '/recipe/update/' + recipe.id,
                    recipe
                )
                .catch((err) => {
                    return err.response.data;
                });
            if (updatedRecipe.data.errors) {
                return updatedRecipe;
            }
            commit('UPDATE_RECIPE', updatedRecipe.data);
            return updatedRecipe.data;
        } catch (error) {
            return error;
        }
    },
    async deleteRecipe({ commit }, recipe) {
        try {
            const deletedRecipe = await this.$axios
                .delete(
                    process.env.apiUrl + '/recipe/delete/' + recipe.id
                )
                .catch((err) => {
                    return err.response.data;
                });
            if (deletedRecipe.data.errors) {
                return deletedRecipe;
            }
            commit('DELETE_RECIPE', recipe);
            return deletedRecipe.data;
        } catch (error) {
            return error;
        }
    }
};

export const getters = {
    getRecipes(state) {
        return state.recipes;
    },
    getMeasures(state) {
        return state.measure;
    },
    getIngredients(state) {
        return state.ingredients;
    }
};
