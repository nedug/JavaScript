//--  Для активации hover эффекта на ТАЧ устройствах  --
document.body.addEventListener('touchstart', function () {});


//--  Появление модального окна с задержкой 2,5с  --
setTimeout(function() {
    $("#overlay_modal").toggleClass('open-menu');
}, 2500);


//--  Закрытие модального окна по клику на кнопку с задержкой 1,5с  --
$('.close').click(function(){
    setTimeout(function() {
        $('#overlay_modal').toggleClass('open-menu');
    }, 1500);
});


//--  Заливка кнопки закрытия модального окна черным цветом  --
$('.close').click(function(){
    setTimeout(function() {
        $('.close').toggleClass('open-menu');
    });
});


//--  Анимация и работа ФОРМЫ РЕГИСТРАЦИИ  --
const signupButton = document.getElementById('signup-button'),
    loginButton = document.getElementById('login-button'),
    userForms = document.getElementById('user_options-forms')

/**
 * Add event listener to the "Sign Up" button
 */
signupButton.addEventListener('click', () => {
    userForms.classList.remove('bounceRight')
    userForms.classList.add('bounceLeft')
}, false)

/**
 * Add event listener to the "Login" button
 */
loginButton.addEventListener('click', () => {
    userForms.classList.remove('bounceLeft')
    userForms.classList.add('bounceRight')
}, false)


//--  Включение и Отключение НОЧНОГО РЕЖИМА  --
$(document).ready(function()
{
    $('#night').change(function()
    {
        if(this.checked!=true)
        {
            $('body').toggleClass('night');
            $('.home_1').toggleClass('night');
            $('.header__name').toggleClass('night');
            $('.header__logo').toggleClass('night');
            $('.header__arrow').toggleClass('night');
            $('.home_2').toggleClass('night');
            $('.footer').toggleClass('night');
            $('.menu-burger__header').toggleClass('night');
            $('.menu__ul').toggleClass('night');
            $('.login').toggleClass('night');
            $('#night').toggleClass('night');
            $('.bottomRight').toggleClass('night');
            $('.header').toggleClass('night');
            $('.home__item_2').toggleClass('night');
            $('.home__item_3').toggleClass('night');
            $('.home__item_4').toggleClass('night');
            $('.home__item_5').toggleClass('night');
        }
        else {
            $('body').toggleClass('night');
            $('.home_1').toggleClass('night');
            $('.header__name').toggleClass('night');
            $('.header__logo').toggleClass('night');
            $('.header__arrow').toggleClass('night');
            $('.home_2').toggleClass('night');
            $('.footer').toggleClass('night');
            $('.menu-burger__header').toggleClass('night');
            $('.menu__ul').toggleClass('night');
            $('.login').toggleClass('night');
            $('#night').toggleClass('night');
            $('.bottomRight').toggleClass('night');
            $('.header').toggleClass('night');
            $('.home__item_2').toggleClass('night');
            $('.home__item_3').toggleClass('night');
            $('.home__item_4').toggleClass('night');
            $('.home__item_5').toggleClass('night');
        }
    });
});


