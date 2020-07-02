<template>
  <div class="green darken-1 content-page" fluid>
  <v-container class="green darken-1 ma-0 pa-0" fill-height fluid>

    <!-- Top -->
    <v-row class="first-game-row" align="start" justify="center" no-gutters>
      <v-col cols="1">
        <Score></Score>
      </v-col>
      <v-col cols="8">
        <PlayerHand :isVertical="false" :position="arrangedPosByMyPos[1]"></PlayerHand>
      </v-col>
      <v-col cols="1">
        <CurrentCall v-if="currentCall" :currentCall="currentCall" :team="currentTeam"></CurrentCall>
      </v-col>
    </v-row>

    <v-row align="center" justify="center" no-gutters>
      <Call v-if="isCallTurn" :position="arrangedPosByMyPos[1]"></Call>
      <Belote v-if="!isCallTurn" :position="arrangedPosByMyPos[1]"></Belote>
    </v-row>

    <!-- Middle -->
    <v-row align="center" justify="space-between" cols="1">
      <!-- West player -->
      <v-col cols="2">
        <PlayerHand :isVertical="true" :position="arrangedPosByMyPos[2]"></PlayerHand>
      </v-col>
      <v-col cols="1">
        <Call v-if="isCallTurn" :position="arrangedPosByMyPos[2]"></Call>
        <Belote v-if="!isCallTurn" :position="arrangedPosByMyPos[2]"></Belote>
      </v-col>

      <!-- Call menu -->
      <v-col cols="4">
        <CallMenu v-show="isMyCallTurn"></CallMenu>
        <Pli v-if="!isCallTurn" 
        :eastDisplayCard="eastDisplayCard"
        :northDisplayCard="northDisplayCard"
        :westDisplayCard="westDisplayCard"
        :southDisplayCard="myCard"

        ></Pli>
      </v-col>

      <!-- East Player -->
      <v-col cols="1">
        <Call v-if="isCallTurn" :position="arrangedPosByMyPos[0]"></Call>
        <Belote v-if="!isCallTurn" :position="arrangedPosByMyPos[0]"></Belote>
      </v-col>
      <v-col cols="2">
        <PlayerHand :isVertical="true" :position="arrangedPosByMyPos[0]"></PlayerHand>
      </v-col>
    </v-row>


    <!-- Bottom -->
    <v-row align="center" justify="center" no-gutters>
      <Call
        v-if="isCallTurn"
        :position="myPos"
      ></Call>
      <Belote v-if="!isCallTurn" :position="myPos"></Belote>
    </v-row>
    <v-row align="center" justify="center">
      <v-col cols="8">
        <MyHand class="content"></MyHand>
      </v-col>
    </v-row>
    

  </v-container>
      <GameBottomToolbar></GameBottomToolbar>
  </div>
</template>

<script>
import GameBottomToolbar from '../components/GameBottomToolbar'
import MyHand from '../components/MyHand'
import PlayerHand from '../components/PlayerHand'
import CallMenu from '../components/CallMenu'
import Call from '../components/Call'
import Pli from '../components/Pli'
import CurrentCall from '../components/CurrentCall'
import Belote from '../components/Belote'
import Score from '../components/Score'

export default {
  components: {
    MyHand,
    PlayerHand,
    CallMenu,
    Call,
    Pli,
    CurrentCall,
    Belote,
    Score,
    GameBottomToolbar
  },
  props: {
    msg: String
  },
  data() {
    return {
      basicOrder: ['east', 'north', 'west']
    };
  },
  computed: {
    myPos() {
      return this.$store.state.lobby.myPos
    },
    arrangedPosByMyPos() {
      return this.$store.getters.arrangedPositions
    },
    isCallTurn() {
      return this.$store.state.game.turn === 'calls'
    },
    isMyCallTurn() {
      return this.isCallTurn && this.$store.state.game.askCall === true
    },
    currentCall() {
      return this.$store.state.game.bestCall
    },
    currentTeam() {
      return this.$store.state.game.currentTeam
    },    
    arrangedPositions() {
      return this.$store.getters.arrangedPositions;
    },
    eastDisplayCard() {
      return this.$store.getters.getCardByPosition(
        this.arrangedPositions[0].toUpperCase()
      );
    },
    northDisplayCard() {
      return this.$store.getters.getCardByPosition(
        this.arrangedPositions[1].toUpperCase()
      );
    },
    westDisplayCard() {
      return this.$store.getters.getCardByPosition(
        this.arrangedPositions[2].toUpperCase()
      );
    },
    myCard() {
      return this.$store.getters.getCardByPosition(
        this.$store.state.lobby.myPos
      );
    }
  }
};
</script>

<style>
.card-mat {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.first-game-row {
  margin-top: 30px;
}
</style>
