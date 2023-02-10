<template>
  <v-app>
    <v-app-bar app>
      <v-spacer></v-spacer>
      <v-btn icon @click="$msal.loginPopup">
        <v-icon>{{ mdiMicrosoft }}</v-icon>
      </v-btn>
      <v-btn v-if="isLoggedIn" icon @click="$msal.logoutRedirect">
        <v-icon>{{ mdiAccount }}</v-icon>
      </v-btn>
    </v-app-bar>
    <section>
      <div class="wrapper">
          <header class="page-header">
            {{ wallpaper.title }}
          </header>
          <main class="page-body">
            <Weather />
            <GitHub v-if="hasGitHubToken" />
            {{ user }}
          </main>
          <footer class="page-footer">
            <a :href="wallpaper.copyrightlink">
              {{ wallpaper.copyright }}
            </a>
          </footer>
      </div>
        <!-- <div class="wallpaper-credit">
          {{ wallpaper.title }}
        </div>
        <footer class="page-footer">

        </footer> -->
    </section>
  </v-app>
</template>

<script>
import { mdiMicrosoft, mdiAccount } from '@mdi/js';
import GitHub from '../components/GitHub.vue';
import Weather from '../components/Weather.vue';
import github from '../components/github';

import './site.css';

export default {
  name: 'tabView',
  mixins: [github],
  components: {
    GitHub,
    Weather,
  },
  data() {
    return {
      mdiMicrosoft,
      mdiAccount,
      wallpapers: [],
    };
  },
  computed: {
    backgroundUrl() {
      const { wallpaper } = this;
      return `https://www.bing.com${wallpaper.url}`;
    },
    isLoggedIn() {
      return this.$msal.data.isAuthenticated;
    },
    user() {
      let user = {};
      if (this.$msal.data.isAuthenticated) {
        user = {
          ...this.$msal.user,
          profile: {},
        };
        if (this.$msal.graph && this.$msal.graph.profile) {
          user.profile = this.msal.graph.profile;
        }
      }
      return user;
    },
    wallpaper() {
      const { wallpapers } = this;
      if (wallpapers.length > 0) {
        return wallpapers[0];
      }
      return {};
    },
  },
  watch: {
    backgroundUrl() {
      document.body.style.backgroundImage = `url(${this.backgroundUrl})`;
    },
  },
  async mounted() {
    console.debug(this.isLoggedIn);
    if (!this.isLoggedIn) {
      await this.$msal.loginPopup();
    }
    const url = 'https://www.bing.com/HPImageArchive.aspx?format=js&idx=0&n=1&mkt=en-US';
    const response = await this.$http.get(url);
    this.wallpapers = response.data.images;
    // await this.$msal.loginPopup();
    // this.$msal.handleRedirectPromise()
    //   .then((res) => {
    //     console.log(res);
    //   })
    //   .catch((err) => {
    //     console.error(err);
    //   });
  },
};

</script>
<style>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300&display=swap');

body {
  background-repeat: no-repeat;
  background-position: top right;
  color: white;
  margin: 0;
}
section {
  height: 100vh;
}
.main_app {
  font-family: 'Roboto', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.wrapper {
  height: 100vh;
  display: grid;
  grid-template-rows: auto 1fr auto;
}
.page-header,
.page-footer {
  padding: 20px;
  text-align: center;
}
.page-footer {
  text-align: right;
}
.page-footer a {
  text-decoration: none;
  color: white;
}

</style>
