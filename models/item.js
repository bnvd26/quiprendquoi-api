const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
	name: { type: String, required: true },
	user: { type: String, required: true },
	date: { type: Date},
});

module.exports = itemSchema;
