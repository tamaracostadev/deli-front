export const state = () => {
    return {
        products: [],
        ingredients: [],
    };
};

export const mutations = {
    SET_PRODUCTS(state, products) {
        state.products = products.products;
        state.ingredients = products.ingredients;
    },
    ADD_PRODUCT(state, product) {
        state.products.push(...product.products);
        state.ingredients.push(...product.ingredients);

    },
    UPDATE_PRODUCT(state, product) {
		const productId = product.products[0].id;
        const index = state.products.findIndex(
            item => item.id === productId
        );
        state.products.splice(index, 1, ...product.products);
        state.ingredients = state.ingredients.filter(item => item.id_input !== productId);
        state.ingredients.push(...product.ingredients);
    },
    DELETE_PRODUCT(state, product) {
        const index = state.products.findIndex(
            (item) => item.id === product.id
        );
        state.products.splice(index, 1);
        state.ingredients = state.ingredients.filter(item => item.id_input !== product.id);
    }
};

export const actions = {
    async fetchProducts({ commit }) {
        const products = await this.$axios.$get(
            `${process.env.apiUrl}/product/show`
        );
        commit('SET_PRODUCTS', products);
    },
    async addProduct({ commit }, product) {
        try {
            const newProduct = await this.$axios
                .post(process.env.apiUrl + '/product/new', product)
                .catch((err) => {
                    return err.response.data;
                });
            if (newProduct.data.errors) {
                return newProduct.data;
            }
            commit('ADD_PRODUCT', newProduct.data);
            return newProduct.data;
        } catch (error) {
            return error;
        }
    },
    async updateProduct({ commit }, product) {
        try {
            const updatedProduct = await this.$axios
                .put(
                    process.env.apiUrl + '/product/update/' + product.id,
                    product
                )
                .catch((err) => {
                    return err.response.data;
                });
            if (updatedProduct.data.errors) {
                return updatedProduct.data;
            }
            commit('UPDATE_PRODUCT', updatedProduct.data);
            return updatedProduct.data;
        } catch (error) {
            return error;
        }
    },
    async deleteProduct({ commit }, product) {
        try {
            const deletedProduct = await this.$axios
                .delete(
                    process.env.apiUrl + '/product/delete/' + product.id
                )
                .catch((err) => {
                    return err.response.data;
                });
            if (deletedProduct.data.errors) {
                return deletedProduct.data;
            }
            commit('DELETE_PRODUCT', product);
            return deletedProduct.data;
        } catch (error) {
            return error;
        }
    }
};

export const getters = {
    getProducts(state) {
        return state.products;
    },
    getIngredients(state) {
        return state.ingredients;
    }
};
