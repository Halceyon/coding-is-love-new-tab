import mappings from '../ext/mappings';
import bus from '../ext/bus';
/* eslint-disable no-console */

export default {
  data: () => ({
  }),
  computed: {},
  created() {
    bus.sub('nasa', (msg) => {
      console.log(msg);
      const nasaItems = mappings.nasa(msg.data);
      document.body.style.backgroundImage = `url('${nasaItems[1].imageUrl}')`;
    });

    bus.sub('github.auth.completed', (msg) => {
      console.log(msg);
      const auth = {
        headers: { Authorization: `token ${msg.data}` },
      };
      this.$http.get('https://api.github.com/notifications', auth).then((data) => {
        console.log(data);
      });
    });
    bus.sub('asana.auth.completed', (msg) => {
      console.log(msg);
      const auth = {
        headers: { Authorization: `Bearer ${msg.data}` },
      };
      this.$http.get('https://app.asana.com/api/1.0/users/me', auth).then((data) => {
        console.log(data);
      });
    });
    bus.pub('page.loaded');
  },
  mounted() { },
  methods: {},
};
