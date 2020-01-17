const jwt = require('jsonwebtoken')
const User = require('../models/User')


module.exports = async (req, res, next) => {

  try {
    const token = req.header('Authorization')
    if (!token) {
      return res.status(401).json({ msg: 'No token, authorization denied' })
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    const user = await User.findOne({ _id: decoded._id, 'auth.token': token })
    if (!user) throw new Error()

    req.token = token
    req.user = user
    next()
  } catch (err) {
    return res.status(401).json({ msg: 'Token is not valid' })
  }
}