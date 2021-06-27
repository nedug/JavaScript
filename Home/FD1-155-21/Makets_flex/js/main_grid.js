//  Для активации hover эффекта на ТАЧ устройствах
document.body.addEventListener('touchstart', function () {});


//  Появление модального окна с задержкой 2,5с
setTimeout(function() {
    $("#overlay_modal").toggleClass('open-menu');
}, 2500);


//  Закрытие модального окна по клику на кнопку с задержкой 1,5с
$('.close').click(function(){
    setTimeout(function() {
        $('#overlay_modal').toggleClass('open-menu');
    }, 1500);
});


//  Заливка кнопки закрытия модального окна черным цветом
$('.close').click(function(){
    setTimeout(function() {
        $('.close').toggleClass('open-menu');
    });
});


//  Анимация и работа ФОРМЫ РЕГИСТРАЦИИ
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


//  Включение и Отключение НОЧНОГО РЕЖИМА
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


//    Добавление элементу свойства CSS:
//		<button class="close" onclick="document.getElementById('overlay_modal').style.display='none';"><i class="fas fa-times"></i></button>

// Задержка появления модального окна:
//		var delay_modal_window = 2500;
// Появление модального окна:
//		setTimeout("document.getElementById('overlay_modal').style.display='block'", delay_modal_window);
