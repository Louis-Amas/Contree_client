<template>
  <v-toolbar class="green darken-4" dense>
    <v-btn icon
    @click="goBack"
    >
      <v-icon>mdi-arrow-left</v-icon>
    </v-btn>
    <v-spacer></v-spacer>
  </v-toolbar>
</template>
<script>
import router from '../router'
export default {
  methods: {
    goBack() {
      router.back()
    }
  }
}
</script>