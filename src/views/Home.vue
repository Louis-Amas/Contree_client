<template>
  <v-container class="content-page">
      <Login @user="recvUser($event)"/>
  </v-container>
</template>

<script>

import Login from '../components/Login.vue'
import { LOGIN_ACTION, IDENTIFY_ACTION } from '../store/actions.type'
export default {
    name: 'Home',
    components: {
     Login
    },
    methods: {
        recvUser(user) {
            this.$store.dispatch(LOGIN_ACTION, user)
            .then(() => {
                return this.$store.dispatch(IDENTIFY_ACTION)
            }).then(() => {
                this.$router.push({ path: '/main' })
            }).catch(err => {
                console.log(err)
            })
        }
    }
}
</script>

<style>
.content-page {
    height: 95.1%;
    display: flex;
    flex-direction: column;
}
</style>