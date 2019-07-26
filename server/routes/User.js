const passport =
	require("passport");

const express =
	require("express");

const controllers =
	require("../controllers/User");

const User =
	express.Router();

const multer = require("multer");
const path   = require("path");

const upload = multer
({
	limits :
	{
		fileSize: 1024 * 1024 * 5 // = 5mb

	},

	fileFilter: (req, file, cb) =>
	{
		if(file.mimetype === "image/jpeg" || file.mimetype === "image/png")
		{
			cb(null, true);

		}
		else
			cb({success: false, message: "Invalid file type. Only .jpg, .jpeg or .png image files are allowed."}, false);

	},

	storage: multer.diskStorage
	({
		destination: (req, file, cb) =>
		{
			cb(null, "./public/uploads");

		},

		filename: (req, file, cb) =>
		{
			cb(null, Date.now() + path.extname(file.originalname));

		}

	})

}).single("avatar");

User.route("/register")
	.post((req, res) => upload(req, res, (err) =>
	{
		if(err)
		{
			res.status(400).send({general: err.code == "LIMIT_FILE_SIZE" ? "File too large, max 25mb." : err.message});

		}
		else
			controllers.register(req, res);

	}));

User.route("/login")
	.post(controllers.login);

User.route("/:id")
	.put(passport.authenticate("jwt", {session: false}), (req, res) => upload(req, res, (err) =>
	{
		if(err)
		{
			res.status(400).send({general: err.code == "LIMIT_FILE_SIZE" ? "File too large, max 25mb." : err.message});

		}
		else
			controllers.update(req, res);

	}));

User.route("/activate/:id")
	.put(controllers.activate);

User.route("/:id")
	.get(controllers.getById);

module.exports = User;