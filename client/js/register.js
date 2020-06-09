var main = function () {
	"use strict";

	function registerfunc() {
		var full_name = $('#register_window input[name="full_name"]').val(),
			date = $('#register_window input[name="date"]').val(),
			tel = $('#register_window input[name="tel"]').val(),
			email = $('#register_window input[name="email"]').val(),
			password = $('#register_window input[name="password"]').val(),
			repeat_password = $('#register_window input[name="repeat_password"]').val();
		if (repeat_password !== password) {
			alert("Пароли не совпадают!\nВведите пароли снова и повторите попытку");
			$('#register_window input[name="password"]').val("");
			$('#register_window input[name="repeat_password"]').val("");
		} else if ((full_name !== null && full_name.trim() !== "") && (date !== null && date.trim() !== "")) {
			if ((tel !== null && tel.trim() !== "") && (email !== null && email.trim() !== "") && (password !== null && password.trim() !== "")) {
				$.ajax({
					url: '/users',
					type: 'POST',
					data: { 'username': full_name,
							'date_of_birth': date,
							'phone': tel,
							'email': email,
							'password': password }
				}).done(function(responde) {
					console.log(responde);
					alert('Аккаунт успешно создан!');
				}).fail(function(jqXHR, textStatus, error) {
					console.log(error);
					if (jqXHR.status === 501) {
						alert("Такой пользователь уже существует!\nИзмените логин и повторите "
						+ "попытку");
					} else {					
						alert("Произошла ошибка!\n"+jqXHR.status + " " + jqXHR.textStatus);	
					}
				});
			}
		}
	}

	$(".submit_register").on("click", function() {
		registerfunc();
	});

	$('input[name="repeat_password"]').on('keydown', function(e) {
		if (e.which === 13) {
			registerfunc();
		}
	});
}

$(document).ready(main);

/*
	<div id="register_window">
	   	<div id="okno_register">
	       	<h2 class="h2_register">
	       		Введите данные для регистрации
	       	</h2>
	       	<div class="form_request">
	       		<p>Вы можете зарегистрироваться в системе, заполнив данную форму:</p>
	       		<div class="inputbox_register_left">
	       			<label for="date">Введите свое полное имя:</label>
	       			<input type="full_name" name="full_name" placeholder="Фамилия Имя Отчество">
	       		</div>
	       		<div class="inputbox_register_right">
	       			<label for="date">Дата рождения:</label>
	       			<input type="date" name="date" placeholder="Дата рождения">
	       		</div>
	       		<div class="inputbox_register_left">
	       			<label for="tel">Номер телефона:</label>
	       			<input type="tel" name="tel" placeholder="+7 (999) 999-99-99">
	       		</div>
	       		<div class="inputbox_register_right">
	       			<label for="email">Электронная почта:</label>
	       			<input type="email" name="email" placeholder="name@email.com">
	       		</div>
	       		<div class="inputbox_register_left">
	      			<label for="password">Придумайте пароль:</label>
	       			<input type="password" name="password" placeholder="*********">
	       		</div>
	       		<div class="inputbox_register_right">
	       			<label for="password">Повторите пароль:</label>
	       			<input type="password" name="repeat_password" placeholder="*********">
	       		</div>     		
        	</div>
	        <a href="#" class="submit_register">Зарегистрироваться</a> <!--Пока что тоже только закрывает-->
	        <a href="#" class="close_register">Закрыть окно</a>
      	</div>
    </div>
   */