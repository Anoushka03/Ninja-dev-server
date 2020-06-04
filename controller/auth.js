// importing modules 
const jwt = require('jsonwebtoken')
const User = require('../model/users')


exports.login = async (req,res) => {
    const user = {
        email: req.user.username
    }

    let token = jwt.sign(user,process.env.JWT_SECRET)

    return res.status(200).json({token: token, message: "Login Successfull"})
}

exports.signup = async (req,res) => {
    const {username, password} = req.body
    
    try {
        const user = await User.findOne({username: username})

        if(user){
            return res.status(401).json({message: 'Username already taken'})
        }

        const newUser = new User({
            username: username,
            password: password
        })

        await newUser.save()

        let token = jwt.sign({username: username}, process.env.JWT_SECRET)

        return res.status(200).json({token: token, message: 'Signup Successfull'})

    } catch (error) {
        return res.status(404).json(error)
    }
}