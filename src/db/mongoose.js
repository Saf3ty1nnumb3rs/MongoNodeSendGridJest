const mongoose = require('mongoose')
const User = require('../models/User')
const Task = require('../models/Task')

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false
})
