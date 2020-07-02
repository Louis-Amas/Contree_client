import { SET_HAND, 
    SET_TURN, 
    ASK_CARD, 
    ASK_CALL, 
    SET_BEGINNER, 
    RESET_PLI, 
    ADD_CALL,
    CALL,
    PASS,
    CHOOSE_CARD,
    CONTREE,
    SURCONTREE,
    ADD_CARD_TO_PLI,
    SET_BEST_CALL,
    SET_CURRENT_TEAM,
    SET_PLI_SCORES,
    SET_WINNING_PLI_POSITION,
    SET_SCORES,
    RESET_ALL_GAME,
    SET_BELOTE
} from './mutations.type'

import sorter from '../io-client/sorter'
import { LEAVE_GAME } from './actions.type'
import { getGameManager } from '../io-client'


export default {
    state: {
        hands: [],
        hand: null,
        beginnerPos: null,
        turn: '',
        fn: null,

        northCardCount: 8,
        westCardCount: 8,
        eastCardCount: 8,
        southCardCount: 8,

        northCall: null,
        westCall: null,
        southCall: null,
        eastCall: null,

        northCard: null,
        westCard: null,
        southCard: null,
        eastCard: null,

        northLastCard: null,
        westLastCard: null,
        southLastCard: null,
        eastLastCard: null,


        askCard: false,
        askCall: false,
        minCallValue: 70,

        bestCall: null,
        currentTeam: null,

        nsScore: 0,
        weScore: 0,

        nsPliScore: 0,
        wePliScore: 0,

        isReBelote: false,
        belotePosition: null,

        isContree: false,
        isSurContree: false
    },
    getters: {
        lastCallValue: state => {
            return state.minCallValue + 10
        },
        hasOneCall: state => {
            const calls = [state.northCall, state.westCall, state.southCall, state.eastCall]
            const notNullCalls = calls.filter(call => call !== null)
            const notIsPassCall = notNullCalls.filter(call => call.isPass !== true)
            return notIsPassCall.length > 0
        },
        getCallByPosition: state => pos => {
             switch(pos) {
                case 'NORTH':
                    return state.northCall
                case 'WEST':
                    return state.westCall
                case 'SOUTH':
                    return state.southCall
                case 'EAST':
                    return state.eastCall
            }

        },
        getCardByPosition: state => pos => {
            switch(pos) {
                case 'NORTH':
                    return state.northCard
                case 'WEST':
                    return state.westCard
                case 'SOUTH':
                    return state.southCard
                case 'EAST':
                    return state.eastCard
            }
        },
        getLastCardByPosition: state => pos => {
            switch(pos) {
                case 'NORTH':
                    return state.northLastCard
                case 'WEST':
                    return state.westLastCard
                case 'SOUTH':
                    return state.southLastCard
                case 'EAST':
                    return state.eastLastCard
            }
        },
        getCardCountByPosition: state => pos => {
            switch(pos) {
                case 'NORTH':
                    return state.northCardCount
                case 'WEST':
                    return state.westCardCount
                case 'SOUTH':
                    return state.southCardCount
                case 'EAST':
                    return state.eastCardCount
            }
        }
    },
    mutations: {
        [SET_BEST_CALL](state, call) {
            state.bestCall = call
            // Sort by asset of best call
            state.hand.sort(sorter[call.family])
        },
        [SET_CURRENT_TEAM](state, team) {
            state.currentTeam = team
        },
        [SET_PLI_SCORES](state, scores) {
            state.nsPliScore = scores.nsScore
            state.wePliScore = scores.weScore
        },
        [RESET_ALL_GAME](state) {
            state.nsPliScore = 0
            state.wePliScore = 0
            state.bestCall = null
            
            state.northCardCount = 8
            state.westCardCount = 8
            state.southCardCount = 8
            state.eastCardCount = 8
            
            state.northCall = null
            state.westCall = null
            state.southCall = null
            state.eastCall = null
            
            state.northCard = null
            state.westCard = null
            state.southCard = null
            state.eastCard = null

            state.northLastCard = null
            state.westLastCard = null
            state.southLastCard = null
            state.eastLastCard = null

            state.askCall = false
            state.askCard = false

            state.minCallValue = 70,
            state.isReBelote = false,
            state.belotePosition = null,
    
            state.isContree = false,
            state.isSurContree = false

            //state.hands = []
        },
        [SET_SCORES](state, scores) {
            state.nsScore = scores.nsScore
            state.weScore = scores.weScore

            state.hands[state.hands.length - 1].scores = {
                NS: scores.nsScore,
                WE: scores.weScore
            }
        },
        [SET_HAND](state, hand) {
            for (let card of hand) {
                card.playable = false
            }
            hand.sort(sorter['allAsset']);
            state.hand = hand
            state.hands.push({
                hand: [...hand],
                calls: [],
                plis: [],
                scores: {
                    NS: state.nsScore,
                    WE: state.weScore
                }
            })
        },
        [SET_TURN](state, turn) {
            state.turn = turn
        },
        [ASK_CARD](state, payload) {

            state.fn = payload.fn
            state.askCard = true
            // set playable card
            for (let c of state.hand) {
                if (payload.availableCards.find(card => card.value == c.value && card.family == c.family)) {
                    c.playable = true
                }
            }
            state.hand = [...state.hand]
        },
        [ASK_CALL](state, fn) {
            state.fn = fn
            state.askCall = true
        },
        [ADD_CARD_TO_PLI](state, payload) {
            const card = payload.card;
            const position = payload.position
            card.win = false
            switch(position) {
                case "NORTH":
                    state.northCard = card
                    state.northCardCount--
                    break
                case 'WEST':
                    state.westCard = card
                    state.westCardCount--
                    break
                case 'SOUTH':
                    state.southCard = card
                    state.southCardCount--
                    break
                case 'EAST':
                    state.eastCard = card
                    state.eastCardCount--
                    break
            }

            // delete card from hand
            if (this.state.lobby.myPos === position){
                let i = 0;
                for (let c of state.hand) {
                    if (c.value === card.value && c.family === card.family) {
                        break
                    }
                    ++i;
                }
                state.hand.splice(i, 1)
            }
        },
        [SET_BELOTE](state, payload) {
            state.belotePosition = payload.position
            state.isReBelote = payload.isReBelote
        },
        [SET_BEGINNER](state, pos) {
            state.beginnerPos = pos
        },
        [SET_WINNING_PLI_POSITION](state, pos) {
            switch(pos) {
                case 'NORTH':
                    state.northCard.win = true
                    break
                case 'WEST':
                    state.westCard.win = true
                    break
                case 'SOUTH':
                    state.southCard.win = true
                    break
                case 'EAST':
                    state.eastCard.win = true
                    break
            }
        },
        [RESET_PLI](state) {
            state.hands[state.hands.length - 1].plis.push({
                north: state.northCard,
                west: state.westCard,
                south: state.southCard,
                east: state.eastCard
            })
            state.northLastCard = state.northCard
            state.westLastCard = state.westCard
            state.southLastCard = state.southCard
            state.eastLastCard = state.eastCard

            state.northCard = null
            state.westCard = null
            state.southCard = null
            state.eastCard = null
            state.winningPliPosition = null
            state.belotePosition = null
            state.isReBelote = false
        },
        [CALL](state, call) {
            state.askCall = false
            state.fn(JSON.stringify(call))
            state.fn = null
        },
        [PASS](state) {
            state.fn(JSON.stringify({isPass: true}))
            state.fn = null
            state.askCall = false
        },
        [CONTREE](state) {
            state.fn(JSON.stringify({isContree: true}))
            state.fn = null
            state.askCall = false
        },
        [SURCONTREE](state) {
            state.fn(JSON.stringify({isSurContree: true}))
            state.fn = null
            state.askCall = false
        },
        [CHOOSE_CARD](state, card) {
            state.fn(JSON.stringify(card))
            state.fn = null
            for (let card of state.hand) {
                card.playable = false
            }
        },
        [ADD_CALL](state, call) {
            state.hands[state.hands.length - 1].calls.push(call)
            switch(call.position) {
                case 'NORTH':
                    state.northCall = call.call
                    break
                case 'WEST':
                    state.westCall = call.call
                    break
                case 'SOUTH':
                    state.southCall = call.call
                    break
                case 'EAST':
                    state.eastCall = call.call
                    break
            }
            if (call.call.isContree) {
                state.isContree = true
            }
            if (call.call.isSurContree) {
                state.isContree = false
                state.isSurContree = true
            }

            if (call.call.value !== undefined) {
                state.minCallValue = call.call.value
            }
        }
    },
    actions: {
        [LEAVE_GAME]({commit}) {
            getGameManager().leaveGame()
            commit(SET_SCORES, {nsScore: 0, weScore: 0})
        }
    }
}
