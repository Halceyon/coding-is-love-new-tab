import Vue from 'vue';
import Axios from 'axios';
import VueAxios from 'vue-axios';
import Vuex from 'vuex';
import Vuetify from 'vuetify';

import 'vuetify/dist/vuetify.min.css';
import '@mdi/font/css/materialdesignicons.min.css';

import store from './store';
import root from './root.vue';

Vue.use(Vuex);
Vue.use(VueAxios, Axios);
Vue.use(Vuetify);

Vue.config.productionTip = false;
/* eslint-disable no-new */
new Vue({
  el: '#root',
  store,
  render: h => h(root),
});
