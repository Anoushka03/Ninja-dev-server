const mongoose = require('mongoose')

const userShema = mongoose.Schema({
    username: {
        type: String
    },
    password: {
        type: String
    }
})


const User = mongoose.model('user', userShema)

module.exports = User