const mongoose = require('mongoose')

const TaskSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true
  },
  completed: {
    type: Boolean,
    required: true
  }
})

module.exports = Task = mongoose.model('task', TaskSchema)
