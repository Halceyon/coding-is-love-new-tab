import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import VueMdijs from 'vue-mdijs';
import { mdiWeatherPouring, mdiWeatherCloudyClock, mdiWeatherSunnyOff } from '@mdi/js';
import msal from 'vue-msal-js';
import store from '../store';
import App from '../view/tab.vue';
import vuetify from '../plugins/vuetify';

VueMdijs.add({ mdiWeatherPouring, mdiWeatherCloudyClock, mdiWeatherSunnyOff });
Vue.use(VueMdijs);

Vue.config.productionTip = false;
Vue.use(VueAxios, axios);
console.debug(process.env.VUE_APP_MSAL_AUTHORITY);

const msalOptions = {
  auth: {
    authority: process.env.VUE_APP_MSAL_LOGIN_AUTHORITY,
    knownAuthorities: [],
    clientId: process.env.VUE_APP_MSAL_CLIENT_ID,
    redirectUri: 'extension://kpcoppaddpnkmcnimflpjopdpeedljmk/tab.html',
    // redirectUri: 'http://localhost:9080/tab.html',
    // redirectUri: 'msal9aad3d39-9f33-4103-ac1d-87c8cddcd3ef://auth',
  },
  cache: {
    cacheLocation: 'localStorage',
    // storeAuthStateInCookie: true,
  },
};

console.debug(msalOptions);
Vue.use(msal, msalOptions);
// Vue.use(MsalPlugin, {
//   clientId: process.env.VUE_APP_MSAL_CLIENT_ID,
//   loginAuthority: process.env.VUE_APP_MSAL_LOGIN_AUTHORITY,
//   passwordAuthority: process.env.VUE_APP_MSAL_PASSWORD_RESET_AUTHORITY ?? 'http',
//   knownAuthority: process.env.VUE_APP_MSAL_KNOWN_AUTHORITY,
// });

new Vue({
  store,
  vuetify,
  render: (h) => h(App),
}).$mount('#app');
