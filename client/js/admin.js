var liaWithDeleteOnClick = function (user, callback) {
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
	// добавляем вкладку Новые
	tabs.push({
		"name": "Новые клиенты",
		// создаем функцию content
		// так, что она принимает обратный вызов
		"content": function(callback) {
			$.getJSON("/users.json", function (usersObjects) {
				var $content,
					i;
				$content = $("<ul>");
				for (i = usersObjects.length-1; i>=0; i--) {
					if (!usersObjects[i].admin && !usersObjects[i].doctor) {
						var $usersListItem = liaWithDeleteOnClick(usersObjects[i], function() {
							$(".tabs a:first-child span").trigger("click");
						});
						$content.append($usersListItem);
					}
				}
				callback(null, $content);
			}).fail(function (jqXHR, textStatus, error) {
				callback(error, null);
			});
		}
	});

	// добавляем вкладку Старые
	tabs.push({
		"name": "Старые клиенты",
		"content": function(callback) {
			$.getJSON("/users.json", function (usersObjects) {
				var $content,
					i;
				$content = $("<ul>");
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

	// добавляем вкладку Врачи
	tabs.push({
		"name": "Врачи",
		"content":function (callback) {
			$.getJSON("/users.json", function (usersObjects) {
				var $content,
					i;
				$content = $("<ul>");
				for (i = 0; i < usersObjects.length; i++) {
					if (usersObjects[i].doctor) {
						var $usersListItem = liaWithDeleteOnClick(usersObjects[i], function() {
							$(".tabs a:nth-child(3) span").trigger("click");
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