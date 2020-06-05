var mongoose = require("mongoose");
// Это модель Mongoose для пользователей
var UserSchema = mongoose.Schema({
	username: String,
	date_of_birth: Date,
	phone: String,
	email: String,
	password: String,
	admin: Boolean,
	doctor: Boolean,
	id: String
});
var User = mongoose.model("User", UserSchema);
module.exports = User;