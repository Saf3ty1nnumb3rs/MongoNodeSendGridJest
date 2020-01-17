const express = require('express')
const connectDB = require('./db/mongoose') // connects database

const authRouter = require('./routes/auth')
const userRouter = require('./routes/users')
const taskRouter = require('./routes/tasks')

const app = express()
connectDB()
const PORT = process.env.PORT

app.use(express.json({ extended: false }))

app.use('/auth', authRouter)
app.use('/users', userRouter)
app.use('/tasks', taskRouter)

app.listen(PORT, () => {
  console.log(`App is live on port ${PORT}`)
})
