/**
 * Create functions to respond to different features of chat
 */

// importing modules 
const Chat = require('../model/chat')


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

