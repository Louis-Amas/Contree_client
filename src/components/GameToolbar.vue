<template>
  <v-toolbar class="green darken-4 game-toolbar" dense>
    
    <v-toolbar-title class="headline text-upper white--text">
      <span>BELOTE</span>
      <span class="font-weight-light">CONTRÉE</span>
    </v-toolbar-title>

    <v-spacer></v-spacer>

    <div class="text-center" v-if="isConnected">
      <v-menu>
        <template v-slot:activator="{ on: menu }">
          <v-tooltip bottom>
            <template v-slot:activator="{ on: tooltip }">
              <v-btn color="green darken-2" dark v-on="{ ...tooltip, ...menu }">{{ username }}</v-btn>
            </template>
            <span>Accounts options</span>
          </v-tooltip>
        </template>
        <v-list>
          <v-list-item>
            <v-btn @click="disconnect()">Disconnect</v-btn>
          </v-list-item>
        </v-list>
      </v-menu>
    </div>
  </v-toolbar>
</template>
<script>
import { DISCONNECT } from '../store/actions.type';

export default {
  methods: {
    disconnect() {
      return this.$store.dispatch(DISCONNECT)
    }
  },
  computed: {
    username() {
      return this.$store.state.login.username
    },
    isConnected() {
      return this.$store.state.login.connected
    }
  }
};
</script>
<style>
.game-toolbar {
  height: 10%;
}
</style>