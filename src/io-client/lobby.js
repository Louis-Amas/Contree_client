import { decodeJSONNoAck} from './utils'
import {SET_LOBBY} from '../store/mutations.type'

const newLobbyManager = (socket, store) => {
    store
    const obj = {
        joinLobby(lobbyName) {
            return new Promise((resolve, reject) => {
                socket.emit('join', JSON.stringify({
                    lobbyName: lobbyName
                }), (resp) => {
                    resp = JSON.parse(resp)
                    if (resp.error) {
                        return reject(resp)
                    }
                    resolve(resp)
                })
            })
        },
        choosePosition(position) {
            return new Promise((resolve, reject) => {
                socket.emit('choose position', JSON.stringify({
                    position: position
                }), (resp) => {
                    resp = JSON.parse(resp)
                    if (resp.error) {
                        return reject(resp)
                    }
                    resolve(resp)
                })
            })
        },
        leaveLobby(){
            return new Promise(resolve => {
                socket.emit('leave lobby', '', (resp) => {
                    console.log(resp)
                    return resolve()
                })
            })
        },
        recvLobby(req) {
            store.commit(SET_LOBBY, req)
        },
        initHandlers() {
            const handlers = {
                'lobby': this.recvLobby,
            }
            for (let key in handlers) {
                socket.on(key, decodeJSONNoAck(this, handlers[key]))
            }
            
        }
    }
    obj.initHandlers()
    return obj
}

export default newLobbyManager
