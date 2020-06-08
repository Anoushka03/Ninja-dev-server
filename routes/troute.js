const router = require('express').Router() 
const Test = require('../model/test')


router.route('/check')
    .get(async (req,res) => {
        try {
            const doc = await Test.find({})

            return res.status(200).json(doc)
        } catch (error) {
            return res.status(404).json(error)
        }
    })
    .post(async (req,res) => {
        const {name} = req.body

        try {
            const doc = new Test({
                name: name
            })
            let response = await doc.save()

            return res.status(200).json(response)
        } catch (error) {
            return res.status(404).json(error)
        }
    })

module.exports = router