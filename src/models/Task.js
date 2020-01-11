const mongoose = require('mongoose')

const TaskSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true,
    trim: true
  },
  completed: {
    type: Boolean,
    default: false
  }
})

module.exports = Task = mongoose.model('task', TaskSchema)
