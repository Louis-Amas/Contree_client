<template>
  <v-card class="white--text historic-call">
      <v-row no-gutters align="center" justify="space-between">
      <div class="headline">{{ position }}</div>
      <div class="headline" v-if="!isSpecial">
        {{ call.value }}
        <v-icon :color="icon.color">{{icon.icon}}</v-icon>
      </div>
      <div class="headline" v-if="isSpecial">
          {{ specialMessage}}
      </div>
      </v-row>
    
  </v-card>
</template>

<script>
import { getIconFromText } from "../utils";
export default {
  props: {
    call: Object,
    position: String
  },
  computed: {
    icon() {
      return getIconFromText(this.call.family);
    },
    isPass() {
      return this.call.isPass != undefined;
    },
    isContree() {
      return this.call.isContree != undefined;
    },
    isSurContree() {
      return this.call.isSurContree != undefined;
    },
    isSpecial() {
      return this.isPass || this.isContree || this.isSurContree;
    },
    specialMessage() {
      if (this.isPass) return "Pass";
      if (this.isContree) return "Contrée";
      if (this.isSurContree) return "Sur contrée";
      return "";
    }
  }
};
</script>

<style>
.historic-call {
    padding-left: 10px;
    padding-right: 20px;
    height: 40px;
}
</style>