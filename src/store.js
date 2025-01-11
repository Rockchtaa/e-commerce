import { createStore } from 'vuex';

const store = createStore({
  state: {
    message: 'Hello Vuex!',
  },
  mutations: {
    setMessage(state, payload) {
      state.message = payload;
    },
  },
  actions: {
    updateMessage({ commit }, newMessage) {
      commit('setMessage', newMessage);
    },
  },
  getters: {
    message: (state) => state.message,
  },
});

export default store;
