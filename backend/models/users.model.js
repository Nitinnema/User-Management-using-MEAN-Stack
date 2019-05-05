const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  username: { type: String, require: true },
  address: { type: String, require: true },
  contact: { type: String, require: true },
  email: { type: String, require: true }
});

module.exports = mongoose.model('Users', userSchema);
