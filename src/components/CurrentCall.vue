<template>
    <v-card :class="[color]">
        <v-row align="center" justify="center" class="current-call">
            {{ specialMsg}} {{ currentCall.value }} <v-icon left :color="icon.color">{{icon.icon}}</v-icon>
        </v-row>
    </v-card>
</template>

<script>
import { getIconFromText } from '../utils'
export default {
    props: {
        currentCall: Object,
        team: String
    },
    computed: {
        icon() {
            return getIconFromText(this.currentCall.family)
        },
        specialMsg() {
            if (this.$store.state.game.isContree)
                return 'Contrée'
            else if (this.$store.state.game.isSurContree)
                return 'Sur Contrée'
            else 
                return ''
        },
        myPos() {
            return this.$store.state.lobby.myPos
        },
        currentTeam() {
            return this.$store.state.game.currentTeam
        },
        color() {
            if ( (this.myPos === 'NORTH' || this.myPos === 'SOUTH') && this.currentTeam === 'NS')
                return 'green accent-2'
            else if ( (this.myPos === 'WEST' || this.myPos === 'EAST') && this.currentTeam === 'WE')
                return 'green accent-2'
            return 'red accent-4'
            
        }
    }
}
</script>

<style>
.current-call {
    height: 30px;
}
</style>