var EditUsernameOnClick = function (user, callback) {
	var $usersListItem = $("<li>").text(user.username);
	
	var $usersRemoveLink = $("<a>").attr("href", "#");
	$usersRemoveLink.addClass("linkRemove");
	$usersRemoveLink.text("Редактировать");
	$usersRemoveLink.on("click", function () {
		var newUsername = prompt ("Введите новые ФИО: ", user.username);
		$.ajax({
			url: "/users/" + user._id,
			type: "PUT",
			data: { username: newUsername }
		}).done(function (responde) {
			callback();
		}).fail(function (err) {
			console.log("error on edit username!");
		});
		return false;
		
	});
	$usersListItem.append($usersRemoveLink);

	return $usersListItem;
}

var EditDateOnClick = function (user, callback) {
	var $usersListItem = $("<li>").text(user.username);
	
	var $usersRemoveLink = $("<a>").attr("href", "#");
	$usersRemoveLink.addClass("linkRemove");
	$usersRemoveLink.text("Редактировать");
	$usersRemoveLink.on("click", function () {
		var newDate = prompt ("Введите дату рождения: ", user.date_of_birth);
		$.ajax({
			url: "/users/" + user._id,
			type: "PUT",
			data: { date_of_birth: newDate }
		}).done(function (responde) {
			callback();
		}).fail(function (err) {
			console.log("error on edit date!");
		});
		return false;
		
	});
	$usersListItem.append($usersRemoveLink);

	return $usersListItem;
}

var EditPhoneOnClick = function (user, callback) {
	var $usersListItem = $("<li>").text(user.username);
	
	var $usersRemoveLink = $("<a>").attr("href", "#");
	$usersRemoveLink.addClass("linkRemove");
	$usersRemoveLink.text("Редактировать");
	$usersRemoveLink.on("click", function () {
		var newPhone = prompt ("Введите номер телефона: ", user.phone);
		$.ajax({
			url: "/users/" + user._id,
			type: "PUT",
			data: { phone: newPhone }
		}).done(function (responde) {
			callback();
		}).fail(function (err) {
			console.log("error on edit phone!");
		});
		return false;
		
	});
	$usersListItem.append($usersRemoveLink);

	return $usersListItem;
}

var EditEmailOnClick = function (user, callback) {
	var $usersListItem = $("<li>").text(user.username);
	
	var $usersRemoveLink = $("<a>").attr("href", "#");
	$usersRemoveLink.addClass("linkRemove");
	$usersRemoveLink.text("Редактировать");
	$usersRemoveLink.on("click", function () {
		var newEmail = prompt ("Введите электронную почту: ", user.email);
		$.ajax({
			url: "/users/" + user._id,
			type: "PUT",
			data: { email: newEmail }
		}).done(function (responde) {
			callback();
		}).fail(function (err) {
			console.log("error on edit email!");
		});
		return false;
		
	});
	$usersListItem.append($usersRemoveLink);

	return $usersListItem;
}

var EditPasswordOnClick = function (user, callback) {
	var $usersListItem = $("<li>").text(user.username);
	
	var $usersRemoveLink = $("<a>").attr("href", "#");
	$usersRemoveLink.addClass("linkRemove");
	$usersRemoveLink.text("Редактировать");
	$usersRemoveLink.on("click", function () {
		var newPassword = prompt ("Введите электронную почту: ", user.password);
		$.ajax({
			url: "/users/" + user._id,
			type: "PUT",
			data: { password: newPassword }
		}).done(function (responde) {
			callback();
		}).fail(function (err) {
			console.log("error on edit password!");
		});
		return false;
		
	});
	$usersListItem.append($usersRemoveLink);

	return $usersListItem;
}

var liaWithDeleteOnClick = function (appo, callback) {
	var $apposListItem = $("<li>").text(appo.date);
	
	var $apposRemoveLink = $("<a>").attr("href", "#");
	$apposRemoveLink.addClass("linkRemove");
	$apposRemoveLink.text("Удалить");
	$apposRemoveLink.on("click", function () {
		if (confirm("Вы действительно хотите удалить запись на прием на " + appo.date + "?")) {
			$.ajax({
				url: "appoint/" + appo._id,
				type: "PUT"
			}).done(function (responde) {
				callback();
			}).fail(function (err) {
				console.log("error on delete 'appo'!");
			});
			return false;
		}
	});
	$apposListItem.append($apposRemoveLink);

	return $apposListItem;
}


