export default {
  computed: {
    hasGitHubToken() {
      return this.getGithubToken() !== null;
    },
  },
  methods: {
    getGithubToken() {
      return localStorage.getItem('GITHUB_TOKEN');
    },
  },
};
