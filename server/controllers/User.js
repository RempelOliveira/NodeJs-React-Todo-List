const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/User");

const keys = require("../../config/keys.config");
const SendMail = require("../../config/nodemailer");

const fs = require("fs");
const isEmpty =	require("is-empty");

const cron =
	require("node-cron");

const validateRegister = require("../validation/Register");
const validateLogin = require("../validation/Login");

let jobs = [];

module.exports =
{
	register: (req, res) =>
	{
		const { errors, isValid } = validateRegister({...req.body});

		if(!isValid)
		{
			try
			{
				fs.unlinkSync("./public/uploads/" + req.file.filename);

			}
			catch(err){}

			return res.status(400).json(errors);

		}

		User.findOne({ email: req.body.email })
			.then(user =>
			{
				if(user)
				{
					res.status(400).json({email: "Email already exists"});

				}
				else
				{
					const newUser = new User
					({
						name	: req.body.name,
						email	: req.body.email,
						password: req.body.password,
						avatar  : req.file ? req.file.filename : ""

					});

					bcrypt.genSalt(10, (err, salt) =>
					{
						bcrypt.hash(newUser.password, salt, (err, hash) =>
						{
							if(err)
								throw err;

							newUser.password = hash;
							newUser.save()
								.then(user =>
								{
									const payload =
									{
										id	  : user.id,
										name  : user.name,
										email : user.email,
										avatar: user.avatar,
										active: user.active

									};

									jwt.sign(payload, keys.secretOrKey, {expiresIn: 31556926}, (err, token) =>
									{
										SendMail.send
										({
											template: "SignUp", message: {to: user.email, subject: "Welcome to TODO app!"}, locals: {name: user.name, link: "http://localhost:3000/user/activate/" + user.id}});

										jobs[user.id] = cron.schedule("00 30 13 * * *", () => // will execute on every 13:30
										{
											User.findById(user.id, {id: true, active: true, mail: true, name: true})
												.then(user =>
												{
													if(user && user.active == false)
													{
														SendMail.send
														({
															template: "Activation/Remember", message: {to: user.email, subject: "Activate your registration in the TODO application!"}, locals: {name: user.name, link: "http://localhost:3000/user/activate/" + user.id}});

													}
													else
														jobs[user.id].stop();

												})
												.catch(() =>
												{
													jobs[user.id].stop();

												});

										});

										res.status(200).json({token: "Bearer " + token});

									});

								})
								.catch(err =>
								{
									res.status(400).json({general: "An internal error occurred. Please contact your system administrator"});

								});

						});

					});

				}

			})
			.catch(err =>
			{
				res.status(400).json({general: "An internal error occurred. Please contact your system administrator"});

			});

	},

	login: (req, res) =>
	{
		const { errors, isValid } = validateLogin({...req.body});

		if(!isValid)
			return res.status(400).json(errors);

		const email    = req.body.email;
		const password = req.body.password;

		User.findOne({email})
			.then(user =>
			{
				if(!user)
					return res.status(404).json({emailnotfound: "Email not found"});

				bcrypt.compare(password, user.password)
					.then(isMatch =>
					{
						if(isMatch)
						{
							const payload =
							{
								id	  : user.id,
								name  : user.name,
								email : user.email,
								avatar: user.avatar,
								active: user.active

							};

							jwt.sign(payload, keys.secretOrKey, {expiresIn: 31556926}, (err, token) =>
							{
								res.status(200).json({token: "Bearer " + token});

							});

						}
						else
							res.status(400).json({passwordincorrect: "Password incorrect"});

					})
					.catch(err =>
					{
						res.status(400).json({general: "An internal error occurred. Please contact your system administrator"});

					});

			})
			.catch(err =>
			{
				res.status(400).json({general: "An internal error occurred. Please contact your system administrator"});

			});

	},

	update: (req, res) =>
	{
		let update = (req, res) =>
		{
			User.findOne({_id: req.params.id}, {avatar: true, password: true})
				.then(user =>
				{
					if(req.file)
					{
						try
						{
							fs.unlinkSync("./public/uploads/" + user.avatar);

						}
						catch(err){}

					}

					const updateUser =
					{
						name	: req.body.name,
						email	: req.body.email,
						password: req.body.password || user.password,
						avatar  : req.file ? req.file.filename : user.avatar

					};

					User.findByIdAndUpdate(req.params.id, updateUser, {new: true}, (err, user) =>
					{
						if(!err)
						{
							const payload =
							{
								id    : user.id,
								name  : user.name,
								email : user.email,
								avatar: user.avatar,
								active: user.active

							};

							jwt.sign(payload, keys.secretOrKey, {expiresIn: 31556926}, (err, token) =>
							{
								res.status(200).json({token: "Bearer " + token});

							});

						}
						else
							res.status(400).send("There's was an error while updating the user: " + err);

					});

				})
				.catch(err =>
				{
					res.status(400).json({general: "An internal error occurred. Please contact your system administrator"});

				});
			
		};

		const { errors, isValid } = validateRegister({...req.body}, !isEmpty(req.body.password));

		if(!isValid)
		{
			try
			{
				fs.unlinkSync("./public/uploads/" + req.file.filename);

			}
			catch(err){}

			return res.status(400).json(errors);

		}

		if(req.body.password)
		{
			bcrypt.genSalt(10, (err, salt) =>
			{
				bcrypt.hash(req.body.password, salt, (err, hash) =>
				{
					if(err)
						throw err;

					req.body.password =
						req.body.password2 = hash;

					update(req, res);

				});

			});

		}
		else
			update(req, res);

	},

	getById: (req, res) =>
	{
		User.findById(req.params.id, {name: true, email: true, avatar: true, active: true}, (err, user) =>
		{
			if(err || !user)
			{
				res.status(400).json({general: "There's was an error while reading user or user doesn't exist"});

			}
			else
				res.status(200).json(user);

		});

	},

	activate: (req, res) =>
	{
		User.findByIdAndUpdate(req.params.id, {active: true}, {new: true}, (err, user) =>
		{
			if(!err)
			{
				const payload =
				{
					id    : user.id,
					name  : user.name,
					email : user.email,
					avatar: user.avatar,
					active: user.active

				};

				jwt.sign(payload, keys.secretOrKey, {expiresIn: 31556926}, (err, token) =>
				{
					res.status(200).json({token: "Bearer " + token});

					SendMail.send
					({
						template: "Activation/Tanks", message: {to: user.email, subject: "Tanks to activate your TODO registration!"}, locals: {name: user.name}});

				});

			}
			else
				res.status(400).send("There's was an error while updating the user: " + err);

		});

	}

};