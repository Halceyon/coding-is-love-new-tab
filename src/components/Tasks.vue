// id: undefined list

<template>
  <v-container>
    <v-row>
      <!-- Use vuetify components to create the layout of the component -->
      <v-col>
        <h1>My Tasks</h1>
        <v-card>
          <v-list>
            <v-list-item v-for="task in tasks" :key="task.id">
              <v-list-item-title>{{ task.title }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    tasks: [],
  }),
  mounted() {
    // Get the token
    this.$msal.acquireTokenSilent().then((token) => {
      // Use the token to get the tasks
      graph
        .tasks(token)
        .get()
        .then((data) => {
          this.tasks = data;
        });
    });
  },
};
</script>
