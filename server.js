const app = require('./app')
const socketio = require('socket.io')
const http = require('http')
const mongoose = require('mongoose')

const server = http.createServer(app)

const io = socketio(server)

io.on('connection', (socket) => {
    console.log('socket starting')

    io.on('disconnect', () => {
        console.log('Socket Closing')
        io.off()
    })
})

mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        server.listen(process.env.PORT || 3000, () => {
            console.log(`Server started at port ${process.env.PORT || 3000}`)
        })
    }).catch(err => {
        console.log(err)
    })
