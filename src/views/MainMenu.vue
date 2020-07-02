<template>
  <v-container class="content-page" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="4">
        <v-card>
          <v-toolbar color="green darken-3" dark flat>
            <v-toolbar-title>Join a game</v-toolbar-title>
            <v-spacer />
          </v-toolbar>
          <v-row align="center" justify="center">
            <v-col
              cols="10"
            >
              <v-text-field
                label="name"
                v-model="gameName"
                placeholder="Game name"
                solo
                prepend-icon="mdi-alpha-g-box-outline"
                @keypress.enter="joinGame"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row align="center" justify="center">
            <v-col cols="4">
              <v-btn
                :disabled="gameName == ''"
                class="green darken-3 white--text"
                @click="joinGame()"
              >Join</v-btn>
            </v-col>
          </v-row>
          
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { JOIN_GAME } from "../store/actions.type";

export default {
  data() {
    return {
      gameName: '',
    };
  },
  methods: {
    joinGame() {
      this.$store.dispatch(JOIN_GAME, this.gameName).then(() => {
        this.$router.push({ path: "/lobby" });
      });
    },
    goToTest() {
      this.$router.push({ path: "/test" });
    }
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0px;
}

</style>
