const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const partyRoutes = require("./routes/party");
const mongoUrl = require("./mongo.js");

app.use(bodyParser());

app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header(
		"Access-Control-Allow-Headers",
		"Origin, X-Requested-With, Content-Type, Accept",
	);
	next();
});

app.use("/party", partyRoutes);

app.listen(3000, () => console.log(`API app listening on port 3000 !`));
