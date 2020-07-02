<template>
  <div>
    <v-container>
      <v-row no-gutters>
        <v-col>
          <Card
            v-if="northDisplayCard !== null"
            :value="northDisplayCard.value"
            :family="northDisplayCard.family"
            :playable="false"
            :win="northDisplayCard.win"
            :notPlayableButVisible="true"
          ></Card>
        </v-col>
      </v-row>
      <v-row no-gutters>
        <v-col>
          <Card
            v-if="westDisplayCard !== null"
            :value="westDisplayCard.value"
            :family="westDisplayCard.family"
            :playable="false"
            :win="westDisplayCard.win"
            :notPlayableButVisible="true"
          ></Card>
        </v-col>
        <v-col>
          <Card
            v-if="eastDisplayCard !== null"
            :value="eastDisplayCard.value"
            :family="eastDisplayCard.family"
            :playable="false"
            :win="eastDisplayCard.win"
            :notPlayableButVisible="true"
          ></Card>
        </v-col>
      </v-row>
      <v-row no-gutters>
        <v-col>
          
          <Card
            v-if="southDisplayCard !== null"
            :value="southDisplayCard.value"
            :family="southDisplayCard.family"
            :playable="false"
            :win="southDisplayCard.win"
            :notPlayableButVisible="true"
          ></Card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import Card from "./Card";

export default {
  props: {
    eastDisplayCard: Object,
    northDisplayCard: Object,
    westDisplayCard: Object,
    southDisplayCard: Object,
  },
  components: {
    Card
  }
};
</script>
