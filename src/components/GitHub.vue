<template>
   <div class="container">
    <div class="row">
      <div class="col-sm-12">
        <h1>GitHub Pull Requests</h1>
        <div v-if="loading">
          <div class="spinner-border text-primary" role="status">
            <span class="sr-only">Loading...</span>
          </div>
          <p>Loading...</p>
        </div>
        <div v-else>
          <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog"
            aria-labelledby="exampleModalLabel" aria-hidden="true"
          >
            <div class="modal-dialog" role="document">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div class="modal-body">
                  <form>
                    <div class="form-group">
                      <select class="form-control" v-model="selectedRepos" multiple>
                        <option v-for="repo in repos" :key="repo.id" :value="repo.id">
                          {{repo.name}}
                        </option>
                      </select>
                      <button class="btn btn-primary">
                        Get Pull Requests
                      </button>
                    </div>
                  </form>
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-secondary" data-dismiss="modal">
                    Cancel
                  </button>
                  <button
                    type="submit"
                    class="btn btn-primary"
                    @click="getPullRequests"
                    data-dismiss="modal"
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
          <button type="button" class="btn btn-primary" data-toggle="modal"
            data-target="#exampleModal">
            <i class="mdi mdi-filter"></i> Filter
          </button>
          <table class="table table-striped">
            <thead>
              <tr>
                <th>Repository</th>
                <th>Pull Request</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(pullRequest, index) of pullRequests" :key="index">
                <td>{{pullRequest.repo}}</td>
                <td>{{pullRequest.title}}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Octokit } from '@octokit/core';
import github from './github';

export default {
  mixins: [github],
  data() {
    return {
      loading: true,
      pullRequests: [],
      repos: [],
      selectedRepos: [],
    };
  },
  async mounted() {
    const auth = this.getGithubToken();
    console.debug(auth);
    if (auth) {
      const octokit = new Octokit({ auth });
      const { data } = await octokit.request('/users/Halceyon/repos');
      console.debug(data);
      this.user = data;
      try {
      // get the repos
        const repos = await octokit.request('GET /user/repos');
        this.repos = repos.data;
        this.loading = false;
      } catch (err) {
        console.error(err);
      }
    }
  },
  methods: {
    /**
     * Executes getPullRequests for each selected repo
     */
    async getPullRequests() {
      const auth = this.getGithubToken();
      const octokit = new Octokit({ auth });
      // get the pull requests for each repo
      const requests = await Promise.all(
        this.selectedRepos.map(async (repoId) => {
          const repo = this.repos.find((r) => r.id === repoId);
          const prs = await octokit.request('GET /repos/:owner/:repo/pulls', {
            owner: repo.owner.login,
            repo: repo.name,
          });
          // add the pull request to the array
          return prs.data.map((pr) => ({
            repo: repo.name,
            title: pr.title,
          }));
        }),
      );
      this.pullRequests = requests.flat();
    },
  },
};
</script>
