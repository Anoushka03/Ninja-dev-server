const app = require('./app')
const socketio = require('socket.io')
const http = require('http')

const server = http.createServer(app)

const io = socketio(server)

io.on('connection', (socket) => {
    console.log('socket starting')

    io.on('disconnect', () => {
        console.log('Socket Closing')
        io.off()
    })
})

server.listen(process.env.PORT|| 3000,()=>{
    console.log(`Server started at port ${process.env.PORT||3000}`)
})