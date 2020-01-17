const express = require('express')
const auth = require('../middleware/auth')
const multer = require('multer')
const sharp = require('sharp')
const router = express.Router()
const User = require('../models/User')
const { sendWelcomeEmail, sendCancellationEmail } = require('../mail/account')

// @route POST /users
// @desc Create a user
// @access Public

router.post('/', async (req, res) => {
  const oldUser = await User.findOne({ email: req.body.email })
  console.log(oldUser)
  if (oldUser) return res.status(400).send({ error: { msg: 'Please select a unique email for login ' } })
  const user = new User(req.body)
  try {
    await user.save()
    sendWelcomeEmail(user.email, user.name)
    const token = await user.generateAuthToken()
    res.status(201).send({ user, token })
  } catch (err) {
    res.status(400).send({ err: err.msg })
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
    res.status(500).send({ err: err.msg })
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
    res.status(400).send({ err: err.msg })
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
    res.status(500).send({ err: err.msg })
  }
})

// @route DELETE /users/:id
// @desc DELETE single user by id
// @access Public

router.delete('/me', auth, async (req, res) => {
  try {
    // const user = await User.findByIdAndDelete(req.user._id)

    await req.user.remove()
    sendCancellationEmail(req.user.email, req.user.name)
    res.status(200).send(req.user)
  } catch (err) {
    res.status(500).send({ err: err.msg })
  }
})

// @route POST /users/me/avatar
// @desc Create a user avatar
// @access Private

// file filter and upload through multer
const upload = multer({
  limits: {
    fileSize: 1000000
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(new Error('Please upload an image of type jpg, jpeg, or png'))
    }
    cb(undefined, true)
  }
})

router.post('/me/avatar', auth, upload.single('avatar'), async (req, res) => {
  const buffer = await sharp(req.file.buffer).resize({ width: 250, height: 250 }).png().toBuffer()
  req.user.avatar = buffer
  await req.user.save()
  res.send()
}, (error, req, res, next) => {
  res.status(400).send({ error: error.message })
})

// @route DELETE /me/avatar
// @desc DELETE users own avatar
// @access Private

router.delete('/me/avatar', auth, async (req, res) => {
  req.user.avatar = undefined
  await req.user.save()
  res.send()
})

// @route GET /users/:id/avatar
// @desc GET single user avatar
// @access Public

router.get('/:id/avatar', async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
    if (!user || !user.avatar) {
      throw new Error()
    }
    res.set('Content-Type', 'image/png')
    res.send(user.avatar)
  } catch (e) {
    res.status(404).send()
  }
})

module.exports = router
