$(document).ready(function () {

//--  ПЛАВНАЯ ПРОКРУТКА К ЯКОРЮ  (Также смотри пример Евгения)  --
	$("a.scroll-to").on("click", function(e){
//  Работает только для ссылок с классом 'scroll-to', или смотри пример Евгения;
		e.preventDefault();
//  Отменяем стандартную обработку нажатия по ссылке, т.е. отменяет быстрый переход по ссылке который есть по умолчанию;
		var id = $(this).attr('href');
//  Забираем идентификатор блока с атрибута href, то есть сам идентификатор, к примеру #first_item;
//  .attr() - Возвращает или изменяет значение атрибутов у выбранных элементов страницы;
		$('html, body').stop().animate({
			scrollTop: $(id).offset().top - 0}, 800);
//  .stop() - Останавливает выполнение текущей анимации (можно без этого);
//  .animate() - Выполняет анимацию, которая была создана пользователем;
//  .scrollTop() / .scrollLeft() - Возвращает/изменяет величину скроллинга (прокрутку) элемента;
// 	В данном случае мы устанавливем величину скроллинга, которая узнается путем обращения к нужному элементу через переменную $(id) и получения координат через .offset().top;
//  .offset() / .position() - С помощью этих функций, можно узнавать координаты элемента на странице. Кроме этого, с помощью offset(), можно изменить координаты элемента;
// 	800 - продолжительность выполнения анимации в мс;
//  Можно указать после минуса высоту фиксированной плавающей шапки, если она есть. Устанавливается чтобы при прокрутке якорный элемент не перекрывался ей. Если фиксированной шапки нет, то значение убирается или устанавливается в 0.
	});


//--  ПОЯВЛЕНИЕ КНОПКИ "В НАЧАЛО СТРАНИЦЫ"  --
	$(window).scroll(function (){
		var scr = $(this).scrollTop();
//  .scroll() - Устанавливает обработчик "прокрутки" элементов документа, либо, запускает это событие;
//  Заносим в переменную на сколько мы проскролили окно браузера;
		if(scr>200){
			$(".btn_up").fadeIn().addClass("fadeInUpBigBtn").removeClass("fadeOutDown");
		}
//  кнопке по умолчанию необходимо задать: display: none;
// 	Добавляем и удаляем классы анимации пояления кнопки;
		else{
			$(".btn_up").fadeOut().addClass("fadeOutDown");
		}
	});


//--  ПОЯВЛЕНИЕ КНОПКИ "В НАЧАЛО СТРАНИЦЫ" при перезагрузке страницы, когда она уже проскролена ниже чем 200 пикселей. --
//  Через $(window).ready(). Возможно есть более простой вариант.
	$(window).ready(function (){
		var scr = $(this).scrollTop();
		if(scr>200){
			$(".btn_up").fadeIn().addClass("fadeInUpBigBtn").removeClass("fadeOutDown");
		}
		else{
			$(".btn_up").fadeOut().addClass("fadeOutDown");
		}
	});


//--  ПОЯВЛЕНИЕ КНОПКИ "В НАЧАЛО СТРАНИЦЫ" для PAGES.html  --
//  Не вносил изменения по примеру выше.
	$(window).scroll(function (){
		var scr = $(this).scrollTop();
		if(scr>5){
			$(".btn_up_1").fadeIn().addClass("fadeInUpBigBtn");
		}
		else{
			$(".btn_up_1").fadeOut();
		}
	});

});


