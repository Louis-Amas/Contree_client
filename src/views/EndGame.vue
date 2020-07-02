<template>
    <div class="content-page">
        <Historic :hands="hands" :myPos="myPos"></Historic>
        <BottomToolbar></BottomToolbar>
    </div>
</template>
<script>
import BottomToolbar from '../components/BottomToolbar'
import Historic from '../components/Historic'

export default {
    components: {
        Historic,
        BottomToolbar
    },
    computed: {
        hands() {
            return this.$store.state.game.hands
        },
        myPos() {
            return this.$store.state.lobby.myPos
        }
    }
}
</script>