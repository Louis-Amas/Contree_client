<template>
  <div class="hand">
    <Card
      @card="playCard($event)"
      v-for="(card, index)  in hand"
      v-bind:key="index"
      :family="card.family"
      :value="card.value"
      :playable="card.playable"
    ></Card>
  </div>
</template>

<script>
import Card from "./Card.vue";

import { CHOOSE_CARD } from "../store/mutations.type";
export default {
  name: "MyHand",
  components: {
    Card
  },
  methods: {
    playCard(card) {
      this.$store.commit(CHOOSE_CARD, card);
    }
  },
  computed: {
      hand() {
          return this.$store.state.game.hand
      }
  }
};
</script>
