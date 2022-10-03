<template>
  <v-container fluid >
    <Login />
  </v-container>
</template>

<script>
 import Login from '~/components/auth/login.vue'; 
export default {
  name: "IndexPage",
   components: { Login }, 
  layout: "main",
  auth: false
}
</script>
