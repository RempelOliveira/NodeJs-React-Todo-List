const isEmpty   = require("is-empty");
const Validator = require("validator");

module.exports = function validateRegister(data, checkPassword = true)
{
	let errors = {};

	data.name 	   = !isEmpty(data.name) 	  ? data.name 	   : "";
	data.email 	   = !isEmpty(data.email) 	  ? data.email 	   : "";
	data.password  = !isEmpty(data.password)  ? data.password  : "";
	data.password2 = !isEmpty(data.password2) ? data.password2 : "";

	if(Validator.isEmpty(data.name))
		errors.name = "Name field is required";

	if(Validator.isEmpty(data.email))
	{
		errors.email = "Email field is required";

	}
	else if(!Validator.isEmail(data.email))
	{
		errors.email = "Email is invalid";

	}

	if(checkPassword == true)
	{
		if(Validator.isEmpty(data.password))
			errors.password = "Password field is required";

		if(Validator.isEmpty(data.password2))
			errors.password2 = "Confirm password field is required";

		if(!Validator.isLength(data.password, {min: 1, max: 60}))
			errors.password = "Password field is required";

		if(!Validator.equals(data.password, data.password2))
			errors.password2 = "Passwords must match";

	}

	return {
		errors, isValid: isEmpty(errors)

	};

};