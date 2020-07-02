import { SET_USER, SET_CONNECTED, RESET_LOGIN } from './mutations.type'
import { LOGIN_ACTION, IDENTIFY_ACTION, DISCONNECT } from './actions.type'
import { getLoginManager } from '../io-client'

export default {
    state: {
        connected: false,
        username: '',
        secret: ''
    },
    mutations: {
        [SET_USER](state, user) {
            state.username = user.name
            state.secret = user.secret
        },
        [SET_CONNECTED](state, connected) {
            state.connected = connected
        },
        [RESET_LOGIN](state) {
            state.connected = false,
            state.username = '',
            state.secret = ''
        }
    },
    actions: {
        [LOGIN_ACTION]({commit}, user) {
            return getLoginManager().login(user.username, user.password)
                .then(usr => {
                    commit(SET_USER, usr)
                })
        },
        [IDENTIFY_ACTION]({commit, state}) {
            return getLoginManager().identify(state.username, state.secret).then(resp => {
                commit(SET_CONNECTED, resp.connected)
                return Promise.resolve(state.connected)
            })
        },
        [DISCONNECT]() {
            location.reload()
        }
    }
}
