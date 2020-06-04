const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const User = require('./model/users')
const passportJWT = require('passport-jwt')
const JWTStrategy = passportJWT.Strategy
const ExtractJWT = passportJWT.ExtractJwt

passport.use(new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password'
}, async (username, password, cb) => {
    try {
        let user = await User.findOne({ username: username })

        if (!user) return cb(null, false, { message: 'Incorrect username' })

        if (user.password !== password) return cb(null, false, { message: 'Incorrect Password' })

        return cb(null, user, { message: 'Login successfull' })
    } catch (error) {
        cb(error)
    }
}))

passport.use(new JWTStrategy({
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET
}, async (jwtPayload, cb) => {
    try {
        const user = await User.findOne({ username: jwtPayload.username })
        cb(null, user)
    }
    catch (err) {
        cb(err)
    }
}))