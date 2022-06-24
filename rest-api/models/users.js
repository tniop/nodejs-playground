const mongoose = require("mongoose");
const autoIncrement = require("mongoose-auto-increment");
autoIncrement.initialize(mongoose.connection);

const users = new mongoose.Schema({
  id: {
    type: Number,
    unique: true,
    default: 0,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

users.plugin(autoIncrement.plugin, {
  model: "users",
  field: "id",
  startAt: 1,
  increment: 1,
});

module.exports = mongoose.model("users", users);
