<template>
  <div class="container">
    <v-dialog v-model="dialog" max-width="500px">
        <v-card>
          <v-card-title>
            <span class="headline">Select Repositories</span>
          </v-card-title>
          <v-card-text>
            <v-form ref="form" v-model="valid">
              <v-select
                v-model="selectedRepos"
                :items="repos"
                item-text="name" item-value="id"
                :rules="[v => !!v || 'Item is required']" label="Repositories" multiple>
              </v-select>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-btn color="blue darken-1" text @click="dialog = false">Cancel</v-btn>
            <v-spacer></v-spacer>
            <v-btn
              color="blue darken-1" text @click="getPullRequests(selectedRepos);dialog = false;">
              Submit
            </v-btn>
          </v-card-actions>
        </v-card>
    </v-dialog>
    <div class="row">
      <div class="col-sm-12">
        <v-row>
          <v-col>
            <v-card class="transparent-card">
              <v-card-title>
                <span class="headline">Pull Requests</span>
                <v-spacer></v-spacer>
                <v-btn
                    color="secondary"
                    dark
                    @click="dialog = true"
                  >
                    <i class="mdi mdi-filter"></i>
                  </v-btn>
              </v-card-title>
              <v-card-text>
                <v-data-table
                  :headers="headers"
                  :items="pullRequests"
                  item-key="id"
                  :search="search"
                  class="elevation-1">
                  <template v-slot:item.user="{ item }">
                    <v-avatar size="30">
                      <img :src="item.user.avatar_url" alt="avatar">
                    </v-avatar>
                  </template>
                </v-data-table>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import github from './github';

export default {
  mixins: [github],
  data() {
    return {
      dialog: false,
      loading: true,
      headers: [
        { text: 'User', value: 'user' },
        { text: 'Repository', value: 'repo' },
        { text: 'Title', value: 'title' },
      ],
      search: '',
      selectedRepos: [],
      valid: true,
    };
  },
  computed: {
    ...mapState('github', ['user', 'repos', 'pullRequests']),
  },
  async mounted() {
    const auth = this.getGithubToken();
    if (auth) {
      await this.getRepos();
    }
  },
  methods: {
    ...mapActions('github', ['getPullRequests', 'getRepos']),
  },
};
</script>
