<template>
  <div class="hand">
    <Card
      v-for="(card, index)  in cards"
      v-bind:key="index"
      :family="card.family"
      :value="card.value"
      :playable="false"
    ></Card>
  </div>
</template>

<script>
import Card from "./Card.vue";
export default {
  components: {
    Card
  },
  props: {
    cards: {
      required: true
    }
  }
};
</script>
