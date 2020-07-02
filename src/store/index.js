import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
import login from './login'
import lobby from './lobby'
import game  from './game'

export default new Vuex.Store({
    modules: {
        login,
        lobby,
        game
    }
})
