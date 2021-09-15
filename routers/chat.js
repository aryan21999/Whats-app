const express = require('express')
const Chat = require('../models/chat')
const auth = require('../middleware/auth')
const db = require('../db/mongoose')
const router = new express.Router()

router.post('/chat', (req, res) => {
    console.log('message')
    // const chat = new Chat({
    // })
    db.collection(user).save( { _id: _id, name: "lucky", message: 'Hi..' } )
    console.log(_id)
})

module.exports = router