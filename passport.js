const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const User = require('./model/users')

passport.use(new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password'
},async (username, password, cb) => {
    try {
        let user = await User.findOne({username: username})

        if(!user) return cb(null, false, {message: 'Incorrect username'})

        if(user.password !== password) return cb(null, false, {message: 'Incorrect Password'})

        return cb(null, user, {message: 'Login successfull'})
    } catch (error) {
        cb(error)
    }
}))