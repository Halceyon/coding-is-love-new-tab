<template>
  <div v-if="weatherData">
    {{ current.air_temperature }}
  </div>
</template>

<script>
export default {
  name: 'Weather',
  data() {
    return {
      weatherData: undefined,
    };
  },
  async created() {
    this.loadWeather();
  },
  computed: {
    current() {
      const { data } = this.weatherData.properties.timeseries[0];
      return data.instant.details;
      //  "instant": { "details": { "air_pressure_at_sea_level": 1021.1, "air_temperature
    },
  },
  methods: {
    generateUrl(lat, lng) {
      return `https://api.met.no/weatherapi/locationforecast/2.0/complete?lat=${lat}&lon=${lng}`;
    },
    loadWeather() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async (position) => {
          const weatherUrl = this.generateUrl(position.coords.latitude, position.coords.longitude);
          console.debug(weatherUrl);
          const response = await this.$http.get(weatherUrl);
          this.weatherData = response.data;
          console.debug(this.weatherData);
        });
      }
    },
  },
};
</script>
