$(document).ready(function() {

//--  Анимация Иконки БУРГЕРА, Появление МЕНЮ, затемнение ФОНА (overlay), Закрытие МЕНЮ по клику на OVERLAY --
	$('.menu-burger__header, .overlay').click(function(){
//  Перечесление сразу несколько классов (.menu-burger__header, .overlay);
        $('.menu-burger__header').toggleClass('open-menu');
//  .toggleClass() - Добавляет или удаляет заданный класс(ы) по принципу переключателя;
        $('.menu__ul').toggleClass('open-menu');
        $('.overlay').toggleClass('open-menu');

        // $('body').toggleClass('fixed-page');
	});


//--  Закрытие МЕНЮ по клику на OVERLAY (больше НЕ нужно, смотри код выше)  --
//     $('.overlay').click(function(){
//         $('.menu-burger__header').toggleClass('open-menu');
//         $('.menu__ul').toggleClass('open-menu');
//         $('.overlay').toggleClass('open-menu');
//     });


//--  Появление ФОРМЫ РЕГИСТРАЦИИ по клику на LOGIN и Закрытие по клику на КРЕСТ --
    $('.login, .user_registered-close').click(function(){
        $('.user').toggleClass('open-menu');
        $('.user_registered-close').toggleClass('open-menu');
        $('body').toggleClass('fixed-page');
//  Убираем прокрутку BODY при появлении формы РЕГИСТРАЦИИ;
    });


//--  Закрытие ФОРМЫ РЕГИСТРАЦИИ по клику на КРЕСТ (больше НЕ нужно, смотри код выше)  --
//     $('.user_registered-close').click(function(){
//         $('.user').toggleClass('open-menu');
//         $('.user_registered-close').toggleClass('open-menu');
//         $('body').toggleClass('fixed-page');
//     });

});