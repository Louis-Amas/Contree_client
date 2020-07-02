import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import MainMenu from '../views/MainMenu.vue'
import Lobby from '../views/Lobby.vue'
import CardMat from '../views/CardMat'
import Test from '../views/Test'
import EndGame from '../views/EndGame'

import store from '../store'
import { LEAVE_LOBBY, LEAVE_GAME } from '../store/actions.type'
import { RESET_ALL_GAME } from '../store/mutations.type'
Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/main',
        name: 'Main menu',
        component: MainMenu
    },
    {
        path: '/lobby',
        name: 'Lobby',
        component: Lobby
    },
    {
        path: '/card_mat',
        name: 'Game',
        component: CardMat 
    },
    {
        path: '/test',
        name: 'Test',
        component: Test 
    },
    {
        path: '/end',
        name: 'Game end',
        component: EndGame 
    }
    
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
    to;
    if (to.fullPath == '/main' && from.fullPath == '/lobby') {
        store.dispatch(LEAVE_LOBBY)
    }

    if (to.fullPath == '/card_mat') {
        if (from.fullPath == '/end' || from.fullPath == '/main') {
            router.push({path: '/main'})
            store.dispatch(RESET_ALL_GAME)
        }
    }
    if (from.fullPath == '/card_mat') {
        store.dispatch(LEAVE_GAME)
    }
    next()
})

export default router
