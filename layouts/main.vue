<template>
  <v-app>
    <v-app-bar app>
      <v-toolbar-title v-text="title" />
      <v-spacer />
      <v-btn icon @click.stop="$vuetify.theme.dark = !$vuetify.theme.dark" >
        <v-icon>mdi-{{ `${$vuetify.theme.dark ? 'weather' : 'white-balance' }-sunny` }}</v-icon>
      </v-btn>
    </v-app-bar>
    <v-main>
      <v-container fluid>
        <Nuxt />
      </v-container>
    </v-main>
    <v-footer app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>


<script>
export default {
  name: 'MainLayout',
   data() {
    return {
      title: 'Deli Menu',
    }
  },
};
</script>


