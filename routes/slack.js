const router = require('express').Router()
const bot = require('../lib/slackbot')

router.post('/check',(req,res)=>{
    let data = {
        response_type: 'in_channel',
        text: 'Hello'
    }
    return res.json(data)
})

router.post('/time',(req,res)=>{
    let date = new Date()
    
    return res.send(date.toUTCString)
})

router.post('/testing',async(req,res)=>{
    console.log(req.body)
    let data = {
        response_type: 'in_channel',
        text: 'Testing successfull'
    }
    const result = await bot.client.users.list({
        token: process.env.BOT_TOKEN
    })
    console.log(result.members)
    return res.json(data)
})

module.exports = router 