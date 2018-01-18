const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
  last_name: String,
  first_name: String,
})

const user = mongoose.model('User', userSchema)

module.exports = user
