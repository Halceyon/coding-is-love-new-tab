import { Octokit } from '@octokit/core';

const getOctokit = () => {
  const auth = localStorage.getItem('GITHUB_TOKEN');
  const octokit = new Octokit({ auth });
  return octokit;
};

const customActions = {
  async getRepos({ commit }) {
    const octokit = getOctokit();
    const { data } = await octokit.request('/users/Halceyon/repos');
    commit('SET_repos', data);
    return data;
  },
  /**
     * Executes getPullRequests for each selected repo
     */
  async getPullRequests(selectedRepos) {
    this.dialog = false;
    const octokit = getOctokit();
    // get the pull requests for each repo
    const requests = await Promise.all(
      selectedRepos.map(async (repoId) => {
        const repo = this.repos.find((r) => r.id === repoId);
        const prs = await octokit.request('GET /repos/:owner/:repo/pulls', {
          owner: repo.owner.login,
          repo: repo.name,
        });
        // add the pull request to the array
        return prs.data;
      }),
    );
    this.pullRequests = requests.flat();
    console.debug(this.pullRequests);
  },
};

export default { ...customActions };