var main = function () {
	"use strict";
	// создание пустого массива с вкладками
	var tabs = [];
	// добавляем вкладку Обо мне
	tabs.push({
		"name": "Обо мне",
		// создаем функцию content
		// так, что она принимает обратный вызов
		"content": function(callback) {
			$.get("account/", function(user) {
				var $content;

				$content = $("<ul>").append(EditOnClick(user, function() {
					$(".tabs a:first-child span").trigger("click");
				}));

				$content.append(EditUsernameOnClick(user, function() {
					$(".tabs a:first-child span").trigger("click");
				}));

				$content.append(EditDateOnClick(user, function() {
					$(".tabs a:first-child span").trigger("click");
				}));
				
				$content.append(EditPhoneOnClick(user, function() {
					$(".tabs a:first-child span").trigger("click");
				}));

				$content.append(EditEmailOnClick(user, function() {
					$(".tabs a:first-child span").trigger("click");
				}));
				
				$content.append(EditPasswordOnClick(user, function() {
					$(".tabs a:first-child span").trigger("click");
				}));

				callback(null, $content);
			}).fail(function (jqXHR, textStatus, error) {
				callback(error, null);
			});
		}
	});

	// добавляем вкладку Мои записи к врачу
	tabs.push({
		"name": "Мои записи к врачу",
		"content": function(callback) {
			var $content = $("<ul>");
			$content.append($("<a>").text(""));
			$.getJSON("appoint.json", function (appoObjects) {
				var i;
				for (i = 0; i < appoObjects.length; i++) {
					var $apposListItem = liaWithDeleteOnClick(appoObjects[i], function() {
						alert("Вы успешно отказались от приема!");
						$(".tabs a:nth-child(2) span").trigger("click");
						});
					$content.append($apposListItem);
				}
				callback(null, $content);
			}).fail(function(jqXHR, textStatus, error) {
				callback(error, null);
			});
		}
	});

	tabs.push({
		"name": "Записаться к врачу",
		"content": function(callback) {
			var $content,
				$selDoctor = ("<select>"),
				$selDate = ("<select>"),
				$btAdd = ("<button>").text("Записаться");

			$selDoctor.append($("<option>").text("Выберите врача"));
			$selDate.append($("<option>").text("Выберите дату и время приема"));

			$selDate.prop("disabled", true);
			$btAdd.prop("disabled", true);

			// заполняем список с врачами:
			$.getJSON("/users.json", function (usersObjects) {
				var i;
				for (i = 0; i < usersObjects.length; i++) {
					if (usersObjects[i].doctor) {
						var $option = $("<option>").text(usersObjects[i].username);
						$option.attr("value", usersObjects[i]._id); // сохраняю _id врача в value на будущее
						$selDoctor.append($option);
					}
				}
			});

			$selDoctor.change(function() {
				if ($(this).val() != 0) {
					// заполняем список с приемами
					$.getJSON("/appoint.json", function (apposObjects) {
						var i;
						for (i = 0; i < appoObjects.length; i++) {
							if ((appoObjects[i].doctor === $selDoctor.val()) && (appoObjects[i].patient == ""))  {
								var $option = $("<option>").text(appoObjects[i].date);
								$option.attr("value", appoObjects[i]._id); // сохраняю _id записи в value на будущее
								$selDate.append($option);
							}
						}
						if ($selDate.size() !== 0) {
							$selDate.prop("disabled", false);
							$inpDescription.prop("disabled", false);
							$btAdd.prop("disabled", false);
						} else {
							alert("Приемов у этого врача не найдено");
						}
					});
				}
			});
				

			$btAdd.on("click", function() {
				if (confirm("Вы действительно хотите записаться на прием?")) {
					$.ajax({
						url: "appoint/" + selDate.val(),
						type: "PUT"
					}).done(function(responde) {
						alert("Вы успешно записались на прием!");
						$(".tabs a:nth-child(2) span").trigger("click");		
					}).fail(function(jqXHR, textStatus, error) {
						alert("Ошибка!\n" + jqXHR.status + jqXHR.textStatus);
					})
				}
			});

			$content.append($selDoctor, $selDate, $btAdd);
			callback(null, $content);
		}
	});

	tabs.forEach(function (tab) {
		var $aElement = $("<a>").attr("href",""),
			$spanElement = $("<span>").text(tab.name);
		$aElement.append($spanElement);
		$("main .tabs").append($aElement);

		$spanElement.on("click", function () {
			var $content;
			$(".tabs a span").removeClass("active");
			$spanElement.addClass("active");
			$("main .content").empty();
			tab.content(function (err, $content) {
				if (err !== null) {
					alert ("Возникла проблема при обработке запроса: " + err);
				} else {
					$("main .content").append($content);
				}
			});
			return false;
		});
	});

	$(".tabs a:first-child span").trigger("click");
}

$(document).ready(function() {
	main();
});