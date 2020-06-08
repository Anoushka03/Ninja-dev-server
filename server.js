const app = require('./app')
const http = require('http')
const mongoose = require('mongoose')

// const server = http.createServer(app)

mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        let server = app.listen(process.env.PORT || 3000, () => {
            console.log(`Server started at port ${process.env.PORT || 3000}`)
        })
        const io = require('./socket').init(server)
        io.on('connection', (socket) => {
            console.log('Client connected') 
            socket.on('join',(message) => {
                console.log(message)
                socket.emit(message.from, message)
                socket.broadcast.emit('active',[message.from])
            })
        })
    }).catch(err => {
        console.log(err)
    })
