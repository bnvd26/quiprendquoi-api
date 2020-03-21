const Party = require("../models/party");
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

router.get("/", (req, res) => {
	return Party.find().then(parties => res.send(parties));
});

router.post("/", (req, res) => {
	return new Party(req.body)
		.save()
		.then(party => res.send(party))
		.catch(err => res.status(400).send(err));
});

router.get("/:id", (req, res) => {
	return Party.findById(req.params.id)
		.then(party => res.send(party))
		.catch(() => res.status(404).send({ message: "No party found" }));
});

router.patch("/:id", (req, res) => {
	if (!Object.keys(req.body).length) {
		return res.status(400).send({ message: "No updates provided" });
	}

	return Party.findByIdAndUpdate(req.params.id, req.body)
		.then(() => res.send({ message: "Party updated" }))
		.catch(() => res.status(404).send({ message: "No party found" }));
});

router.delete("/:id", (req, res) => {
	return Party.findByIdAndDelete(req.params.id)
		.then(() => res.send({ message: "Party deleted" }))
		.catch(() => res.status(404).send({ message: "No party found" }));
});

router.post("/:id/items", (req, res) => {
	return Party.findByIdAndUpdate(req.params.id, {
		$push: { items: req.body },
	})
		.then(() => res.send({ message: "Item added" }))
		.catch(() => res.status(404).send({ message: "No party found" }));
});

router.patch("/:id/items/:itemId", (req, res) => {
	if (!Object.keys(req.body).length) {
		return res.status(400).send({ message: "No updates provided" });
	}

	const updates = {};
	if (req.body.name) updates["items.$.name"] = req.body.name;
	if (req.body.user) updates["items.$.user"] = req.body.user;

	return Party.updateOne(
		{ _id: req.params.id, "items._id": req.params.itemId },
		updates,
	)
		.then(() => res.send({ message: "Party updated" }))
		.catch(() => res.status(404).send({ message: "No party found" }));
});

router.delete("/:id/items/:itemId", (req, res) => {
	return Party.findByIdAndUpdate(req.params.id, {
		$pull: { items: { _id: req.params.itemId } },
	})
		.then(() => res.send({ message: "Item removed" }))
		.catch(() => res.status(404).send({ message: "No item found" }));
});

module.exports = router;
