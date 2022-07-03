<template>
  <v-layout row>
    <v-flex xs2 sm2>
      <v-card>
        <v-toolbar color="lime">
          <img class="asana-logo" src="/icons/asana-logo.png" />

          <v-toolbar-title>Asana</v-toolbar-title>

          <v-spacer></v-spacer>
        </v-toolbar>
        <v-card-actions>
          <v-btn flat icon color="green" v-show="!connected" @click="connect">
              <v-icon>mdi-sync-off</v-icon>
            </v-btn>
        </v-card-actions>
        <v-select
          :items="workspaces"
          item-text="name"
          item-value="id"
          v-model="workspace"
        ></v-select>
        <!-- <v-list two-line>
          <template v-for="(item, index) in items">
            <v-subheader
              v-if="item.header"
              :key="item.header"
            >
              {{ item.header }}
            </v-subheader>

            <v-divider
              v-else-if="item.divider"
              :inset="item.inset"
              :key="index"
            ></v-divider>

            <v-list-tile
              v-else
              :key="item.title"
              avatar
            >
              <v-list-tile-avatar>
                <img :src="item.avatar">
              </v-list-tile-avatar>

              <v-list-tile-content>
                <v-list-tile-title v-html="item.title"></v-list-tile-title>
                <v-list-tile-sub-title v-html="item.subtitle"></v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
          </template>
        </v-list> -->
      </v-card>
    </v-flex>
  </v-layout>
</template>
<script src="./asana-script.js">
</script>
<style>
.asana-logo {
  width: 32px;
  height: 32px;
}
.v-toolbar__title {
  color: white;
}
</style>