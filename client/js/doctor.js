var EditUsernameOnClick = function (user, callback) {
	var $usersListItem = $("<li>").text("ФИО: " + user.username);
	
	var $usersRemoveLink = $("<a>").attr("href", "#");
	$usersRemoveLink.addClass("link");
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
	var date = new Date(user.date_of_birth);
	var optionsDate = {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	};

	var $usersListItem = $("<li>").text("Дата рождения: " + date.toLocaleString("ru", optionsDate));
	
	var $usersRemoveLink = $("<a>").attr("href", "#");
	$usersRemoveLink.addClass("link");
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
	var $usersListItem = $("<li>").text("Номер телефона: " + user.phone);
	
	var $usersRemoveLink = $("<a>").attr("href", "#");
	$usersRemoveLink.addClass("link");
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
	var $usersListItem = $("<li>").text("Электронная почта: " + user.email);
	
	var $usersRemoveLink = $("<a>").attr("href", "#");
	$usersRemoveLink.addClass("link");
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
	var $usersListItem = $("<li>").text("Пароль: ******");
	
	var $usersRemoveLink = $("<a>").attr("href", "#");
	$usersRemoveLink.addClass("link");
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
	var $apposListItem = $("<li>");
	
	if (appo.patient != undefined) {
		$.ajax ({
			url: "/users/" + appo.patient + "/account",
			type: "GET"
		}).done(function(responde) {
			var date = new Date(appo.date);
			var options = {
				year: 'numeric',
				month: 'long',
				day: 'numeric',
				weekday: 'long',
				timezone: 'UTC',
				hour: 'numeric',
				minute: 'numeric',
			};

			var str = date.toLocaleString("ru", options);
			str = str + ", пациент: " +	responde.username;
			$apposListItem.text(str);
	
			var $apposRemoveLink = $("<a>").attr("href", "#");
			$apposRemoveLink.addClass("linkRemove");
			$apposRemoveLink.text("Удалить");
			$apposRemoveLink.on("click", function () {
				if (confirm("Вы действительно хотите удалить запись на прием на " + date + "?")) {
					$.ajax({
						url: "appoint/" + appo._id,
						type: "DELETE"
					}).done(function (responde) {
						callback();
					}).fail(function (err) {
						console.log("error on delete 'appo'!");
					});
					return false;
				}
			});
			$apposListItem.append($apposRemoveLink);
		}).fail(function (err) {
			console.log("Ошибка: " + err);
		});
	} else {
		var date = new Date(appo.date);
		var options = {
			year: 'numeric',
			month: 'long',
			day: 'numeric',
			weekday: 'long',
			timezone: 'UTC',
			hour: 'numeric',
			minute: 'numeric',
			};
			var str = date.toLocaleString("ru", options);
		$apposListItem.text(str);

		var $apposRemoveLink = $("<a>").attr("href", "#");
		$apposRemoveLink.addClass("linkRemove");
		$apposRemoveLink.text("Удалить");
		$apposRemoveLink.on("click", function () {
			if (confirm("Вы действительно хотите удалить запись на прием на " + date + "?")) {
				$.ajax({
					url: "appoint/" + appo._id,
					type: "DELETE"
				}).done(function (responde) {
					callback();
				}).fail(function (err) {
					console.log("error on delete 'appo'!");
				});
				return false;
			}
		});
		$apposListItem.append($apposRemoveLink);
	}  

	return $apposListItem;
}


var main = function () {
	"use strict";
	// создание пустого массива с вкладками
	var tabs = [];

	tabs.push({
		"name": "Обо мне",
		// создаем функцию content
		// так, что она принимает обратный вызов
		"content": function(callback) {
			$.get("account/", function(user) {
				var $content = $("<ul>");

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

	tabs.push({
		"name": "Предстоящие приемы",
		"content": function(callback) {
			var $content = $("<ul>");
			$content.append($("<a>").text(""));
			$.getJSON("appoint.json", function (appoObjects) {
				var i;
				for (i = 0; i < appoObjects.length; i++) {
					if (new Date(appoObjects[i].date) >= new Date()) {
						var $apposListItem = liaWithDeleteOnClick(appoObjects[i], function() {
							alert("Вы успешно отказались от приема!");
							$(".tabs a:nth-child(2) span").trigger("click");
							});
						$content.append($apposListItem);	
					}
				}
				callback(null, $content);
			}).fail(function(jqXHR, textStatus, error) {
				callback(error, null);
			});
		}
	});

	tabs.push({
		"name": "Создать запись на прием",
		"content": function(callback) {
			var $content = $("<div>").addClass("newAppo"),
				$inpDate = $("<input>").attr("type", "datetime-local"),
				$linkAdd = $("<a>").text("Создать запись");

			$inpDate.attr("placeholder", "Выберите дату и время приема");
			$linkAdd.attr("href", "#");

			$linkAdd.on("click", function() {
				if (confirm("Вы действительно хотите создать запись?")) {
					$.ajax({
						url: "appoint/",
						type: "POST",
						data: {date: $inpDate.val()}
					}).done(function(responde) {
						alert("Вы успешно создали запись на прием!");
						$inpDate.val("");
					}).fail(function(jqXHR, textStatus, error) {
						alert("Произошла ошибка: " + error);
					})
				}
			});

			$content.append($inpDate, $linkAdd);

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