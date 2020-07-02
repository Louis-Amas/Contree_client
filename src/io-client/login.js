import axios from 'axios'

axios.defaults.adapter = require('axios/lib/adapters/http')

import {apiUrl} from './utils'
import { serverAddr } from './utils'
import io from 'socket.io-client'
const newLoginManager = (socket) => {
    const obj = {
        isConnected() {
            return this.connected
        },
        hasSecret() {
            return this.secret != ''
        },
        login(name, password) {
            const authBase64 = Buffer.from(`${name}:${password}`).toString('base64')
            const headers = {
                'Authorization': `Basic ${authBase64}`
            }
            return axios.get(`${apiUrl}/login/`, { headers: headers }).then(resp => {
                if (resp.status == 200) {
                    return Promise.resolve({ name: name, secret: resp.data.secret });
                }
                return Promise.reject('not working')
            })
        },
        disconnect() {
            socket.close()
            socket = io(serverAddr)
        },
        identify(name, secret) {
            return new Promise((resolve) => {
                socket.emit('identity', JSON.stringify({
                    name: name,
                    secret: secret 
                }), (resp) => {
                    resp = JSON.parse(resp)
                    return resolve(resp)
                });
            })
        }
    }

    return obj
}

export default newLoginManager
