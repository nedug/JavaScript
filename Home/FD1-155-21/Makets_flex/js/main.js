//--  ПЛАВНАЯ ПРОКРУТКА К ЯКОРЮ  --
$("a.scroll-to").on("click", function(e){
//  Работает только для ссылок с классом 'scroll-to'
	e.preventDefault();
//  Отменяем стандартную обработку нажатия по ссылке
	var id = $(this).attr('href');
//  Забираем индефикатор блока с атрибутом href
	$('html, body').stop().animate({
		scrollTop: $(id).offset().top - 0
//  Можно указать после минуса высоту фиксированной плавающей шапки, если она есть. Устанавливается чтобы при прокрутке якорный элемент не перекрывался ей. Если фиксированной шапки нет, то значение убирается или устанавливается в 0.
	}, 800);
});


//--  ПОЯВЛЕНИЕ КНОПКИ "В НАЧАЛО СТРАНИЦЫ"  --
$(window).scroll(function (){
	var scr = $(this).scrollTop();
	if(scr>200){
		$(".btn_up").fadeIn().addClass("fadeInUpBigBtn");
//  кнопке по умолчанию необходимо задать: display: none;
	}
	else{
		$(".btn_up").fadeOut();
	}
});

//--  ПОЯВЛЕНИЕ КНОПКИ "В НАЧАЛО СТРАНИЦЫ" для PAGES.html  --
$(window).scroll(function (){
	var scr = $(this).scrollTop();
	if(scr>5){
		$(".btn_up_1").fadeIn().addClass("fadeInUpBigBtn");
	}
	else{
		$(".btn_up_1").fadeOut();
	}
});


//--  АНИМАЦИЯ ВЫПАДАЮЩИХ РАЗДЕЛОВ САЙТА  --
$(function () {
	$(window).scroll(function() {
	    $('.fadeIn-Down').each(function(){
	        var imagePos = $(this).offset().top;
//  знаем высоту от начала страницы до необходимого блока
	        var topOfWindow = $(window).scrollTop();
//  узнаем высоту от начала страницы
	        if (imagePos < topOfWindow+650) {
	            $(this).addClass("fadeInDown");
	        }
	    });
	});
	$(window).scroll(function() {
	    $('.fadeIn-Up').each(function(){
	        var imagePos = $(this).offset().top;

	        var topOfWindow = $(window).scrollTop();
	        if (imagePos < topOfWindow+650) {
	            $(this).addClass("fadeInUp");
	        }
	    });
	});
	$(window).scroll(function() {
	    $('.note-1').each(function(){
	        var imagePos = $(this).offset().top;

	        var topOfWindow = $(window).scrollTop();
	        if (imagePos < topOfWindow+650) {
	            $(this).addClass("fadeInDownBig");
	        }
	    });
	});$(window).scroll(function() {
	    $('.note-2').each(function(){
	        var imagePos = $(this).offset().top;

	        var topOfWindow = $(window).scrollTop();
	        if (imagePos < topOfWindow+650) {
	            $(this).addClass("fadeInRightBig");
	        }
	    });
	});
	$(window).scroll(function() {
	    $('.note-3').each(function(){
	        var imagePos = $(this).offset().top;

	        var topOfWindow = $(window).scrollTop();
	        if (imagePos < topOfWindow+650) {
	            $(this).addClass("fadeInUpBig");
	        }
	    });
	});
	$(window).scroll(function() {
	    $('.note-4').each(function(){
	        var imagePos = $(this).offset().top;

	        var topOfWindow = $(window).scrollTop();
	        if (imagePos < topOfWindow+650) {
	            $(this).addClass("fadeInLeftBig");
	        }
	    });
	});
	$(window).scroll(function() {
	    $('.fadeIn-Left').each(function(){
	        var imagePos = $(this).offset().top;

	        var topOfWindow = $(window).scrollTop();
	        if (imagePos < topOfWindow+650) {
	            $(this).addClass("fadeInLeft");
	        }
	    });
	});
	$(window).scroll(function() {
	    $('.fadeIn-Right').each(function(){
	        var imagePos = $(this).offset().top;

	        var topOfWindow = $(window).scrollTop();
	        if (imagePos < topOfWindow+650) {
	            $(this).addClass("fadeInRight");
	        }
	    });
	});
		$(window).scroll(function() {
	    $('.fade-In').each(function(){
	        var imagePos = $(this).offset().top;

	        var topOfWindow = $(window).scrollTop();
	        if (imagePos < topOfWindow+800) {
	            $(this).addClass("fadeIn");
	        }
	    });
	});
		$(window).scroll(function() {
			$('.rotate-In-L').each(function(){
				var imagePos = $(this).offset().top;
				var topOfWindow = $(window).scrollTop();
				if (imagePos < topOfWindow+650) {
					$(this).addClass("rotateInDownLeft");
				}
			});
		});
		$(window).scroll(function() {
			$('.rotate-In-R').each(function(){
				var imagePos = $(this).offset().top;
				var topOfWindow = $(window).scrollTop();
				if (imagePos < topOfWindow+650) {
					$(this).addClass("rotateInDownRight");
				}
			});
		});
		$(window).scroll(function() {
			$('.jack-In').each(function(){
				var imagePos = $(this).offset().top;
				var topOfWindow = $(window).scrollTop();
				if (imagePos < topOfWindow+650) {
					$(this).addClass("jackInTheBox");
				}
			});
		});
		$(window).scroll(function() {
			$('.fade-In-Btn').each(function(){
				var imagePos = $(this).offset().top;
				var topOfWindow = $(window).scrollTop();
				if (imagePos < topOfWindow+650) {
					$(this).addClass("fadeInUpBigBtn");
				}
			});
		});
})

jQuery(document).ready(function() {
		jQuery("a.scrollto").click(function () {
				elementClick = jQuery(this).attr("href")
				destination = jQuery(elementClick).offset().top;
				jQuery("html:not(:animated),body:not(:animated)").animate({scrollTop: destination}, 1100);
				return false;
		});
});
