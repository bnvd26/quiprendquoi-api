const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
	name: { type: String, required: true },
	user: { type: String, required: true },
	date: Date.now(),
});

module.exports = itemSchema;
