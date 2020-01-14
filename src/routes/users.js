const express = require('express')

const router = express.Router()
const User = require('../models/User')
// const Task = require('../models/Task')

// @route POST /users
// @desc Create a user
// @access Public

router.post('/', async (req, res) => {
  const { email } = req.body;

  try {
    let user = await User.findOne({ email })
    if (user) return res.status(400).json({ errors: [{ msg: 'User already exists' }] })

    user = new User(req.body)
    await user.save()
    res.status(201).send(user)
  } catch (err) {
    console.error(err.message)
    res.status(400).send(err)
  }
})

// @route GET /users
// @desc GET all users
// @access Public

router.get('/', async (req, res) => {
  try {
    const users = await User.find()
    res.status(200).send(users)
  } catch (err) {
    res.status(500).send(err)
  }
})

// @route PATCH /users/:id
// @desc PATCH single user update by id
// @access Public

router.patch('/:id', async (req, res) => {
  const updates = Object.keys(req.body)
  const allowedUpdates = ['name', 'email', 'password', 'age']
  const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

  if (!isValidOperation) return res.status(400).send({ error: 'Invalid updates!' })
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
    if (!user) return res.status(404).send()

    res.status(200).send(user)
  } catch (err) {
    res.status(400).send(err)
  }
})

// @route GET /users/:id
// @desc GET single user by id
// @access Public

router.get('/:id', async (req, res) => {
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

router.delete('/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id)
    if (!user) return res.status(404).send()

    res.status(200).send()
  } catch (err) {
    res.status(500).send()
  }
})

module.exports = router

