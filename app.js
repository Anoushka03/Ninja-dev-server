const express = require('express')
const bodyParser = require('body-parser')
require('dotenv').config()
const cors = require('cors')
require('./passport')
const passport = require('passport')

const app = express()

app.use(express.static('public'))
app.use(bodyParser.raw())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(cors())
app.use(passport.initialize())


app.get('/',(req,res)=>{
    res.status(200).send('<h1>Ninja Developer Server</h1>')
})

/** Routes */

// Auth route
const authRoute = require('./routes/auth')
app.use('/auth',authRoute)

// Chat Route
const chatRoute = require('./routes/chat')
app.use('/cuchat',passport.authenticate('jwt',{session: false}),chatRoute)


module.exports = app