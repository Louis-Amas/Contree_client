<template>
  <v-simple-table >
    <template v-slot:default>
      <thead>
        <tr  v-if="!global" @click="swithFromGlobal()">
          <th class="text-center">Pli NS</th>
          <th class="text-center">Pli WE</th>
        </tr>
        <tr  v-if="global" @click="swithFromGlobal()">
          <th class="text-center">Global NS</th>
          <th class="text-center">Global WE</th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="!global">
          <td :class="[nsColor]">{{ nsPliScore }}</td>
          <td :class="[weColor]">{{ wePliScore }}</td>
        </tr>
        <tr v-if="global">
          <td :class="[nsColor]">{{ nsScore }}</td>
          <td :class="[weColor]">{{ weScore }}</td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
</template>

<script>
export default {
  data() {
      return {
          global: false
      }
  },
  methods: {
      swithFromGlobal() {
          this.global = !this.global
      }
  },
  computed: {
    IAmInNSTeam() {
      return (
        this.$store.state.lobby.myPos === "NORTH" ||
        this.$store.state.lobby.myPos === "SOUTH"
      );
    },
    nsColor() {
      if (this.IAmInNSTeam) return "green accent-2";
      return "red accent-4";
    },
    weColor() {
      if (this.IAmInNSTeam) return "red accent-4";
      return "green accent-2";
    },
    nsPliScore() {
      return this.$store.state.game.nsPliScore
    },
    wePliScore() {
      return this.$store.state.game.wePliScore
    },
    nsScore() {
      return this.$store.state.game.nsScore
    },
    weScore() {
      return this.$store.state.game.weScore
    }
  }
};
</script>
