const mongoose = require('mongoose')
const User = require('../models/User')
const Task = require('../models/Task')

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false
})

const me = new User({
  name: '    Josh    ',
  email: `  joshuawsample@gmail.com`,
  adminUser: true,
  password: 'password!'
})

me.save().then(() => {
  console.log(me)
}).catch((error) => {
  console.log('Error!', error)
})

// const todo = new Task({
//   description: 'Say hello moon',
//   completed: false
// })

// todo.save().then(() => {
//   console.log(todo)
// }).catch((error) => {
//   console.log(error)
// })