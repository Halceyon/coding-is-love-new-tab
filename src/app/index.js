import Vue from 'vue';
import Axios from 'axios';
import VueAxios from 'vue-axios';
import Vuex from 'vuex';

import store from './store';
import root from './root.vue';

Vue.use(Vuex);
Vue.use(VueAxios, Axios);

Vue.config.productionTip = false;
/* eslint-disable no-new */
new Vue({
  el: '#root',
  store,
  render: h => h(root),
});