//--  АНИМАЦИЯ ВЫПАДАЮЩИХ РАЗДЕЛОВ САЙТА  --
$(function () {
	$(window).scroll(function() {
	    $('.fadeIn-Down').each(function(){
//  .each - выбираются все элементы на странице, соответсвующие выборке;
	        var imagePos = $(this).offset().top;
//  Узнаем высоту (в переменную) от начала страницы до необходимого блока страницы;
	        var topOfWindow = $(window).scrollTop();
//  Узнаем высоту на сколько проскролена страница от верха;
	        if (imagePos < topOfWindow+650) {
	            $(this).addClass("fadeInDown");
	        }
//  Сравниваем две переменных для появления разделов сайта через добавление необходимого класса анимации;
	    });

		$('.fadeIn-Up').each(function(){
			var imagePos = $(this).offset().top;
			var topOfWindow = $(window).scrollTop();
			if (imagePos < topOfWindow+650) {
				$(this).addClass("fadeInUp");
			}
		});

		$('.note-1').each(function(){
			var imagePos = $(this).offset().top;
			var topOfWindow = $(window).scrollTop();
			if (imagePos < topOfWindow+650) {
				$(this).addClass("fadeInDownBig");
			}
		});

		$('.note-2').each(function(){
			var imagePos = $(this).offset().top;
			var topOfWindow = $(window).scrollTop();
			if (imagePos < topOfWindow+650) {
				$(this).addClass("fadeInRightBig");
			}
		});

		$('.note-3').each(function(){
			var imagePos = $(this).offset().top;
			var topOfWindow = $(window).scrollTop();
			if (imagePos < topOfWindow+650) {
				$(this).addClass("fadeInUpBig");
			}
		});

		$('.note-4').each(function(){
			var imagePos = $(this).offset().top;
			var topOfWindow = $(window).scrollTop();
			if (imagePos < topOfWindow+650) {
				$(this).addClass("fadeInLeftBig");
			}
		});

		$('.fadeIn-Left').each(function(){
			var imagePos = $(this).offset().top;
			var topOfWindow = $(window).scrollTop();
			if (imagePos < topOfWindow+650) {
				$(this).addClass("fadeInLeft");
			}
		});

		$('.fadeIn-Right').each(function(){
			var imagePos = $(this).offset().top;
			var topOfWindow = $(window).scrollTop();
			if (imagePos < topOfWindow+650) {
				$(this).addClass("fadeInRight");
			}
		});

		$('.fade-In').each(function(){
			var imagePos = $(this).offset().top;
			var topOfWindow = $(window).scrollTop();
			if (imagePos < topOfWindow+800) {
				$(this).addClass("fadeIn");
			}
		});

		$('.rotate-In-L').each(function(){
			var imagePos = $(this).offset().top;
			var topOfWindow = $(window).scrollTop();
			if (imagePos < topOfWindow+650) {
				$(this).addClass("rotateInDownLeft");
			}
		});

		$('.rotate-In-R').each(function(){
			var imagePos = $(this).offset().top;
			var topOfWindow = $(window).scrollTop();
			if (imagePos < topOfWindow+650) {
				$(this).addClass("rotateInDownRight");
			}
		});

		$('.jack-In').each(function(){
			var imagePos = $(this).offset().top;
			var topOfWindow = $(window).scrollTop();
			if (imagePos < topOfWindow+650) {
				$(this).addClass("jackInTheBox");
			}
		});

		$('.fade-In-Btn').each(function(){
			var imagePos = $(this).offset().top;
			var topOfWindow = $(window).scrollTop();
			if (imagePos < topOfWindow+650) {
				$(this).addClass("fadeInUpBigBtn");
			}
		});

	});


//--  АНИМАЦИЯ ВЫПАДАЮЩИХ РАЗДЕЛОВ САЙТА, при перезагрузке страницы, когда она уже проскролена.  --
//  Через $(window).ready(). Возможно есть более простой вариант.
	$(window).ready(function() {
		$('.fadeIn-Down').each(function(){
			var imagePos = $(this).offset().top;
			var topOfWindow = $(window).scrollTop();
			if (imagePos < topOfWindow+650) {
				$(this).addClass("fadeInDown");
			}
		});

		$('.fadeIn-Up').each(function(){
			var imagePos = $(this).offset().top;
			var topOfWindow = $(window).scrollTop();
			if (imagePos < topOfWindow+650) {
				$(this).addClass("fadeInUp");
			}
		});

		$('.note-1').each(function(){
			var imagePos = $(this).offset().top;
			var topOfWindow = $(window).scrollTop();
			if (imagePos < topOfWindow+650) {
				$(this).addClass("fadeInDownBig");
			}
		});

		$('.note-2').each(function(){
			var imagePos = $(this).offset().top;
			var topOfWindow = $(window).scrollTop();
			if (imagePos < topOfWindow+650) {
				$(this).addClass("fadeInRightBig");
			}
		});

		$('.note-3').each(function(){
			var imagePos = $(this).offset().top;
			var topOfWindow = $(window).scrollTop();
			if (imagePos < topOfWindow+650) {
				$(this).addClass("fadeInUpBig");
			}
		});

		$('.note-4').each(function(){
			var imagePos = $(this).offset().top;
			var topOfWindow = $(window).scrollTop();
			if (imagePos < topOfWindow+650) {
				$(this).addClass("fadeInLeftBig");
			}
		});

		$('.fadeIn-Left').each(function(){
			var imagePos = $(this).offset().top;
			var topOfWindow = $(window).scrollTop();
			if (imagePos < topOfWindow+650) {
				$(this).addClass("fadeInLeft");
			}
		});

		$('.fadeIn-Right').each(function(){
			var imagePos = $(this).offset().top;
			var topOfWindow = $(window).scrollTop();
			if (imagePos < topOfWindow+650) {
				$(this).addClass("fadeInRight");
			}
		});

		$('.fade-In').each(function(){
			var imagePos = $(this).offset().top;
			var topOfWindow = $(window).scrollTop();
			if (imagePos < topOfWindow+800) {
				$(this).addClass("fadeIn");
			}
		});

		$('.rotate-In-L').each(function(){
			var imagePos = $(this).offset().top;
			var topOfWindow = $(window).scrollTop();
			if (imagePos < topOfWindow+650) {
				$(this).addClass("rotateInDownLeft");
			}
		});

		$('.rotate-In-R').each(function(){
			var imagePos = $(this).offset().top;
			var topOfWindow = $(window).scrollTop();
			if (imagePos < topOfWindow+650) {
				$(this).addClass("rotateInDownRight");
			}
		});

		$('.jack-In').each(function(){
			var imagePos = $(this).offset().top;
			var topOfWindow = $(window).scrollTop();
			if (imagePos < topOfWindow+650) {
				$(this).addClass("jackInTheBox");
			}
		});

		$('.fade-In-Btn').each(function(){
			var imagePos = $(this).offset().top;
			var topOfWindow = $(window).scrollTop();
			if (imagePos < topOfWindow+650) {
				$(this).addClass("fadeInUpBigBtn");
			}
		});

	});

});


//--  АНИМАЦИЯ ДЛЯ СЛАЙДЕРА (about.html)  --
jQuery(function($){
	$(document).ready(function(){
		$('.bxslider').bxSlider({
			mode: 'vertical',
			minSlides: 2,
			slideMargin: 5,
			controls: true,
			nextText: ['<img src="img/down.png"/>'],
			prevText: ['<img src="img/up.png"/>'],
		});
	});
});


//--  Для активации hover эффекта на ТАЧ устройствах  --
document.body.addEventListener('touchstart', function () {});
