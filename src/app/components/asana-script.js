import bus from '../../ext/bus';

let asanaToken = '';

export default {
  data: () => ({
    baseUrl: 'https://app.asana.com/api/1.0',
    profile: null,
    connected: false,
    workspace: '',
    workspaces: [],
    tasks: [],
    auth: {
      headers: {
        Authorization: `Bearer ${asanaToken}`, // the token is a variable which holds the token
      },
    },
  }),
  computed: {},
  created() {
    bus.sub('asana.auth.completed', (token) => {
      this.connected = true;
      asanaToken = token;
      this.$forceUpdate();
      console.log(this);
      this.$http.get(`${this.baseUrl}/users/me`, this.auth).then((result) => {
        this.profile = result.data.data;
        this.workspaces = this.profile.workspaces;
        this.$forceUpdate();
        console.log(this);
      });
    });
  },
  watch: {
    workspace: (id) => {
      console.log(id);
      const url = `${this.baseUrl}/workspaces/${id}/tasks/search?completed=false&assignee.any=me`;
      this.$http.get(url).then((result) => {
        console.log(result.data);
        this.$store.commit('asanaTasks', result.data);
      });
    },
  },
  mounted() {
  },
  methods: {
    connect: () => {
      bus.pub('asana.auth.requested');
    },
    refresh: () => {
      this.$http.get(`${this.baseUrl}/tasks/?completed=false`).then((result) => {
        this.tasks = result.data;
      });
    },
  },
};
