const express = require('express')

const router = express.Router()
const User = require('../models/User')
const auth = require('../middleware/auth')


router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findByCredentials(email, password)
    const token = await user.generateAuthToken()

    res.status(200).send({ user: user, token })
  } catch (err) {
    res.status(401).send(err)
  }
})

router.post('/logout', auth, async (req, res) => {
  try {
    req.user.auth.filter((token) => token.token !== req.token)
    await req.user.save()
    res.send()
  } catch (err) {
    res.status(500).send()
  }
})

router.post('/logout_all', auth, async (req, res) => {
  try {
    req.user.auth = []
    await req.user.save()
    res.send()
  } catch (err) {
    res.status(500).send()
  }
})

module.exports = router
