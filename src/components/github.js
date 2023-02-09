export default {
  computed: {
    hasGitHubToken() {
      return this.getGithubToken() !== null;
    },
  },
  methods: {
    getGithubToken() {
      console.debug(localStorage.getItem('GITHUB_TOKEN'));
      return localStorage.getItem('GITHUB_TOKEN');
    },
  },
};
