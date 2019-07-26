const express =
	require("express");

const bodyParser =
	require("body-parser");

const cors =
	require("cors");

const mongoose =
	require("mongoose");

const passport =
	require("passport");

const config =
	require("../config/keys.config.js");

const TaskRoutes = require("./routes/Task");
const UserRoutes = require("./routes/User");

mongoose.connect(config.mongodb, { useNewUrlParser: true })
	.then(() =>
	{
		console.log("Database connected");

	})
	.catch((err) =>
	{
		console.log("Error on database connection", err);
		process.exit(1);

	});

mongoose.set("useFindAndModify", false);

const app =
	express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors());

app.use("./public/uploads", express.static("uploads"));

require("../config/passport")
	(passport);

// NÃO PRECISA
//app.use(passport.initialize());

// PROTEGE TODAS AS ROTAS CARREGADAS - NÃO PRECISA POR QUE ESTÁ PROTEGENDO INDIVIDUALMENTE
//app.use("/api/tasks", passport.authenticate("jwt", {session: false}), TaskRoutes);
//app.use("/api/users", passport.authenticate("jwt", {session: false}), UserRoutes);

app.use("/api/tasks", TaskRoutes);
app.use("/api/users", UserRoutes);

const port =
	process.env.PORT || 3001;

app.listen(port, function()
{
	console.log("Server listening on port " + port);

});