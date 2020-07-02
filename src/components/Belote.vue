<template>
    <v-container>
      <v-chip v-if="belote">
            {{ beloteMsg }}
      </v-chip>
    </v-container>
</template>

<script>
export default {
    props: {
        position: String
    },
    computed: {
        belote() {
            return this.$store.state.game.belotePosition === this.position.toUpperCase()
        },
        beloteMsg() {
            if (!this.$store.state.game.isReBelote) 
                return 'Belote'
            return 'Re Belote'
        }
    }
}
</script>