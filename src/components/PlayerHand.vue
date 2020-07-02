<template>
  <div>
    <div v-if="!isVertical">
      <Card
        v-for="i in countOfCard"
        v-bind:key="i"
        :family="fakeCard.family"
        :value="fakeCard.value"
        :playable="fakeCard.playable"
        :hidden="fakeCard.hidden"
      ></Card>
    </div>
    <div v-if="isVertical">
      <VerticalFakeCard v-for="i in countOfCard" v-bind:key="i"></VerticalFakeCard>
    </div>
  </div>
</template>

<script>
import Card from "./Card.vue";
import VerticalFakeCard from "./VerticalFakeCard";
export default {
  name: "PlayerHand",
  components: {
    Card,
    VerticalFakeCard
  },
  props: {
    position: String,
    isVertical: Boolean
  },
  computed: {
    countOfCard() {
      return this.$store.getters.getCardCountByPosition(
        this.position.toUpperCase()
      );
    }
  },
  data() {
    return {
      fakeCard: {
        value: "9",
        family: "clovers",
        hidden: true
      }
    };
  }
};
</script>
