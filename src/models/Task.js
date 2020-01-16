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
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  }
},
  {
    timestamps: true
  })

module.exports = Task = mongoose.model('task', TaskSchema)
