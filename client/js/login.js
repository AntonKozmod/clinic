/*
<div id="login_window">
	   	<div id="okno_login">
	       	<h2 class="h2_request">
	       		Введите данные для входа
	       	</h2>
	       	<div class="form_request">
	       		<p>Вы можете войти в систему,<br>заполнив данную форму:</p>
	       		<input type="login" name="login" placeholder="Логин">
	       		<input type="password" name="password" placeholder="Пароль">
	       	</div>
	        <a href="#" class="close">Закрыть окно</a>
	        <a href="#" class="submit">Войти</a> <!--Пока что тоже только закрывает-->
	   	</div>
	</div>
*/





/*var main = function (UsersObjects) {
	"use strict";
	var $oknoLogin = $("<div>").attr("id", "okno_login"),
		$h2Request = $("<h2>").addClass("h2_request"),
		$formRequest = $("<div>").addClass("form_request"),
		$pText = $("<p>").text("Вы можете войти в систему,<br>заполнив данную форму:");

	$h2Request.text("Введите данные для входа");

	// поля ввода и кнопки
	var $inputLogin = $("<input>").attr("type", "login"),
		$inputPassword = $("<input>").attr("type", "password"),
		$buttClose = $("<a>").addClass("close"),
		$buttSubmit = $("<a>").addClass("submit");
	
	$inputLogin.attr("name", "login");
	$inputLogin.attr("placeholder", "Email");
	$inputPassword.attr("name", "password");
	$inputPassword.attr("placeholder", "Пароль");
	$buttClose.text("Закрыть окно");
	$buttClose.attr("href", "#");
	$buttSubmit("Войти");
	$buttSubmit.on("click", function() {
		console.log("Нажатие кнопки Войти");
	});

	$formRequest.append($pText, $inputLogin, $inputPassword);
	$oknoLogin.append($h2Request, $formRequest, $buttClose, $buttSubmit);

	$(".login_window").append($oknoLogin);
	console.log("Скрипт login.js успешно выполнен");
}*/