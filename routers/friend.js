const express = require('express')
const User = require('../models/user')
const auth = require('../middleware/auth')
const router = new express.Router()

router.post('/friends', auth, async (req, res) => {
  const user = await User.findOne({email:req.user.email})
  try {
      await user.friends.push({name: req.body.name, email: req.body.email})
      await user.save()
      res.status(200).send(user.friends[user.friends.length - 1])
  } catch (e) {
      res.status(400).send(e)
      console.log(e)
  }
})

module.exports = router