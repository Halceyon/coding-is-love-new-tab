/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
export default {
  state: {
    app: {
      isLoading: false,
    },
    browser: {},
    plugins: {
      asana: {},
      github: {},
    },
  },
  getters: {
    app: state => (state.app),
    browser: state => (state.browser),
    plugins: state => (state.plugins),
  },
  mutations: {
    auth(state, auth) {
      state.auth = auth;
    },
    browser(state, browser) {
      state.browser = browser;
    },
    isLoading(state, isLoading) {
      state.app.isLoading = isLoading;
    },
    asana(state, asana) {
      state.plugins.asana = asana;
    },
  },
  actions: {
    loadOrganization({ commit }) {
      this._vm.$http.get('/organization').then((response) => {
        commit('organization', response.data);
      });
    },
  },
};
