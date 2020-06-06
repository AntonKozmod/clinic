var mongoose = require('mongoose'),
    User = require('../models/user.js'),
    Appo = require("../models/appointment.js");

var UsersController = {};

UsersController.index = function(req, res) {
  console.log('Вызвано действие: UsersController.index');
  User.find(function (err, users) {
  		if (err !== null) {
			res.json(500, err);
  		} else {
  			res.status(200).json(users);
  		}
  });
};

UsersController.login = function(req, res) {
  console.log('Вызвано действие: login - получить пользователя по логину и паролю');
  console.log('email: ' + req.body.email + " password: " + req.body.password);
  User.find({'email': req.body.email, 'password': req.body.password}, function(err, result) {
    if (err) {
      console.log(err);
    } else if (result.length !== 0) {
      console.log(result[0]);
      res.send(result[0]); // отправляем найденного пользователя
    } else {
      res.send(404);
    }
  });
}

// Отобразить пользователя
UsersController.show = function(req, res) {
  console.log('Вызвано действие: отобразить пользователя');
  User.find({'_id': req.params.id}, function(err, result) {
    if (err) {
      console.log(err);
    } else if (result.length !== 0) {
      if (result[0].admin === true) {
        res.sendfile('./client/admin.html');
      } else if (result[0].doctor === true) {
        res.sendfile('./client/doctor.html');
      } else {
        res.sendfile('./client/patient.html');
      }
    } else {
      res.send(404);
    }
  });
};

// Создать нового пользователя
UsersController.create = function(req, res) {
  console.log('Вызвано действие: создать пользователя');
    var username = req.body.username,
		date_of_birth = req.body.date_of_birth,
		phone = req.body.phone,
		email = req.body.email,
		password = req.body.password;
    console.log("email: " + req.body.email + " password: " + req.body.password);
    User.find({	"email": email }, function (err, result) {
        if (err) {
            console.log(err);
            res.send(500, err);
        } else if (result.length !== 0) {
            res.status(501).send("Пользователь уже существует");
            console.log(err);   
            console.log("Пользователь уже существует"); 
        } else {
            var newUser = new User({
              "username": username, 
    			    "date_of_birth": date_of_birth,
    		      "phone": phone,
    		      "email": email,
    		      "password": password,
              "admin": false,
              "doctor": false
            });
            newUser.save(function(err, result) {
                console.log(err); 
                if (err !== null) {
                    res.json(500, err); 
                } else {
                    console.log("result: " + result); 
                    res.json(200, result);
                }
            });
        }
    }); 
};

// Обновить существующего пользователя
UsersController.update = function (req, res) {
	console.log("Вызвано действие: обновить пользователя");
	var id = req.params.id;
	var query = {$set: req.body};
	User.updateOne({"_id": id}, query, function (err,user) {
		if (err !== null) {
			res.status(500).json(err);
		} else {
			if (user.n === 1 && user.nModified === 1 && user.ok === 1) {
				console.log('Изменен');
				res.status(200).json(user);
			} else {
				res.status(404);
			}
		}
	});
};

// Удалить существующего пользователя
UsersController.destroy = function (req, res) {
	console.log("Вызвано действие: удалить пользователя");
	var id = req.params.id;

  //console.log("Удаляем все записи пользователя");
 	Appo.deleteMany({"owner": id}, function (err, appo) {
    //console.log("Удаляем пользователя");
    User.deleteOne({"_id": id}, function (err, user) {
      if (err !== null) {
		    res.status(500).json(err);
      } else if (user.n === 1 && user.ok === 1 && user.deletedCount === 1) {
			    res.status(200).json(user);
			} else {
			    res.status(404).json({"status": 404});
			}
    });
 	});

}

module.exports = UsersController;