const router = require('express').Router()
const passport = require('passport')
const {
    login,
    signup
} = require('../controller/auth')


router.route('/login')
    .get()
    .post(passport.authenticate('local',{session: false}), login)

router.route('/signup')
    .get()
    .post(signup)


module.exports = router