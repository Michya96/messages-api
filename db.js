require("dotenv").config();
const mongoose = require("mongoose");
// const AutoIncrement = require('mongoose-sequence')(mongoose);
mongoose.connect(process.env.MONGODB_URI);

// Creating user schema for database
const messageSchema = new mongoose.Schema({
	message: { type: String, unique: false },
	author: { type: String, maxlength: 50 },
	room: { type: String, maxlength: 30 },
	date: { type: Date, default: Date.now() },
});

const userSchema = new mongoose.Schema({
	username: { type: String, unique: true, maxlength: 18 },
});

module.exports.Message = mongoose.model("Message", messageSchema);
module.exports.User = mongoose.model("chatters", userSchema);
