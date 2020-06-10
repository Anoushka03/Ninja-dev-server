/**
 * Create functions to respond to different features of chat
 */

// importing modules 
const Chat = require('../model/chat')
const _ = require('lodash')

const connecteduser = []

exports.userJoin = uid => {
    connecteduser.push(uid)
    return connecteduser
}

exports.userLeft = uid => {
    let connecteduser = _.remove(connecteduser, (n) => {
        return n === uid
    })

    return connecteduser
}

exports.createMessage = async (to, from, message) => {
    
    try {
        const chat = Chat({
            to: to,
            from: from,
            message: message
        })
        let res = await chat.save()

        return res
    } catch (error) {
        throw new Error(error)
    }
}

