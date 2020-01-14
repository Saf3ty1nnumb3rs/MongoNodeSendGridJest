const express = require('express')
require('./db/mongoose') // connects database

const userRouter = require('./routes/users')
const taskRouter = require('./routes/tasks')

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json({ extended: false }))

app.use('/users', userRouter)
app.use('/tasks', taskRouter)

app.listen(PORT, () => {
  console.log(`App is live on port ${PORT}`)
})
