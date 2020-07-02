const server = 'localhost'
const port = '8081'
const serverAddr = `http://${server}:${port}`
const apiUrl = `${serverAddr}/api`


const decodeJSONNoAck = (t, fun) => {
    return (req) => {
        const decoded = JSON.parse(req)
        fun.apply(t, [decoded])
    }
}

export {
    decodeJSONNoAck,
    server,
    serverAddr,
    apiUrl
}