const express = require('express')
const router = express.Router()

// const User = require('../models/User')
const Task = require('../models/Task')

// @route POST /tasks
// @desc Create a task
// @access Public

router.post('/', async (req, res) => {
  const { description } = req.body
  try {
    let task = await Task.findOne({ description })
    if (task) return res.status(400).json({ errors: [{ msg: 'Task already exists' }] })

    task = new Task(req.body)
    await task.save()
    res.status(201).send(task)
  } catch (err) {
    res.status(400).send(err)
  }
})

// @route GET /tasks
// @desc GET all tasks
// @access Public

router.get('/', async (req, res) => {
  try {
    const tasks = await Task.find()
    res.status(200).send(tasks)
  } catch (err) {
    res.status(500).send(err)
  }
})

// @route GET /tasks/:id
// @desc GET single task
// @access Public

router.get('/:id', async (req, res) => {
  try {
    const id = req.params.id
    const task = await Task.findById(id)
    if (!task) return res.status(404)


  } catch (err) {
    res.status(500).send(err)
  }
})

// @route PATCH /tasks/:id
// @desc PATCH update task
// @access Private - TODO

router.patch('/:id', async (req, res) => {
  const updates = Object.keys(req.body)
  const allowedUpdates = ['description', 'completed']
  const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

  if (!isValidOperation) return res.status(400).send({ error: 'Invalid updates!' })
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })

    if (!task) return res.status(404).json({ errors: [{ msg: 'Task not found' }] })

    res.status(200).send(task)
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ errors: [{ msg: 'Server Error' }] });
  }
})

// @route DELETE /tasks/:id
// @desc DELETE task
// @access Private - TODO

router.delete('/:id', async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete({ _id: req.params.id })
    const count = await Task.countDocuments({ completed: false })

    if (!task) return res.status(404).json({ errors: [{ msg: 'Task not found' }] })
    res.json({ msg: `Task removed, ${count} incomplete tasks remaining` })
  } catch (err) {
    if (err.kind === 'ObjectId') return res.status(404).json({ msg: 'Task Not Found' })
    res.status(500).json({ errors: [{ msg: err }] })
  }
})

module.exports = router