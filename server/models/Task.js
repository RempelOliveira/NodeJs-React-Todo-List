const mongoose = require("mongoose");

const User   = require("../models/User");
const Schema = mongoose.Schema;

let Task = new Schema
(
	{
		title:
		{
			type: String,
			required: true

		},

		completed:
		{
			type: Boolean,
			default: false

		},

		details:
		{
			type: String

		},

		creation_date:
		{
			type: Date,
			default: Date.now()

		},

		conclusion_date:
		{
			type: Date

		},

		remember_me_date:
		{
			type: Date

		},

		user:
		{
			ref: User,
			type: Schema.Types.ObjectId,
			default: null

		}

	}

);

module.exports = mongoose.model("Task", Task);