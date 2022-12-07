export const state = () => ({
	orders: [],
});

export const mutations = {
	SET_ORDERS(state, orders) {
		state.orders = orders;
	},
	ADD_ORDER(state, order) {
		state.orders.push(order);
	},
	UPDATE_ORDER(state, order) {
		const index = state.orders.findIndex((item) => item.id === order.id);
		state.orders.splice(index, 1, order);

	},
	DELETE_ORDER(state, order) {
		const index = state.orders.findIndex((item) => item.id === order.id);
		state.orders.splice(index, 1);

	}
};

export const actions = {
	async fetchOrders({ commit }) {
		const orders = await this.$axios.$get(`${process.env.apiUrl}/sell/show`);
		commit('SET_ORDERS', orders);
	},
	async addOrder({ commit }, order) {
		try {
			const newOrder = await this.$axios
				.post(process.env.apiUrl + '/sell/new', order)
				.catch((err) => {
					return err.response.data;
				});
			if (newOrder.data.errors) {
				return newOrder;
			}
			commit('ADD_ORDER', newOrder.data.order);
			return newOrder.data;
		} catch (error) {
			return error;
		}
	},
	async updateOrder({ commit }, order) {
		try {
			const updatedOrder = await this.$axios
				.put(process.env.apiUrl + '/sell/update/' + order.id, order)
				.catch((err) => {
					return err.response.data;
				});
			if (updatedOrder.data.errors) {
				return updatedOrder;
			}
			commit('UPDATE_ORDER', updatedOrder.data.order);
			return updatedOrder.data;
		} catch (error) {
			return error;
		}
	},
	async deleteOrder({ commit }, order) {
		try {
			const deletedOrder = await this.$axios
				.delete(process.env.apiUrl + '/sell/delete/' + order.id)
				.catch((err) => {
					return err.response.data;
				});
			if (deletedOrder.data.errors) {
				return deletedOrder;
			}
			commit('DELETE_ORDER', order);
			return deletedOrder.data;
		} catch (error) {
			return error;
		}
	},
};

export const getters = {
	getOrders: (state) => state.orders,
}
