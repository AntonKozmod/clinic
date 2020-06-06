var mongoose = require("mongoose"),
	AppoSchema,
	ObjectId = mongoose.Schema.Types.ObjectId;
// Это модель mongoose для записей к врачу
AppoSchema = mongoose.Schema({
	date: Date, // дата приема
	//description: String, // описание (комментарий пациента для врача)
	doctor: { type: ObjectId, ref: "User" }, // id врача, которого выбрал пациент
	patient: { type: ObjectId, ref: "User" } // id пациента
});
var Appo = mongoose.model("Appo", AppoSchema);
module.exports = Appo;