const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')

const User = require('../models/User')
const Task = require('../models/Task')

// @route POST /tasks
// @desc Create a task
// @access Public

router.post('/', auth, async (req, res) => {
  const ogTask = await Task.findOne({ description: req.body.description })
  if (ogTask) return res.status(400).json({ errors: [{ msg: 'Task already exists' }] })

  const task = new Task({
    ...req.body,
    owner: req.user._id
  })
  try {
    await task.save()
    res.status(201).send(task)
  } catch (err) {
    res.status(400).send(err)
  }
})

// @route GET /tasks
// @desc GET all tasks
// @access Public

// GET /tasks?completed=true
// GET /tasks?limit=10&offset=0
// GET /tasks?sortBy=createdAt:desc
router.get('', auth, async (req, res) => {
  const match = {}
  const sort = {}

  if (req.query.sortBy) {
    const parts = req.query.sortBy.split(':')
    sort[parts[0]] = parts[1] === 'desc' ? -1 : 1
  }
  const options = {
    limit: parseInt(req.query.limit),
    skip: parseInt(req.query.offset),
    sort
  }
  if (req.query.completed) {
    match.completed = req.query.completed === 'true'
  }
  try {
    const user = req.user
    await user.populate({
      path: 'tasks',
      match,
      options
    }).populate({
      path: 'taskCount'
    }).execPopulate()

    res.status(200).send({ tasks: user.tasks, count: user.taskCount })
  } catch (err) {
    res.status(500).send(err)
  }
})

// @route GET /tasks/:id
// @desc GET single task
// @access Public

router.get('/:id', auth, async (req, res) => {
  const _id = req.params.id
  try {
    const task = await Task.findOne({ _id, owner: req.user._id })
    if (!task) return res.status(404).send()

    res.status(200).send(task)
  } catch (err) {
    res.status(500).send(err)
  }
})

// @route PATCH /tasks/:id
// @desc PATCH update task
// @access Private - TODO

router.patch('/:id', auth, async (req, res) => {
  const updates = Object.keys(req.body)
  const allowedUpdates = ['description', 'completed']
  const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

  if (!isValidOperation) return res.status(400).send({ error: 'Invalid updates!' })
  try {
    const task = await Task.findOne({ _id: req.params.id, owner: req.user._id })
    if (!task) return res.status(404).json({ errors: [{ msg: 'Task not found' }] })

    updates.forEach((update) => task[update] = req.body[update])
    await task.save()
    res.status(200).send(task)
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ errors: [{ msg: 'Server Error' }] });
  }
})

// @route DELETE /tasks/:id
// @desc DELETE task
// @access Private - TODO

router.delete('/:id', auth, async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({ _id: req.params.id, owner: req.user._id })
    if (!task) return res.status(404).json({ errors: [{ msg: 'Task not found' }] })
    res.json({ msg: `Task removed` })
  } catch (err) {
    if (err.kind === 'ObjectId') return res.status(404).json({ msg: 'Task Not Found' })
    res.status(500).json({ errors: [{ msg: err }] })
  }
})

module.exports = router