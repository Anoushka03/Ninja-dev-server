const router = require('express').Router()
const {getAttendance} = require('../lib/python-func')
const {spawn} = require('child_process')

router.route('/attendence')
    .get(async(req,res)=> {
        const {uid, password} = req.body
        let sub = spawn('python',['../lib/python/attendence.py',uid,password])

        sub.stdout.on('data', (data)=> {
            let result = JSON.parse(data.toString())
            console.log(result)
            res.status(200).json(result)
        })
    })

module.exports = router