const express = require('express')
const connectDB = require('./config/mongoose') // connects database

const authRouter = require('./routes/auth')
const userRouter = require('./routes/users')
const taskRouter = require('./routes/tasks')

const app = express()

connectDB()

const PORT = process.env.PORT || 3000

app.use(express.json({ extended: false }))

app.use('/auth', authRouter)
app.use('/users', userRouter)
app.use('/tasks', taskRouter)

app.listen(PORT, () => {
  console.log(`App is live on port ${PORT}`)
})

// const Task = require('./models/Task')
// const User = require('./models/User')

// const main = async () => {
//   // const task = await Task.findById('5e20cb6e106ca929f876b42f')
//   // await task.populate('owner').execPopulate()
//   // console.log(task.owner)

//   const user = await User.findById('5e20c93c0c22153274e61c31')
//   await user.populate('tasks').execPopulate()
//   console.log(user.tasks)
// }

// main()

