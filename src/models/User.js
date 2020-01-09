const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    validate(value) {
      if (value < 0) throw new Error('Age must be a positive number')
    }
  }
})

module.exports = User = mongoose.model('user', UserSchema)
