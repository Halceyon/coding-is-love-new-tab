import Vue from 'vue';
import App from '../view/options.vue';

import 'bootstrap/dist/css/bootstrap.css';

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount('#app');
