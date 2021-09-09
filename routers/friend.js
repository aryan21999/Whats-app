const express = require('express')
const friend = require('../models/friend')
const auth = require('../middleware/auth')
const router = new express.Router()

router.post('/friend', auth, async (req, res) => {
  const friend = new Friend({
    name: req.body.name,
    email: req.body.email,
    owner: req.user.email
  })
  try {
    await friend.save()
    res.status(201).send(friend)
} catch (e) {
    res.status(400).send(e)
}
})

module.exports = router