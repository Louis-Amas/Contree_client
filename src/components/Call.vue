<template>
     <v-container class="call" v-if="hasCall">
      <v-chip v-if="!isSpecial">
          <v-icon left :color="icon.color">{{icon.icon}}</v-icon>
          {{call.value}}
      </v-chip>
      <v-chip v-else>
            {{ specialMessage }}
      </v-chip>
    </v-container>
</template>

<script>

import { getIconFromText } from '../utils'
export default {
    name: 'Call',
    props: {
        position: String
    },
    computed: {
        icon() {
            return getIconFromText(this.call.family)
        },
        call() {
            let myCall = this.$store
                .getters.getCallByPosition(this.position.toUpperCase())
            if (myCall === undefined)
                return null
            return myCall
        },
        hasCall() {
            return this.call !== null   
        },
        isPass(){
            return this.call.isPass
        },
        isCapot() {
            return this.call.isCapot
        },
        isCapotB() {
            return this.call.isCapotB
        },
        isContree() {
            return this.call.isContree 
        },
        isSurContree() {
            return this.call.isSurContree
        },
        isSpecial() {
            return this.isPass || this.isContree || this.isSurContree || this.isCapot || this.isCapotB
        },
        specialMessage() {
            if (this.isPass)
                return 'Pass'
            if (this.isCapot)
                return 'Capot'
            if (this.isCapotB)
                return 'Capot B.'
            if (this.isContree)
                return 'Contrée'
            if (this.isSurContree)
                return 'Sur contrée'
            return ''
        }
    },

}
</script>

<style>

.call {
    height: 50px;
    -webkit-box-shadow: none;
    -moz-box-shadow: none;
    box-shadow: none;
}


</style>
