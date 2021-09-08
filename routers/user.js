const express = require('express')
const User = require('../models/user')
const auth = require('../middleware/auth')
const router = new express.Router()

router.post('/reg', async (req, res) => {
    const user = new User(req.body)

    try {
        await user.save()
        res.status(201).send(user)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.post('/reg/login', async (req, res) => {
    try {
        const user = await User.findOne({email:req.body.email, password:req.body.password})
        const token = await user.generateAuthToken()
        res.send({ user, token })
    } catch (e) {
        console.log(e)
        res.status(400).send()  
    }
})

router.get('/reg/me', auth, async (req, res) => {
    res.send(req.user)
 })

router.patch('/reg/me', auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'password']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    try {
        updates.forEach((update) => req.user[update] = req.body[update])
        await req.user.save()
        res.send(req.user)
        console.log(user)

    } catch (e) {
        res.status(400).send(e)
    }
})

router.post('/reg/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })
        await req.user.save()

        res.send("Logged Out")
    } catch (e) {
        res.status(500).send()
    }
})

router.patch('/reg/forget', async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['password']
    try {
        await User.update({password: req.body.password})
        const user  = await User.findOne({email: req.body.email})
        console.log(user)
        // console.log(req.body.email)
        // console.log(req.body.password)
        res.status(200).send(user)
        if (!user)
        return res.status(400).send("User With Given Email Doesn't Exist!")
     } catch (error) {
            console.log(error)
            res.status(500).send(error)
        }
})

module.exports = router
