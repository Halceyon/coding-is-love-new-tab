<template>
  <div class="main_app">
    <form @submit.prevent="saveGithubToken">
      <div class="form-group">
        <label>GitHub Personal Access Token</label>
        <input type="text" v-model="githubToken" class="form-control" placeholder="Enter Token" />
      </div>
      <button type="submit" class="btn btn-primary">Save</button>
    </form>
  </div>
</template>

<script>
import github from '../components/github';

export default {
  name: 'optionsView',
  mixins: [github],
  data() {
    return {
      githubToken: '',
    };
  },
  mounted() {
    this.githubToken = this.getGithubToken();
    console.debug(this.githubToken);
  },
  methods: {
    saveGithubToken() {
      console.debug(this.githubToken);
      localStorage.setItem('GITHUB_TOKEN', this.githubToken);
      this.$root.$emit('token-updated');
      window.alert('Saved');
    },
  },
};

</script>

<style>
.main_app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
