var express = require("express"),
	http = require("http"),
	app = express(),
	mongoose = require("mongoose"),
	UsersController = require("./controllers/users_controller.js");
	
app.use('/',express.static(__dirname + "/client"));
//app.use('/users/:id',express.static(__dirname + "/client"));

// Это модель Mongoose для задач
http.createServer(app).listen(3000);
// командуем Express принять поступающие
// объекты JSON
app.use(express.urlencoded({ extended: true }));
// подключаемся к хранилищу данных Amazeriffic в Mongo
mongoose.connect('mongodb://localhost/clinic', {
		useNewUrlParser: true,
		useCreateIndex: true,
		useUnifiedTopology: true 
	}).then(res => {
		console.log("DB Connected!")
	}).catch(err => {
		console.log(Error, err.message);
	});

app.get("/users.json", UsersController.index); 
app.post("/users", UsersController.create); 
app.post("/accounts", UsersController.login);
app.get("/users/:id", UsersController.show);
//app.put("/users/:username", UsersController.update);
//app.delete("/users/:username", UsersController.destroy); 