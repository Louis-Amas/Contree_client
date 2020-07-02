import { SET_LOBBY, SET_MY_POS, RESET_LOBBY } from './mutations.type'
import { JOIN_GAME, CHOOSE_POS, LEAVE_LOBBY } from './actions.type'
import { getLobbyManager } from '../io-client'

const positons = ['north', 'west', 'south', 'east'];

const arrangedPositions = {
    'NORTH': ['west', 'south', 'east'],
    'WEST': ['south', 'east', 'north'],
    'SOUTH': ['east', 'north', 'west'],
    'EAST': ['north', 'west', 'south'],
}

export default {
    state: {
        lobbyName: '',
        north:  null,
        west: null,
        south: null,
        east: null,
        myPos: null
    },
    getters: {
        availablePositions: state => {
            let poss = []
            for (let pos of positons) {
                if (state[pos] === null) {
                    poss.push(pos.toUpperCase())
                }
            }
            return poss
        },
        players: state => {
            let players = []
            for (let pos of positons) {
                let player = state[pos]
                if (player !== null) {
                    player.position = pos.toUpperCase()
                    delete player.secret
                    players.push(player)

                }
            }
            return players
        },
        arrangedPositions: state => {
            return arrangedPositions[state.myPos]
        }
    },
    mutations: {
        [SET_LOBBY](state, lobby) {
            
            state.lobbyName = lobby.lobbyName
            for (let pos of positons) {
                state[pos] = lobby[pos]
            }
        },
        [SET_MY_POS](state, pos) {
            state.myPos = pos
        },
        [RESET_LOBBY](state) {
            state.myPos = null
            state.lobbyName = ''
        }
    },
    actions: {
        [JOIN_GAME]({commit}, name) {
            return getLobbyManager().joinLobby(name).then(lobby => {
                commit(SET_LOBBY, lobby)
                return Promise.resolve()
            })
        },
        [CHOOSE_POS]({commit}, pos) {
            return getLobbyManager().choosePosition(pos)
                .then((res) => {
                    commit(SET_MY_POS, pos)
                    commit(SET_LOBBY, res)
                })
        },
        [LEAVE_LOBBY]() {
            getLobbyManager().leaveLobby()
        }
    }
}
