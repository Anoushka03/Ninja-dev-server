const router = require('express').Router()
const Chat = require('../model/chat')
const _ = require('lodash')


router.route('/chats')
    .get(async (req, res) => {
        /**
         * Here we will get authorized uid 
         * then get all chat related data and send them 
         */
        let { uid } = req.query

        try {
            let sent = await Chat.find({ from: uid })

            let recieved = await Chat.find({ to: uid })

            let response = _.concat(sent, recieved)

            return res.status(200).json(response)
        } catch (error) {
            return res.status(404).json(error)
        }

    })

module.exports = router