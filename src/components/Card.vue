<template>
  <div
    @click="emitCard()"
    class="card fadein"
    :class="[ 
        winColor,
        family, 
        playable  ? 'playable' : 'not-playable', 
        taken ? 'taken' : '',
        notPlayableButVisible ? 'visble-but-not-playable': ''
        ]"
    :id="id"
  >
    <div class="card-value">{{ showedValue }}</div>
    <div class="suit">{{ symbol }}</div>
    <div class="main-number">{{ showedValue }}</div>
    <div class="invert card-value">{{ showedValue }}</div>
    <div class="invert suit">{{ symbol }}</div>
  </div>
</template>

<script>
const symbols = {
  diamonds: "♦",
  hearts: "♥",
  spades: "♠",
  clovers: "♣"
};
const royalFamily = {
  king: "K",
  queen: "Q",
  jack: "J"
};
export default {
  name: "Card",
  props: {
    family: String,
    value: String,
    hidden: Boolean,
    playable: Boolean,
    notPlayableButVisible: Boolean,
    win: Boolean,
    taken: Boolean
  },
  data() {
    return {
      hover: false
    };
  },
  methods: {
    emitCard() {
      if (!this.playable) return;
      console.log("emit card");
      this.$emit("card", { value: this.value, family: this.family });
    }
  },
  computed: {
    symbol() {
      return symbols[this.family];
    },
    showedValue() {
      if (
        this.value.includes("king") ||
        this.value.includes("queen") ||
        this.value.includes("jack")
      )
        return royalFamily[this.value];
      return this.value;
    },
    id() {
      if (this.hidden) return "hidden-card";
      return "";
    },
    winColor() {
      if (this.win) {
        return "green accent-2";
      }
      return "";
    }
  }
};
</script>
<style>
div.card {
  padding: 1px;
  display: inline-block;
  border: solid 3px #333;
  border-radius: 5px 5px 5px 5px;
  position: relative;
  text-align: center;
  width: 77px;
  height: 115px;
  background-color: white;
  -webkit-transition: margin-bottom 0.5s !important;
  transition: margin-bottom 0.5s !important;
}

div.card.playable:hover {
  background-color: rgb(25, 218, 0);
}

div.card.not-playable {
  background-color: rgb(173, 173, 173);
}

div.card.visble-but-not-playable {
  background-color: white;
}

div.card.hearts,
div.card.diamonds {
  color: red;
}
div.card.clovers,
div.card.spades {
  color: black;
}
div.card div.main-number {
  font-size: 36px;
  font-weight: bold;
  margin: 0px auto;
  margin-top: 50%;
}
div.card-value,
div.suit {
  position: absolute;
  left: 5px;
}
div.card-value {
  top: 5px;
}
div.suit {
  top: 20px;
}
div.card-value.invert,
div.suit.invert {
  transform: rotate(180deg);
  right: 5px;
  text-align: right;
  top: auto;
  left: auto;
}
div.card-value.invert {
  bottom: 5px;
}
div.suit.invert {
  bottom: 20px;
}
div#user-score,
div#dealer-score {
  display: inline-block;
}
div.score-parent {
  width: 100%;
  display: inline-block;
}
div.score-parent p {
  display: inline-block;
}
div.card#hidden-card {
  background-color: #cbe0fd;
}
div.card.taken#hidden-card {
  background-color: rgb(253, 203, 203);
}
div.card#hidden-card div {
  visibility: hidden;
}
div.card.red#hidden-card div {
  visibility: hidden;
}
div.card.south.not-playable {
  background-color: grey;
  opacity: 0.8;
  pointer-events: none !important;
}
</style>
