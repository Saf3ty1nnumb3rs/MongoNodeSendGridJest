const express = require('express')
const auth = require('../middleware/auth')
const router = express.Router()
const User = require('../models/User')
// const Task = require('../models/Task')

// @route POST /users
// @desc Create a user
// @access Public

router.post('/', async (req, res) => {
  try {
    const user = new User(req.body)
    const token = await user.generateAuthToken()
    await user.save()
    res.status(201).send({ user, token })
  } catch (err) {
    console.error(err.message)
    res.status(400).send(err)
  }
})

// @route GET /users
// @desc GET all users
// @access Public

router.get('/', auth, async (req, res) => {
  try {
    const users = await User.find()
    res.status(200).send(users)
  } catch (err) {
    res.status(500).send(err)
  }
})

// @route GET /users/me
// @desc GET current user
// @access Private

router.get('/me', auth, async (req, res) => {
  res.send(req.user)
})

// @route PATCH /users/:id
// @desc PATCH single user update by id
// @access Public

router.patch('/me', auth, async (req, res) => {
  const updates = Object.keys(req.body)
  const allowedUpdates = ['name', 'email', 'password', 'age']
  const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

  if (!isValidOperation) return res.status(400).send({ error: 'Invalid updates!' })
  try {
    updates.forEach((update) => req.user[update] = req.body[update])
    await req.user.save()

    res.status(200).send(req.user)
  } catch (err) {
    res.status(400).send(err)
  }
})

// @route GET /users/:id
// @desc GET single user by id
// @access Public

router.get('/:id', auth, async (req, res) => {
  try {
    const id = req.params.id
    const user = await User.findById(id)
    if (!user) {
      return res.status(404).send()
    }
    res.status(200).send(user)
  } catch (err) {
    res.status(500).send(err)
  }
})

// @route DELETE /users/:id
// @desc DELETE single user by id
// @access Public

router.delete('/me', auth, async (req, res) => {
  try {
    // const user = await User.findByIdAndDelete(req.user._id)

    await req.user.remove()
    res.status(200).send(req.user)
  } catch (err) {
    res.status(500).send()
  }
})

module.exports = router

