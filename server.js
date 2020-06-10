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

            socket.on('join', ({uid}) => {
                console.log(uid)
                console.log('conuser', uid)
                socket.broadcast.emit('joined',uid)
            })

            socket.on('disconnect', ({uid}) => {
                socket.broadcast.emit('left', uid)
            })

            socket.on('message', (message) =>{
                socket.broadcast.emit(message.to, message)
                /**
                 * Also we have to save the data in the backend.
                 */
                
            })
        })
    }).catch(err => {
        console.log(err)
    })
