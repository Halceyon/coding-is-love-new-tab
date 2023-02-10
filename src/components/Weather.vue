<template>
  <div>
    <div v-if="weatherData">
      <span class="weather-temp">{{ current.air_temperature }}</span>
      {{ current.air_temperature }} °C
    </div>
    <div v-else>
      <v-mdi name="mdi-weather-cloudy-clock"></v-mdi>
    </div>
  </div>
</template>

<script>
import { mdiWeatherPouring, mdiWeatherSunny } from '@mdi/js';

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
    icon() {
      const { data } = this.weatherData.properties.timeseries[0];
      switch (data.next_1_hours.summary.symbol_code) {
        case 's01d':
          return mdiWeatherPouring;
        default:
          return mdiWeatherSunny;
      }
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
          const response = await this.$http.get(weatherUrl);
          this.weatherData = response.data;
        });
      }
    },
  },
};
</script>
