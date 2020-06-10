const mongoose = require('mongoose')

const chatShema = mongoose.Schema({
    to: {
        type: String,
        required: true
    },
    from: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    time: {
        type: Number,
        required: true
    }
})

const Chat = mongoose.model('chat', chatShema)

module.exports = Chat