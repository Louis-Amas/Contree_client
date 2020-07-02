<template>
  <div class="content-page">

    <div>
    <v-toolbar dark class="green darken-3">
      <v-toolbar-title class="headline text-uppercase">
        <span class="font-weight-light">Launch a game</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn disabled>
        <span class="mr-2">{{ lobbyName }}</span>
      </v-btn>
    </v-toolbar>
    </div>
    
    <v-container fill-height fluid>
      <v-row align="center" justify="center">
      <v-card class="mt-5">
        <v-container>
          <v-card-title title class="pb-1">
            Game position
          </v-card-title>
          <v-layout row justify-center>
            <v-card class="my-5">
              <div class="playmat">
                <template v-for="_pos in availablePositions">
                  <div class="content" :key="_pos" :id="_pos">
                    <Card class="disable" v-show="pos == _pos" family="clovers" value="7" :hidden="true" :index="0"
                      :playble='false'></Card>
                    <v-btn class="green white--text hover" v-show="pos != _pos" @click="choosePos(_pos)">{{_pos}}
                    </v-btn>
                  </div>
                </template>
                <template v-for="ppos in players">
                  <div class="content" :key="ppos.position" :id="ppos.position">
                    <v-layout column wrap align-center>
                      <Card class="disable" family="clovers" value="7" :hidden="true" :index="0" :playble='false'
                        :taken="ppos.position !== myPos"></Card>
                      <v-btn class="green white--text hover" disabled small>{{ppos.name}}</v-btn>
                    </v-layout>
                  </div>
                </template>
              </div>
            </v-card>
          </v-layout>
        </v-container>
      </v-card>
      </v-row>
    </v-container>

      <BottomToolbar></BottomToolbar>
  </div>
</template>

<script>
import Card from '../components/Card.vue';
import BottomToolbar from '../components/BottomToolbar'
import { CHOOSE_POS  } from '../store/actions.type';


export default {
    name: 'Lobby',
    components: {
        Card,
        BottomToolbar
    },
    data() {
        return {
            pos: '',
            allPos: ['NORTH', 'WEST', 'SOUTH', 'EAST'], 
            isReady: false,
        }
    },
    computed: {
        myPos(){
            return this.$store.state.lobby.myPos;
        },
        availablePositions() {
            return this.$store.getters.availablePositions;
        },
        players() {
            return this.$store.getters.players;
        },
        lobbyName() {
            return this.$store.state.lobby.lobbyName
        }
    },
    methods: {
        choosePos(pos) {
            this.pos = pos
            this.$store.dispatch(CHOOSE_POS, pos)
        } 
    },
}
</script>

<style scoped>
html {
    margin: 0%;
    padding: 0%;
}

.playmat {
    display: inline-grid;
    grid-template-columns: 10vw 50vw 10vw;
    grid-template-rows: 18vh 25vh 18vh;
    justify-items: center;
    align-items: center;
    background-color: green;
    width: 100%;
    height: 100%;
    margin: 0%;
}

.content {
    justify-content: center;
    align-items: center;
}

.disable {
    pointer-events: none;
    height: 110px;
    width: 79px;
}

.hover:hover {
    background-color: green;
}

#SOUTH {
    grid-column: 2;
    grid-row: 3;
}

#NORTH {
grid-column: 2;
grid-row: 1;
}

#WEST {
    grid-column: 1;
    grid-row: 2;
}

#EAST {
    grid-column: 3;
    grid-row: 2;
}
</style>

