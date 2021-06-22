$(document).ready(function() {
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
});