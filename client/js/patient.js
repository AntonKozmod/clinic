var EditOnClick = function (user, callback) {
	var $usersListItem = $("<li>").text(user.username);
	
	var $usersRemoveLink = $("<a>").attr("href", "#");
	$usersRemoveLink.addClass("linkRemove");
	$usersRemoveLink.text("Удалить");
	$usersRemoveLink.on("click", function () {
		if (confirm("Вы действительно хотите удалить пользователя " + user.username + "?")) {
			$.ajax({
				url: "/users/" + user._id,
				type: "DELETE"
			}).done(function (responde) {
				callback();
			}).fail(function (err) {
				console.log("error on delete 'user'!");
			});
			return false;
		}
	});
	$usersListItem.append($usersRemoveLink);

	if (!user.doctor) {
		var $toTheDoctorLink = $("<a>").attr("href", "#");
		$toTheDoctorLink.addClass("link");
		$toTheDoctorLink.text("Сделать врачом");
		$toTheDoctorLink.on("click", function() {
			if (confirm("Вы действительно хотите пользователя " + user.username + " назначить врачом?")) {
				$.ajax({
					url: "/users/" + user._id,
					type: "PUT",
					data: { "doctor": true }
				}).done(function (responde) {
					callback();
				}).fail(function (err) {
					console.log("error! " + err);
				});
				return false;
			}
		});
		$usersListItem.append($toTheDoctorLink);
	} else {
		var $toTheDoctorLink = $("<a>").attr("href", "#");
		$toTheDoctorLink.addClass("link");
		$toTheDoctorLink.text("Убрать из врачей");
		$toTheDoctorLink.on("click", function() {
			if (confirm("Вы действительно хотите пользователя " + user.username + " убрать из врачей?")) {
				$.ajax({
					url: "/users/" + user._id,
					type: "PUT",
					data: { "doctor": false }
				}).done(function (responde) {
					callback();
				}).fail(function (err) {
					console.log("error! " + err);
				});
				return false;
			}
		});
		$usersListItem.append($toTheDoctorLink);
	}

	return $usersListItem;
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

				$content = $("<ul>");

				$content.append(EditOnClick("Имя пользователя: " + user.username, function() {
					$(".tabs a:first-child span").trigger("click");
				}));

				$content.append(EditOnClick("Дата рождения: " + user.date_of_birth, function() {
					$(".tabs a:first-child span").trigger("click");
				}));
				
				$content.append(EditOnClick("Номер телефона: " + user.phone, function() {
					$(".tabs a:first-child span").trigger("click");
				}));

				$content.append(EditOnClick("Адрес электронной почты: " + user.email, function() {
					$(".tabs a:first-child span").trigger("click");
				}));
				
				$content.append(EditOnClick("Пароль: *********", function() {
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
				for (i = 0; i < usersObjects.length; i++) {
					if (!usersObjects[i].admin && !usersObjects[i].doctor) {
						var $usersListItem = liaWithDeleteOnClick(usersObjects[i], function() {
							$(".tabs a:nth-child(2) span").trigger("click");
						});
						$content.append($usersListItem);
					}
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