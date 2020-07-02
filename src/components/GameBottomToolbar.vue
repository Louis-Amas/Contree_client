<template>
  <v-toolbar class="green darken-4" dense>
    <v-btn icon @click="goBack">
      <v-icon>mdi-arrow-left</v-icon>
    </v-btn>
    <v-spacer></v-spacer>
    <div class="text-center">
      <v-dialog v-model="dialog" width="500">
        <template v-slot:activator="{ on }">
          <v-btn icon :disabled="!canSeeLastPli">
            <v-icon v-on="on">mdi-cards</v-icon>
          </v-btn>
        </template>

        <v-card>
          <v-card-title class="headline grey lighten-2" primary-title>Last Pli</v-card-title>

          <Pli
            :eastDisplayCard="eastDisplayCard"
            :northDisplayCard="northDisplayCard"
            :westDisplayCard="westDisplayCard"
            :southDisplayCard="myCard"
          ></Pli>
          <v-divider></v-divider>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" text @click="dialog = false">Quit</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
  </v-toolbar>
</template>

<script>
import Pli from "./Pli";
import router from '../router'
export default {
  components: {
    Pli
  },
  data() {
    return {
      dialog: false
    };
  },
  methods: {
    goBack() {
      router.back();
    }
  },
  computed: {
    arrangedPositions() {
      return this.$store.getters.arrangedPositions;
    },
    eastDisplayCard() {
      return this.$store.getters.getLastCardByPosition(
        this.arrangedPositions[0].toUpperCase()
      );
    },
    northDisplayCard() {
      return this.$store.getters.getLastCardByPosition(
        this.arrangedPositions[1].toUpperCase()
      );
    },
    westDisplayCard() {
      return this.$store.getters.getLastCardByPosition(
        this.arrangedPositions[2].toUpperCase()
      );
    },
    myCard() {
      return this.$store.getters.getLastCardByPosition(
        this.$store.state.lobby.myPos
      );
    },
    canSeeLastPli() {
      return this.eastDisplayCard !== null;
    }
  }
};
</script>