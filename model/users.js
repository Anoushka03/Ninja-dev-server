const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
    uid: {
        type: String
    },
    password: {
        type: String
    }
})

userSchema.pre('save', (next) => {
    var user = this 

    if(!user.isModified('password')) return next()

    bcrypt.genSalt(10, (err, salt) => {
        if(err) return next(err)

        bcrypt.hash(user.password, salt, (err, hash) => {
            if(err) return next(err)

            user.password = hash

            next()
        })
    })
})

userSchema.methods.comparePassword = (candidatepassword, cb) => {
    bcrypt.compare(candidatepassword, this.password, (err, isMatch) => {
        if(err) return cb(err)

        cb(null, isMatch)
    })
}

const User = mongoose.model('user', userSchema)

module.exports = User