//--  ПЕРЕКЛЮЧЕНИЕ ЯЗЫКА  --
$(document).ready(function()
{
    $('#language').change(function()
    {
        if(this.checked!=true)
        {
            document.getElementById("man").innerHTML = "mens";
            document.getElementById("man").style.fontSize = "23px";
            document.getElementById("man").style.letterSpacing = "7px";
            document.getElementById("women").innerHTML = "womens";
            document.getElementById("women").style.fontSize = "23px";
            document.getElementById("women").style.letterSpacing = "7px";
            document.getElementById("sale").innerHTML = "sale";
            document.getElementById("sale").style.fontSize = "23px";
            document.getElementById("sale").style.letterSpacing = "7px";
            document.getElementById("login").innerHTML = "Login";
            document.getElementById("login").style.fontSize = "23px";
            document.getElementById("login").style.letterSpacing = "7px";
            document.getElementById("marquee").innerHTML = "Black Friday Sale. up to 50% off + 1 month!";
            document.getElementById("shop").innerHTML = "SHOP NOW";
            document.getElementById("Features").innerHTML = "Features";
            document.getElementById("Delivery").innerHTML = "Delivery";
            document.getElementById("Shipping").innerHTML = "Shipping";
            document.getElementById("Returns").innerHTML = "Returns";
            document.getElementById("feat_1").innerHTML = "When you move, 600 muscles in your body work to make you more flexible and stronger. Sports are very important for children and teenagers. When their bones are well held by the muscles, they grow and become stronger. <br><br>\n" +
                "\n" +
                "\t\t\t\t\t\t\t<span>Sports maintain the whole body: your brain, your lungs, and your heart. For doing that your body uses your fats and your sugar. You get more healthy and slimmer. That’s not all. You develop your abilities such as catching a ball or keeping balance when you ride a bike. You learn new skills which are useful in your life. You get more successful and progress-oriented.</span>";
            document.getElementById("deliv_2").innerHTML = "In summer I have to go by bicycle when there is a traffic jam. It takes about an hour and a half. It’s a bit long but much faster than walking. I have not to complain too much because the weather forecast is good for this week. And if there is a lot of traffic jams, I will get to the office and enjoy the nice weather.";
            document.getElementById("ship_2").innerHTML = "Factories regularly emit harmful chemicals into the air. Petrol and gas, that are used by our drivers, also leave much to be desired. Apart from air pollution, water and soil are subjected to pollutions as well. When such fuels as coal and oil burn, they emit very dangerous smoke.<br> <br>\n" +
                "\t\t\t\t\t\t\t<span>A person destroys not only environment, plants, animals, but also himself. Faster and faster man’s health starts worsening; children of weak immune system are being given birth.</span>";
            document.getElementById("retur_2").innerHTML = "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsa dicta vero rerum? Eaque repudiandae architecto libero reprehenderit aliquam magnam ratione quidem? Nobis doloribus molestiae enim deserunt necessitatibus eaque quidem incidunt.";
            document.getElementById("PRIVACY").innerHTML = "PRIVACY";
            document.getElementById("PRIVACY").style.fontSize = "18px";
            document.getElementById("TERMS").innerHTML = "TERMS";
            document.getElementById("TERMS").style.fontSize = "18px";
            document.getElementById("SHOPP").innerHTML = "SHOP";
            document.getElementById("SHOPP").style.fontSize = "18px";
            document.getElementById("ABOUT").innerHTML = "ABOUT";
            document.getElementById("ABOUT").style.fontSize = "18px";
            document.getElementById("CONTACT").innerHTML = "CONTACT";
            document.getElementById("CONTACT").style.fontSize = "18px";
        }
        else {
            document.getElementById("man").innerHTML = "мужчинам";
            document.getElementById("man").style.fontSize = "19px";
            document.getElementById("man").style.letterSpacing = "4px";
            document.getElementById("women").innerHTML = "женщинам";
            document.getElementById("women").style.fontSize = "19px";
            document.getElementById("women").style.letterSpacing = "4px";
            document.getElementById("sale").innerHTML = "скидки";
            document.getElementById("sale").style.fontSize = "19px";
            document.getElementById("sale").style.letterSpacing = "4px";
            document.getElementById("login").innerHTML = "войти";
            document.getElementById("login").style.fontSize = "19px";
            document.getElementById("login").style.letterSpacing = "4px";
            document.getElementById("marquee").innerHTML = "Черная Пятница. 50% скидки + 1 месяц!";
            document.getElementById("shop").innerHTML = "купить сейчас";
            document.getElementById("Features").innerHTML = "принципы";
            document.getElementById("Delivery").innerHTML = "доставка";
            document.getElementById("Shipping").innerHTML = "Перевозка";
            document.getElementById("Returns").innerHTML = "Возврат";
            document.getElementById("feat_1").innerHTML = "Спорт поддерживает все тело: ваш мозг, легкие и сердце. Для этого ваше тело использует ваши жиры и сахар. Вы станете здоровее и стройнее. Это не все. Вы развиваете свои способности, такие как ловля мяча или удержание равновесия во время езды на велосипеде. Вы осваиваете новые навыки, которые пригодятся вам в жизни. Вы становитесь более успешными и ориентированными на прогресс.";
            document.getElementById("deliv_2").innerHTML = "Летом мне приходится ехать на велосипеде в пробку. На это уходит около полутора часов. Это немного длинновато, но намного быстрее, чем ходить. Я не должен сильно жаловаться, потому что прогноз погоды на эту неделю хороший. А если будет много пробок, доберусь до офиса и буду наслаждаться хорошей погодой.";
            document.getElementById("ship_2").innerHTML = "Заводы регулярно выбрасывают в воздух вредные химические вещества. Бензин и газ, которыми пользуются наши водители, тоже оставляют желать лучшего. Помимо загрязнения воздуха, загрязнению также подвержены вода и почва. Когда горят такие виды топлива, как уголь и нефть, они выделяют очень опасный дым.";
            document.getElementById("retur_2").innerHTML = "Человек уничтожает не только окружающую среду, растения, животных, но и себя. Все быстрее и быстрее начинает ухудшаться здоровье человека; рождаются дети со слабой иммунной системой.";
            document.getElementById("PRIVACY").innerHTML = "Личное";
            document.getElementById("PRIVACY").style.fontSize = "15px";
            document.getElementById("TERMS").innerHTML = "условия";
            document.getElementById("TERMS").style.fontSize = "15px";
            document.getElementById("SHOPP").innerHTML = "магазин";
            document.getElementById("SHOPP").style.fontSize = "15px";
            document.getElementById("ABOUT").innerHTML = "о нас";
            document.getElementById("ABOUT").style.fontSize = "15px";
            document.getElementById("CONTACT").innerHTML = "контакты";
            document.getElementById("CONTACT").style.fontSize = "15px";
        }
    });
});


//--  Включение ПЕРЕМЕЩЕНИЯ Модального ОКНА  --
$(document).ready(function()
{
    $( function() {
        $( ".modal_move" ).draggable();
    });
});



//--  Добавление элементу свойства CSS:  --
//		<button class="close" onclick="document.getElementById('overlay_modal').style.display='none';"><i class="fas fa-times"></i></button>

//--  Задержка появления модального окна:  --
//		var delay_modal_window = 2500;
// Появление модального окна:
//		setTimeout("document.getElementById('overlay_modal').style.display='block'", delay_modal_window);