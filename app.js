const express = require('express')
const bodyParser = require('body-parser')
require('dotenv').config()


const app = express()

app.use(express.static('public'))
app.use(bodyParser.raw())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))


app.get('/',(req,res)=>{
    res.status(200).send('<h1>Ninja Developer Server</h1>')
})

// Routes 

// const slackRoute = require('./routes/slack')
// app.use('/slack',slackRoute)

const uimsRoute = require('./routes/uims')
app.use('/uims',uimsRoute)

//===

app.listen(process.env.PORT|| 3000,()=>{
    console.log(`Server started at port ${process.env.PORT||3000}`)
})