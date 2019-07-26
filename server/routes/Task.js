const passport =
	require("passport");

const express =
	require("express");

const controllers =
	require("../controllers/Task");

const Task =
	express.Router();

const multer =
	require("multer");

const upload = multer
({
	limits :
	{
		fileSize: 1024 * 1024 * 5 // = 5mb

	},

	fileFilter: (req, file, cb) =>
	{
		if(file.mimetype === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")
		{
			cb(null, true);

		}
		else
			cb({success: false, message: "Invalid file type. Only .xlsx excel files are allowed."}, false);

	}

}).single("excel");

function authenticate(req, res, method)
{
	const auth =
		req.headers.authorization;

	if(auth != null)
	{
		passport.authenticate("jwt", {session: false}, (err, user, info) =>
		{
			if(user)
			{
				method(req, res);

			}
			else
				res.status(401).send("Unauthorized");

		})(req, res, () => {});

	}
	else
		method(req, res);

}

Task.route("/")

	.get ((req, res) => authenticate(req, res, controllers.getAll))
	.post((req, res) => authenticate(req, res, controllers.create));

Task.route("/:id")

	.get   ((req, res) => authenticate(req, res, controllers.getById))
	.put   ((req, res) => authenticate(req, res, controllers.update))
	.delete((req, res) => authenticate(req, res, controllers.delete));

Task.route("/upload")
	.post(passport.authenticate("jwt", {session: false}), (req, res) => upload(req, res, (err) =>
	{
		if(err)
		{
			res.status(400).send({general: err.code == "LIMIT_FILE_SIZE" ? "File too large, max 5mb." : err.message});

		}
		else if(!req.file)
		{
			res.status(500).send({general: "Excel file is required."});

		}
		else
			controllers.upload(req, res);

	}));

module.exports = Task;