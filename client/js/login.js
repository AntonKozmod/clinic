var main = function () {
	"use strict";
	$(".submit").on("click", function() {
		var login = $('#login_window .form_request input[name="login"]').val();
		var password = $('#login_window .form_request input[name="login"]').val();
		if (login !== null && login.trim() !== "") {
			$.ajax({
				url: '/users',
				type: 'GET',
				data: { 'email': login, 'password': password }
			}).done(function(responde) {
				$.ajax({
					url: '/users/' + responde.id,
					type: 'GET',
					data: {'password': password}
				//}).done(function(result) {
				//	window.location.replace('users/' + responde.id + '/');
				}).fail(function(jqXHR, textStatus, error) {
					console.log(error);
					alert("Произошла непредвиденная ошибка!\n" + jqXHR.status + " " + jqXHR.textStatus);
				});
			}).fail(function(jqXHR, textStatus, error) {
				console.log(error);
				alert("Пользователь не найден.\nПроверьте верность введенных данных и повторите попытку");
				$('#login_window .form_request input[name="login"]').val() = "";
			});
		}
	});
}

$(document).ready(main);


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