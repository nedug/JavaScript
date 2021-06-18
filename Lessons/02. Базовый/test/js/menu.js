$(document).ready(function() {
	$('.menu-burger__header').click(function(){
        $('.menu-burger__header').toggleClass('open-menu');
        $('.menu__ul').toggleClass('open-menu');
        $('.wrapper').toggleClass('open-menu');
        // $('body').toggleClass('fixed-page');
	});
});