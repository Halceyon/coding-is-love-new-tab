<template>
  <div class="main_app">
  </div>
</template>

<script>
import wallpaper from '../ext/wallpaper-bing';
import weather from '../ext/weather';

export default {
  name: 'tabView',
  data() {
    return {
      msg: 'tab',
    };
  },
  async created() {
    const wallpapers = await this.$http.get(wallpaper.url);
    console.debug(wallpapers);
    const backgroundUrl = wallpaper.get(wallpapers.data);
    document.body.style.backgroundRepeat = 'no-repeat';
    document.body.style.backgroundPosition = 'top right';
    document.body.style.backgroundImage = `url(${backgroundUrl})`;
    this.loadWeather();
  },
  methods: {
    loadWeather() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async (position) => {
          const weatherUrl = weather.url(position.coords.latitude, position.coords.longitude);
          const response = await this.$http.get(weatherUrl);
          console.debug(response);
          this.weatherData = response.data;
        });
      }
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
