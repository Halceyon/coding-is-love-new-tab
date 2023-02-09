<template>
  <section>
    <div class="wrapper">
        <header class="page-header">
          {{ wallpaper.title }}
        </header>
        <main class="page-body">
          <Weather />
          <GitHub v-if="hasGitHubToken" />
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
</template>

<script>
import GitHub from '../components/GitHub.vue';
import Weather from '../components/Weather.vue';
import github from '../components/github';

export default {
  name: 'tabView',
  mixins: [github],
  components: {
    GitHub,
    Weather,
  },
  data() {
    return {
      wallpapers: [],
    };
  },
  computed: {
    backgroundUrl() {
      const { wallpaper } = this;
      return `https://www.bing.com${wallpaper.url}`;
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
  async created() {
    const url = 'https://www.bing.com/HPImageArchive.aspx?format=js&idx=0&n=1&mkt=en-US';
    const response = await this.$http.get(url);
    this.wallpapers = response.data.images;
    console.debug(this.wallpapers, this.hasGitHubToken);
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
