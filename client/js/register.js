var main = function () {
	"use strict";
	$(".submit").on("click", function() {
		var full_name = $('#register_window input[name="full_name"]').val(),
			date = $('#register_window input[name="date"]').val(),
			tel = $('#register_window input[name="tel"]').val;

		if (login !== null && login.trim() !== "") {
			
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