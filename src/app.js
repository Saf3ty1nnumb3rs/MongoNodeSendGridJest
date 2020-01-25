const express = require('express')
const connectDB = require('./db/mongoose') // connects database

const authRouter = require('./routes/auth')
const userRouter = require('./routes/users')
const taskRouter = require('./routes/tasks')

const app = express()
connectDB()

app.use(express.json({ extended: false }))

app.use('/auth', authRouter)
app.use('/users', userRouter)
app.use('/tasks', taskRouter)

module.exports = app
