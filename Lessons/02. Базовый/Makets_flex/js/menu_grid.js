$(document).ready(function() {

// Анимация Иконки БУРГЕРА, Появление МЕНЮ, затемнение ФОНА
	$('.menu-burger__header').click(function(){
        $('.menu-burger__header').toggleClass('open-menu');
        $('.menu__ul').toggleClass('open-menu');
        $('.overlay').toggleClass('open-menu');

        // $('body').toggleClass('fixed-page');
	});


// Закрытие МЕНЮ по клику на OVERLAY
    $('.overlay').click(function(){
        $('.menu-burger__header').toggleClass('open-menu');
        $('.menu__ul').toggleClass('open-menu');
        $('.overlay').toggleClass('open-menu');
    });


// Появление ФОРМЫ РЕГИСТРАЦИИ по клику на LOGIN
    $('.login').click(function(){
        $('.user').toggleClass('open-menu');
        $('.user_registered-close').toggleClass('open-menu');
        $('body').toggleClass('fixed-page');
    //  Убираем прокрутку BODY при появлении формы РЕГИСТРАЦИИ
    });


// Закрытие ФОРМЫ РЕГИСТРАЦИИ по клику на КРЕСТ
    $('.user_registered-close').click(function(){
        $('.user').toggleClass('open-menu');
        $('.user_registered-close').toggleClass('open-menu');
        $('body').toggleClass('fixed-page');
    });

});