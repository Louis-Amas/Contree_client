<template>
  <v-container>
      <CallMenu v-if="isCallTurn"></CallMenu>
      <Pli v-if="!isCallTurn"></Pli>
  </v-container>
</template>

<script>
import CallMenu from './CallMenu'
import Pli from './Pli'
export default {
    components: {
        CallMenu,
        Pli
    },
    computed: {
        isCallTurn() {
            return this.$store.state.game.turn === 'calls'
        }
    }
}

</script>
<style>
.floor {
  display: grid;
  grid-template-columns: 70px 70px 70px;
  grid-template-rows: 70px 70px 70px;
  justify-items: center;
  align-items: center;
  pointer-events: none;
}

</style>
