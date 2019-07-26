const jwt_decode = require("jwt-decode");

const fs = require("fs");
const path = require("path");

const Excel =
	require("exceljs");

const Task = require("../models/Task");
const validateTask = require("../validation/Task");

const filters = (req) =>
{
	let auth 	= req.headers.authorization,
		filters = {};

	if(auth == null)
	{
		filters.user = null;

	}
	else
		filters.$or = [{user: null}, {user: jwt_decode(req.headers.authorization).id}];

	if(req.params.id)
		filters._id = req.params.id;

	return filters;

}

module.exports =
{
	create: (req, res) =>
	{
		const { errors, isValid } = validateTask({...req.body});

		if(!isValid)
		{
			res.status(400).json(errors);

		}
		else
		{
			const auth =
				req.headers.authorization;

			if((auth == null && req.body.user != null) || auth != null && req.body.user != jwt_decode(req.headers.authorization).id)
			{
				res.status(400).send("There's was an error while adding the task: " + err);

			}
			else
			{
				new Task(req.body).save()

					.then (task => res.status(200).json(task))
					.catch(err  => res.status(400).send("There's was an error while adding the task: " + err));

			}

		}

	},

	getAll: (req, res) =>
	{
		Task.find(filters(req), (err, tasks) =>
		{
			if(err || !tasks)
			{
				res.status(400).send("There's was an error while retrieving the tasks: " + err);

			}
			else
				res.status(200).json(tasks);

		});

	},

	getById: (req, res) =>
	{
		Task.findOne(filters(req), (err, task) =>
		{
			if(err || !task)
			{
				res.status(400).json({general: "There's was an error while reading task or task doesn't exist"});

			}
			else
				res.status(200).json(task);

		});

	},

	delete: (req, res) =>
	{
		Task.findOneAndDelete(filters(req), (err, tasks) =>
		{
			if(err || !tasks)
			{
				res.status(400).json({general: "There's was an error while deleting task or task doesn't exist"});

			}
			else
				res.status(200).json(req.params.id);

		});

	},

	update: (req, res) =>
	{
		const { errors, isValid } = validateTask({...req.body});

		if(!isValid)
		{
			res.status(400).json(errors);

		}
		else
		{
			Task.findOneAndUpdate(filters(req), req.body, {new: true}, (err, task) =>
			{
				if(err || !task)
				{
					res.status(400).send("There's was an error while updating the task: " + err);

				}
				else
					res.status(200).json(task);

			});

		}

	},

	upload: (req, res) =>
	{
		const workbook =
			new Excel.Workbook();

		workbook.xlsx.load(req.file.buffer).then(() =>
		{
			const rows =
				workbook.getWorksheet();

			for(let i = 1; i <= rows.rowCount; i++)
			{
				if(i == 1)
				{
					let header =
					{
						title    		: rows.getCell("A" + i).value.toLowerCase(),
						details  		: rows.getCell("B" + i).value.toLowerCase(),
						completed		: rows.getCell("C" + i).value.toLowerCase(),
						remember_me_date: rows.getCell("D" + i).value.toLowerCase()

					};

					if(header.title != "title*" || header.details != "details" || header.completed != "completed  ( y , n )" || header.remember_me_date != "remember me at ( dd/mm/yyyy )")
						return res.status(400).json({general: "There's was an error while reading this excel file: Default header required!"});

				}
				else
				{
					let task =
					{
						user: 
							req.body.id,

						title:
							rows.getCell("A" + i).value,

						details:
							rows.getCell("B" + i).value  || "",

						completed: 
							(rows.getCell("C" + i).value || "").toLowerCase() == "y" ? true : false,

						remember_me_date:
							rows.getCell("D" + i).value  || ""

					};

					new Task(task).save();

				}

			}

			setTimeout(() =>
			{
				Task.find(filters(req), (err, tasks) =>
				{
					if(err || !tasks)
					{
						res.status(400).json({general: "There's was an error while retrieving the tasks"});

					}
					else
						res.status(200).json(tasks);

				});

			});

		});

	}

};