var Appo = require("../models/appointment.js"),
	User = require("../models/user.js"),
	AppoController = {};

AppoController.index = function (req, res) {
	console.log("Вызван AppoController.index");
	var id = req.params.id,
		respondWithAppo;
	respondWithAppo = function (query) {
		Appo.find(query, function (err, appo) {
			if (err !== null) {
				res.json(500, err);
			} else {
				res.status(200).json(appo);
			}
		});
	};
	User.find({"_id": id}, function (err, result) {
		if (err !== null) {
			res.json(500, err);
		} else if (result.length === 0) {
			res.status(404).json({"result_length": 0});
		} else {
			if (result[0].doctor)
				respondWithAppo({"doctor": result[0]._id});
			else
				respondWithAppo({"owner": result[0]._id});
		}
	});
};

AppoController.create = function (req, res) {
	console.log("Вызван AppoController.create");
	var newAppo = new Appo({"date": req.body.date,
							"description": req.body.description,
							"doctor": req.body.doctor,
							"owner": req.params.id});
	newAppo.save(function (err, result) {
		console.log(result);
		if (err !== null) {
			// элемент не был сохранен!
			console.log(err);
			res.json(500, err);
		} else {
			res.status(200).json(result);
		}
	});
}

AppoController.destroy = function (req, res) {
	console.log("Вызван AppoController.destroy");
	var idappo = req.params.idappo;
	Appo.deleteOne({"_id": idappo}, function (err, appo) {
		if (err !== null) {
			res.status(500).json(err);
		} else {
			if (appo.n === 1 && appo.ok === 1 && appo.deletedCount === 1) {
				res.status(200).json(appo);
			} else {
				res.status(404).json({"status": 404});
			}
		}
	});
}

AppoController.update = function (req, res) {
	console.log("Вызван AppoController.update");
	var idappo = req.params.idappo;
	var newInfo = {$set: req.body};
	Appo.updateOne({"_id": idappo}, newInfo, function (err,appo) {
		if (err !== null) {
			res.status(500).json(err);
		} else {
			if (appo.n === 1 && appo.nModified === 1 && appo.ok === 1) {
				res.status(200).json(appo);
			} else {
				res.status(404).json({"status": 404});
			}
		}
	});
}

module.exports = AppoController;
