import {decodeJSONNoAck} from './utils'
import { SET_TURN, 
    SET_BEGINNER, 
    RESET_PLI, 
    SET_HAND, 
    ASK_CALL, 
    ASK_CARD, 
    ADD_CALL, 
    ADD_CARD_TO_PLI,
    SET_BEST_CALL,
    SET_CURRENT_TEAM,
    SET_PLI_SCORES,
    SET_WINNING_PLI_POSITION,
    SET_SCORES,
    RESET_ALL_GAME,
    SET_BELOTE
} from '../store/mutations.type'

import router from '../router'
const newGameManager = (socket, store) => {
    store
    const obj = {
        recvHand(hand) {            
            store.commit(SET_TURN, "calls")
            store.commit(RESET_ALL_GAME)
            setTimeout(() => {
                store.commit(SET_HAND, hand)
            }, 1000)
        },
        recvStartGame(req) {
            req

            //FIXME: Maybe do this insinde vuex?
            router.push({path: 'card_mat'})
        },
        recvCall(req) {
            store.commit(ADD_CALL, req)
        },
        recvCard(card) {
            store.commit(ADD_CARD_TO_PLI, card)
        },
        recvBelote(req) {
            store.commit(SET_BELOTE, req)
        },
        recvBeginnerPos(req) {
            store.commit(SET_BEGINNER, req.position)
        },
        recvStartCards(req) {
            store.commit(SET_BEST_CALL, req.bestCall)
            store.commit(SET_CURRENT_TEAM, req.team)
            store.commit(SET_TURN, "cards")
        },
        recvPliScores(req) {
            store.commit(SET_PLI_SCORES, req)
        },
        recvScores(req) {
            store.commit(SET_SCORES, req)
        },
        recvWinningPliPosition(req) {
            store.commit(SET_WINNING_PLI_POSITION, req.position)
            setTimeout(() => store.commit(RESET_PLI), 1000)
            
        },
        recvEndOfGame(req) {
            req
            router.push({ path:'/end'})
        },
        recvAskCall(fn) {
            store.commit(ASK_CALL, fn)
        },
        recvAskCard(cards, fn) {
            store.commit(ASK_CARD, {
                availableCards: JSON.parse(cards),
                fn: fn
            })
        },
        leaveGame() {
            socket.emit('leave game', '')
        },
        close() {
            socket.close()
        },
        initHandlers() {
            const handlers = {
                'hand': this.recvHand,
                'start game': this.recvStartGame,
                'call': this.recvCall,
                'card': this.recvCard,
                'belote': this.recvBelote,
                'beginner pos': this.recvBeginnerPos,
                'cards': this.recvStartCards,
                'pli scores': this.recvPliScores,
                'winning position': this.recvWinningPliPosition,
                'scores': this.recvScores,
            }
            
            for (let key in handlers) {
                socket.on(key, decodeJSONNoAck(this, handlers[key]))
            }
            
            socket.on('end game', (req) => 
            { 

                req
                this.recvEndOfGame()
            })
            socket.on('ask call', (fn) => this.recvAskCall.apply(this, [fn]))
            socket.on('ask card', (req, fn) => this.recvAskCard.apply(this, [req, fn]))
        }
    }
    obj.initHandlers()
    return obj
}

export default newGameManager
