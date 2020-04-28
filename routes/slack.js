const router = require('express').Router()

router.post('/check',(req,res)=>{
    return res.send("Hello")
})

module.exports = router 