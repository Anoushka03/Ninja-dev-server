const router = require('express').Router()
const passport = require('passport')
const {
    login
} = require('../controller/auth')


router.route('/login')
    .get()
    .post(passport.authenticate('local',{session: false}), login)


module.exports = router