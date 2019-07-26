// https://ethereal.email/create

const path =
	require("path");

const nodemailer =
	require("nodemailer");

const Email =
	require("email-templates");

module.exports = SendMail = new Email
({
	message:
	{
		from: "misty.macgyver@ethereal.email"

	},

	views:
	{
		root: path.resolve(__dirname, "../server/views/emails")

	},

	transport: nodemailer.createTransport
	({
		host  : "smtp.ethereal.email",
		port  : 587,
		secure: false,

		auth  :
		{
			user: "misty.macgyver@ethereal.email",
			pass: "qCvpGQuJ5UbS4xTpYE"

		},

		tls:
		{
			rejectUnauthorized: false

		}

	}),

	send   : true,
	preview: false

});