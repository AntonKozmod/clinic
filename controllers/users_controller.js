var mongoose = require('mongoose'),
    User = require('../models/user.js');

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
  User.find({'email': req.body.email, 'password': req.body.password}, function(err, result) {
    if (err) {
      console.log(err);
    } else if (result.length !== 0) {
      res.send(result[0]); // отправляем найденного пользователя
    } else {
      res.send(404);
    }
  });
}

// Отобразить пользователя
UsersController.show = function(req, res) {
  console.log('Вызвано действие: отобразить пользователя');
  User.find({'id': req.params.id, 'password': req.body.password}, function(err, result) {
    if (err) {
      console.log(err);
    } else if (result.length !== 0) {
      	res.sendfile('./client/account.html');
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
		password = req.body.email;
    // console.log(username);
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
    			"password": password
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
/*UsersController.update = function (req, res) {
	console.log("Вызвано действие: обновить пользователя");
	var username = req.params.username;
	console.log("Старое имя пользователя: " + username);
	var newUsername = {$set: {username: req.body.username}};
	console.log("Новое имя пользователя: " + req.body.username);
	User.updateOne({"username": username}, newUsername, function (err,user) {
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
*/
// Удалить существующего пользователя
/*UsersController.destroy = function (req, res) {
	console.log("Вызвано действие: удалить пользователя");
	var username = req.params.username;
	User.find({"username": username}, function (err, result) {
		if (err) {
            console.log(err);
            res.send(500, err);
        } else if (result.length !== 0) {
        	console.log("Удаляем все todo с 'owner': " + result[0]._id);
        	ToDo.deleteMany({"owner": result[0]._id}, function (err, todo) {
		        console.log("Удаляем пользователя");
				User.deleteOne({"username": username}, function (err, user) {
					if (err !== null) {
						res.status(500).json(err);
					} else {
						if (user.n === 1 && user.ok === 1 && user.deletedCount === 1) {
							res.status(200).json(user);
						} else {
							res.status(404).json({"status": 404});
						}
					}
				});
        	});
        } else {
            res.status(404).send("Пользователь не существует");
            console.log(err);   
        }
	});
}
*/
module.exports = UsersController;