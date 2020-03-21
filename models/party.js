const mongoose = require("mongoose");
const itemSchema = require("./item");

const partySchema = new mongoose.Schema({
	name: { type: String, required: true },
	author: { type: String, required: true },
	date: Date,
	items: [itemSchema],
});

module.exports = mongoose.model("Party", partySchema);
