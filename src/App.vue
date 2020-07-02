<template>
  <v-app>
    <v-content>
      <GameToolbar></GameToolbar>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
import GameToolbar from "./components/GameToolbar";

export default {
  components: {
    GameToolbar
  },
};
</script>
