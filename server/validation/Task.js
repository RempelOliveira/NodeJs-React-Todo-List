const isEmpty   = require("is-empty");
const Validator = require("validator");

module.exports = function validateTask(data)
{
	let errors = {};

	data.title = !isEmpty(data.title) ? data.title : "";

	if(Validator.isEmpty(data.title))
		errors.title = "Title field is required";

	return {
		errors, isValid: isEmpty(errors)

	};

};