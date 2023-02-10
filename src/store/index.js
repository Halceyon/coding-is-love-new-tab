/**
 * Vuex
 *
 * @library
 *
 * https://vuex.vuejs.org/en/
 */

// Lib imports
import Vue from 'vue';
import Vuex from 'vuex';
import VuexPersistence from 'vuex-persist';

// Store functionality
import modules from './modules';

const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
  modules: ['github'],
});
Vue.use(Vuex);

// Create a new store
const store = new Vuex.Store({
  modules,
  plugins: [
    vuexLocal.plugin,
  ],
});

export default store;
