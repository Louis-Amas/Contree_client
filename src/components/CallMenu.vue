<template>
  <v-card>
    <v-card-title>My bid</v-card-title>
    <v-container>
      <v-row align="center" justify="center">
        <v-col>
          <v-slider
            v-model="slider"
            class="align-center"
            :max="max"
            :min="min"
            hide-details
            step="10"
            ticks
            :thumb-size="thumbSize"
            thumb-label="always"
            :color="color.color"
            :track-color="color.track"
          >
            <template v-slot:prepend>
              <v-btn
                small
                tile
                :color="color.color"
                class="darken-3 white--text"
                v-model="rangeCall[0]"
                hide-details
                single-line
                type="number"
                @click="minTen"
                :disabled="!canDown"
              >
                <v-icon>mdi-rewind-10</v-icon>
              </v-btn>
            </template>
            <template v-slot:append>
              <v-btn
                small
                tile
                :color="color.color"
                class="darken-3 white--text"
                v-model="rangeCall[0]"
                hide-details
                single-line
                type="number"
                :disabled="!canUp"
                @click="addTen"
              >
                <v-icon>mdi-fast-forward-10</v-icon>
              </v-btn>
            </template>
            <template v-slot:thumb-label="{ value }">
              {{ getThumbLabel(value)}}
            </template>
          </v-slider>
        </v-col>
      </v-row>
      <v-row align="start" justify="center">
        <v-col cols="4">
          <v-btn-toggle v-model="toggle_exclusive" dense group>
            <v-btn>
              <v-icon color="red darken-2" dark>mdi-cards-diamond</v-icon>
            </v-btn>

            <v-btn>
              <v-icon>mdi-cards-club</v-icon>
            </v-btn>

            <v-btn>
              <v-icon color="red darken-2">mdi-cards-heart</v-icon>
            </v-btn>

            <v-btn>
              <v-icon>mdi-cards-spade</v-icon>
            </v-btn>
          </v-btn-toggle>
        </v-col>
      </v-row>
      <v-row align="center" justify="center">
        <v-col>
          <v-btn outlined class="gray darken-3 btn-menu" @click="pass()">Pass</v-btn>
        </v-col>
        <v-col>
          <v-btn 
          :disabled="isContree || minCall == 210"
          class="green darken-3 white--text btn-menu" 
          @click="call()">Call</v-btn>
        </v-col>
        <v-col>
          <v-btn
            tile
            class="yellow darken-3 white--text btn-menu"
            :disabled="!hasOneCall"
            @click="contree()"
          >{{ contreeMsg }}</v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
import { CALL, PASS, CONTREE, SURCONTREE } from "../store/mutations.type";

export default {
  data() {
    return {
      family: "clovers",
      value: "7",
      hidden: true,
      slider: 80,
      min: 80,
      max: 200,
      toggle_exclusive: 0,
      allFamily: ["diamonds", "clovers", "hearts", "spades"]
    };
  },
  watch: {
    minCall(val) {
      this.slider = val;
    }
  },
  computed: {
    rangeCall() {
      return [this.minCall, this.max];
    },
    minCall() {
      return this.$store.getters.lastCallValue;
    },
    isRed() {
      return [0, 2].includes(this.toggle_exclusive);
    },
    isBlack() {
      return [1, 3].includes(this.toggle_exclusive);
    },
    color() {
      let color = {
        color: "",
        track: ""
      };
      if (this.isRed) {
        color.color = "red darken-2";
        color.track = "red lighten-3";
      } else {
        color.color = "grey darken-3";
        color.track = "grey";
      }
      return color;
    },
    myPos() {
      return this.$store.state.lobby.myPos;
    },
    hasOneCall() {
      return this.$store.getters.hasOneCall;
    },
    canDown() {
      return this.slider - 10 >= this.minCall;
    },
    canUp() {
      return this.slider  < this.max;
    },
    isContree() {
      return this.$store.state.game.isContree;
    },
    contreeMsg() {
      if (this.isContree)
        return 'Sur Contrer'
      return 'Contrer'
    },
    thumbSize() {
      if (this.slider < 190) {
        return 32
      }
      return 50
    }
  },
  methods: {
    addTen() {
      if (this.slider < this.max) {
        this.slider += 10;
      }
    },
    minTen() {
      if (this.slider > this.minCall) {
        this.slider -= 10;
      }
    },
    call() {
      const call = {
        value: this.slider,
        family: this.allFamily[this.toggle_exclusive]
      }
      if (this.slider === 190) {
        call.isCapot = true
      } else if (this.slider === 200) {
        call.isCapotB = true
      }
      this.$store.commit(CALL, call);
    },
    pass() {
      this.$store.commit(PASS);
    },
    contree() {
      if (!this.isContree) this.$store.commit(CONTREE);
      else this.$store.commit(SURCONTREE);
    },
    getThumbLabel(value) {
      if (value == 190)  
        return 'Capot'
      else if (value == 200) 
        return 'Capot B.'
      
      return '' + value
    }
  }
};
</script>
<style>
.btn-menu {
  margin: 10px 10px 10px 10px;
}
</style>