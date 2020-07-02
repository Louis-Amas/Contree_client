import io from 'socket.io-client'
import { serverAddr } from './utils'
import newLoginManger from './login'
import newLobbyManager from './lobby'
import newGameManager from './game'


const services = {}

const initAllClient = (store) => {
    let socket = io(serverAddr)
    services.login = newLoginManger(socket)
    services.lobby = newLobbyManager(socket, store)
    services.game  = newGameManager(socket, store)

    return services
}

const getLoginManager = () => {
    return services.login
}

const getLobbyManager = () => {
    return services.lobby
}

const getGameManager = () => {
    return services.game
}

export {
    initAllClient,
    getLoginManager,
    getLobbyManager,
    getGameManager,
}
