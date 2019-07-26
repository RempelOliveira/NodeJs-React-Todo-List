const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

let User = new Schema
(
	{
		name:
		{
			type: String,
			required: true

		},

		email:
		{
			type: String,
			required: true

		},

		password:
		{
			type: String,
			required: true

		},

		avatar:
		{
			type: String

		},

		active:
		{
			type: Boolean,
			default: false

		},

		date:
		{
			type: Date,
			default: Date.now

		}

	}

);

module.exports = mongoose.model("User", User);