// importing modules 
const jwt = require('jsonwebtoken')
const {User,createUser} = require('../model/users')
const { UimsApi } = require('uims-api')


exports.login = async (req, res) => {
    const user = {
        email: req.user.username
    }

    let token = jwt.sign(user, process.env.JWT_SECRET)

    return res.status(200).json({ token: token, message: "Login Successfull" })
}

exports.signup = async (req, res) => {
    let { uid, uims_password, password } = req.body
    console.log(uid, uims_password, password)

    let uimsApi = new UimsApi()

    try {

        let isValid = await uimsApi.login({ uid: uid, password: uims_password })

        console.log(isValid)

        if(!isValid) return res.status(401).json({message: 'wrong uid or password'})
        
        let response = await createUser(uid, password)

        let token = jwt.sign({id: response._id}, process.env.JWT_SECRET)

        return res.status(200).json({token: token, uid: uid, message: 'Signup successfull'})

    } catch (e) {
        console.log(e)
        return res.status(404).json(e)
    }
}