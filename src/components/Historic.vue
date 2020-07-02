<template>
  <div class="historic green darken-3">
    <v-card class="green darken-3" dark tile>
          <v-row align="center" justify="center" no-gutters>
            <div :class="[nsColor, 'score-value']">{{scores.NS}}</div>
            <div :class="[weColor, 'score-value']">{{scores.WE}}</div>
          </v-row>
    </v-card>
    <v-row no-gutters>
      <v-col cols="4">
        <div class="white--text display-2 green darken-1">Hands</div>
        <div @click="changeHand(index)" 
        
        :class="[
        index == selectedHand ? 'green accent-2':  'green darken-2',
        'hands-item']" v-for="(hand, index) in HandsCards" v-bind:key="index"
          
        >
          <Hand :cards="hand"></Hand>
        </div>
      </v-col>
      <v-col fill-width>
          <v-tabs 
          @change="changeTab($event)" background-color="green darken-2" dark>
              <v-tab>Calls</v-tab>
              <v-tab>Pli</v-tab>
          </v-tabs>
          <div v-show="selectedTab == 0">
             <HistoricCall 
             v-for="(call, index) in calls" 
             v-bind:key="index"
             :call="call.call"
             :position="call.position == myPos ? 'ME' : call.position"
             :class="[call.color]"
             >

             </HistoricCall>
          </div>
          <div v-show="selectedTab == 1">
            <Pli
              v-for="(pli, index) in plis"
              v-bind:key="index"
              :eastDisplayCard="pli.east"
              :northDisplayCard="pli.north"
              :westDisplayCard="pli.west"
              :southDisplayCard="pli.south"
            >

            </Pli>
          </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import Hand from './Hand'
import HistoricCall from './HistoricCall'
import Pli from './Pli'
export default {
  components: {
    Hand,
    HistoricCall,
    Pli
  },
  data() {
    return {
      selectedHand: 0,
      selectedTab: 0
    }
  },
  props: {
    hands: Array,
    myPos: String
  },
  methods: {
    changeTab(tabNumber) {
      this.selectedTab = tabNumber
    },
    changeHand(handNumber) {
      this.selectedHand = handNumber
    }
  },
  computed: {
    scores() {
      return this.hands[this.selectedHand].scores
    },
    calls() {
      return this.hands[this.selectedHand].calls.map(call => {
        if ( (call.position === 'NORTH' || call.position === 'SOUTH') && this.IAmInNSTeam){
          call.color = 'green accent-2'
        } else if ((call.position === 'WEST' || call.position === 'EAST') && !this.IAmInNSTeam) {
          call.color = 'green accent-2'
        } else {
          call.color = 'red accent-4'
        }

        return call
      })
    },
    plis() {
      return this.hands[this.selectedHand].plis
    },
    HandsCards() {
      return this.hands.map(hand => hand.hand)
    },
    IAmInNSTeam() {
      return this.$store.state.lobby.myPos === "NORTH" ||
        this.$store.state.lobby.myPos === "SOUTH"
    
    },
    nsColor() {
      if (this.IAmInNSTeam) return "green accent-2";
      return "red accent-4";
    },
    weColor() {
      if (this.IAmInNSTeam) return "red accent-4";
      return "green accent-2";
    },
  }
};
</script>

<style>
.score-value {
  font-size: 3em;
  padding: 10px;
}
.historic {
  height: 100%;
  widows: 100%;
}

.hands-item {
  border: solid 3px #333;
  padding: 5px;
}
</style>