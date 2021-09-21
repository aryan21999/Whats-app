const express = require('express')
const Chat = require('../models/chat')
const auth = require('../middleware/auth')
const db = require('../db/mongoose')
const router = new express.Router()

router.post('/chat', auth, async (req, res) => {
    const chat = new Chat({
        sender: req.user.email,
        receiver: req.body.friend,
        message: req.body.message
    })
    try {
        await chat.save()
        res.status(201).send(chat)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.get('/chatList', auth, async (req,res) => {
    try{
        const chat = await Chat.find()
        res.status(200).send(chat)
    } catch (e) {
        res.status(500).send(e)
    }
})


module.exports = router