const {spawn} = require('child_process')

exports.getAttendance = async ({uid,password}) => {
    const attendance = spawn('python',["./python/attendence.py",uid,password])

    attendance.stdout.once('data', (data) => {
        console.log(data.toString())
        return cb.json(JSON.parse(data.toString()))
    })
}