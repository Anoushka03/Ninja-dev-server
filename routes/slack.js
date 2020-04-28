const router = require('express').Router()

router.post('/check',(req,res)=>{
    let data = {
        response_type: 'in_channel',
        text: 'Hello'
    }
    return res.json(data)
})

module.exports = router 