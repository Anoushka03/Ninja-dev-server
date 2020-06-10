// importing modules 
const jwt = require('jsonwebtoken')
const User = require('../model/users')
const { UimsApi } = require('uims-api')


exports.login = async (req, res) => {
    const user = {
        id: req.user._id
    }

    let token = jwt.sign(user, process.env.JWT_SECRET)

    return res.status(200).json({ token: token,uid: req.user.uid, message: "Login Successfull" })
}

exports.signup = async (req, res) => {
    let { uid, uims_password, password } = req.body

    let uimsApi = new UimsApi()

    try {

        const user = await User.findOne({uid: uid})

        if(user) return res.status(401).json({message: 'Uid already exists login instead'})

        // let isValid = await uimsApi.login({ uid: uid, password: uims_password })
        // console.log('signup-uims-api', isValid)

        // if(!isValid) return res.status(401).json({message: 'wrong uid or password'})
        
        let newUser = new User({
            uid: uid,
            password: password
        })

        let response = await newUser.save()

        let token = jwt.sign({id: response._id}, process.env.JWT_SECRET)

        return res.status(200).json({token: token, uid: uid, message: 'Signup successfull'})

    } catch (e) {
        console.log(e)
        return res.status(404).json(e)
    }
}