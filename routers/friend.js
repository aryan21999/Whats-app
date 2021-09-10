const express = require('express')
const User = require('../models/user')
const auth = require('../middleware/auth')
const router = new express.Router()

router.post('/addFriends', auth, async (req, res) => {
  const user = await User.findOne({email:req.user.email})
  try {
      await user.friend.push({name: req.body.name, email: req.body.email})
      await user.save()
      res.status(200).send(user.friends[user.friends.length - 1])
      console.log(user.friends)
      console.log(user.friends.length)
  } catch (e) {
      res.status(400).send(e)
      console.log(e)
  }
})
router.get('/list', auth, async (req, res) => {
  // console.log(auth)
  const user = await User.findOne({email:req.user.email})
  try {
      // const friend = await Friend.find({ owner: req.user.email })
      res.send(user.friends)
  } catch (e) {
      res.status(500).send(e)
      console.log(e)
  }
})

router.get('/friends/:id', auth, async (req, res) => {
  const _id = req.params.id
  console.log(_id)
  try {
    console.log(req.user.email)
    const friend = await Friend.findById({ _id, owner: req.user.email })
    console.log(friend) 

      if (!friend) {
          return res.status(404).send()
      }
      res.send(friend)
  } catch (e) {
      res.status(500).send(e)
      console.log(e)
  }
})

// router.get('/list', auth, async (req,res) => {
//   try{
//       const allFriends = await Friends.find()
//       res.status(200).send(allFriends)
//   } catch (e) {
//       res.status(500).send(e)
//   }
// })

module.exports = router