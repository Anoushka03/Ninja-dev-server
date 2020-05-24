const router = require('express').Router()
const {getAttendance} = require('../lib/python-func')
const {spawn} = require('child_process')
const {PythonShell} = require('python-shell')
const path = require('path')

router.route('/attendence')
    .get(async(req,res)=> {
        const {uid, password} = req.body
        const options = {
            args: [uid,password]
        }
        let pythonScript = new PythonShell(path.join(__dirname,'..','lib','python','attendence.py'),options)

        let pythonKiller = setTimeout(() => {
            pythonScript.childProcess.kill()
        }, 27500)


        pythonScript.on('message',(result) => {
            console.log(result)

            return res.status(200).json(JSON.parse(result.toString()))
        })

        pythonScript.end((err,signal, code) => {
            console.log("Python execution was stopped!");
            if (err){
                console.log("Error from Python", err);
                return res.status(404).send('Wrong data')
            }

            clearTimeout(pythonKiller)
        })
    })

module.exports = router