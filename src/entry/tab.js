import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import VueMdijs from 'vue-mdijs';
import { mdiWeatherPouring, mdiWeatherCloudyClock, mdiWeatherSunnyOff } from '@mdi/js';
import App from '../view/tab.vue';

VueMdijs.add({ mdiWeatherPouring, mdiWeatherCloudyClock, mdiWeatherSunnyOff });
Vue.use(VueMdijs);

Vue.config.productionTip = false;
Vue.use(VueAxios, axios);

new Vue({
  render: (h) => h(App),
}).$mount('#app');
