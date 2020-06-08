const router = require('express').Router()
const Chat = require('../model/chat')


router.route('/chats')
    .get(async (req, res) => {
        /**
         * Here we will get authorized uid 
         * then get all chat related data and send them 
         */
        let { uid } = req.user

        try {
            let sent = await Chat.find({ from: uid })

            let recieved = await Chat.find({ to: uid })

            let response = { sent: sent, recieved: recieved }

            return res.status(200).json(response)
        } catch (error) {
            return res.status(404).json(error)
        }

    })

module.exports = router