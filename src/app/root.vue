<template>
    <v-app>
        <v-content>
            <v-container fluid>
            <asana></asana>
            </v-container>
        </v-content>
        <v-footer app>
            Hello world
        </v-footer>
    </v-app>
</template>
<script src="./app-script.js">
</script>
<style>
body,
html {
  height: 100%;
}
.bg {
  /* Full height */
  height: 100%;

  /* Center and scale the image nicely */
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}
.theme--light.application,
.v-footer--fixed.theme--light {
    background: transparent;
}
</style>