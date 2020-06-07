var current = 0;
var curr_activ = 0;

var img1 = 'images/img1.jpg';
var text1 = "<h2 class='text_under'>ВЫСОКОКЛАССНЫЕ СПЕЦИАЛИСТЫ<br><br>Молодые и амбициозные<br><br>Большая часть нашего медперсонала - молодые врачи, с самыми свежими и актуальными знаниями в своей области</h2>";
var img2 = 'images/img2.jpg';
var text2 = "<h2 class='text_under'>ЛУЧШЕЕ СОВРЕМЕННОЕ ОБОРУДОВАНИЕ<br><br>Не хуже, чем у Запада<br><br>В нашей стоматологической клинике установлено самое лучшее отечественное оборудование, соответствующее всем стандартам качества</h2>";
var img3 = 'images/img3.jpg';
var text3 = "<h2 class='text_under'>ДЕТСКОЕ ОТДЕЛЕНИЕ<br><br>Дети любят ходить к нам!<br><br>В нашей клинике установлена игровая зона с телевизором, раскрасками и сладостями, чтобы ваше чадо могло расслабиться перед походом в кабинет доктора. А после приема каждого ребенка ждет вкусный подарок!</h2>";
var img4 = 'images/img4.jpg';
var text4 = "<h2 class='text_under'>ДОСТУПНЫЕ ЦЕНЫ<br><br>Доступна кредитная система и рассрочка!<br><br>В нашей клинике каждый клиент сможет позволить себе здоровую и красивую улыбку!</h2>"
var text_activ1 = "Выберите вид искусства";
var text_activ2 = "Выберите развлечение";
var text_activ3 = "Выберите экскурсию";
//var text_activ4 = "";

let arr_img = [img1, img2, img3, img4];       //массив фотографий
let arr_text = [text1, text2, text3, text4];   //массив текстов
let activ = [text_activ1, text_activ2, text_activ3];  //массив мероприятий
let arts = ["Музеи", "Музыка", "Архитектура", "Живопись", "Театры", "Достопримечательности"];
let relax = ["Дайвинг", "Ночные клубы", "Подводная охота"];

/*Смена фото при нажатии кнопку со стрлекой направленная в правую сторону*/
function frw()
{
  
  if(current == arr_img.length-1) 
  {
     current = 0;
     document.getElementById('text').innerHTML = arr_text[current];
     image.src = arr_img[current];
  }
  else 
  {
    document.getElementsByTagName('h2')[0].innerHTML = '';
    current++;
    document.getElementById('text').innerHTML = arr_text[current];
    image.src = arr_img[current];
  }      
}   
/*----------------------------------------------------------------------*/ 

/*Смена фото при нажатии кнопку со стрелкой направленная в левую сторону*/
function bck()
{
   current--;
   if(current == -1)
   {
    document.getElementsByTagName('h2')[0].innerHTML = '';
    current = arr_img.length-1; 
   } 
   document.getElementById('text').innerHTML = arr_text[current];
   image.src = arr_img[current];
}
/*----------------------------------------------------------------------*/

  console.log("Скрипт app.js успешно выполнен");
