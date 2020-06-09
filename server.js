const app = require('./app')
const http = require('http')
const mongoose = require('mongoose')
const {userJoin,userLeft} = require('./controller/chat')

// const server = http.createServer(app)

mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        let server = app.listen(process.env.PORT || 3000, () => {
            console.log(`Server started at port ${process.env.PORT || 3000}`)
        })
        const io = require('./socket').init(server)
        io.on('connection', (socket) => {
            socket.on('join', ({uid}) => {
                let connectedUser = userJoin(uid)
                socket.broadcast.emit('joined', connectedUser)
            })

            socket.on('disconnect', ({uid}) => {
                let connectedUser = userLeft(uid)
                socket.broadcast.emit('left', connectedUser)
            })
        })
    }).catch(err => {
        console.log(err)
    })
