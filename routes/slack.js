const router = require('express').Router()

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

module.exports = router 