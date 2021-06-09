// let burgerMenu = document.querySelector('.menu .menu-btn');
// let nav = document.querySelector('.nav-menu');
// let navAll = document.querySelectorAll('.nav-menu li');
// let logo = document.querySelector('.logo');
// let sign__up = document.querySelector('.sign__up');
// let headbar = document.querySelector('.navbar');

// $(function () {
// 	$('.spoiler-body').hide(300);
// 	$(document).on('click','.spoiler-head','.drop-down',function (e) {
// 		e.preventDefault()
// 		$(this).parents('.spoiler-card').toggleClass("active").find('.spoiler-body').slideToggle();
// 	});
// });



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




// burgerMenu.addEventListener('click', (e) => {
// 	burgerMenu.classList.toggle('active');
// 	nav.classList.toggle('nav-active');
// 	function burgerFixed() {
// 		if (nav.classList.contains('nav-active')) {
// 			burgerMenu.style.position = 'fixed';
// 			burgerMenu.style.top = 31 + 'px';
// 		} else {
// 			burgerMenu.style.position = 'relative';
// 			burgerMenu.style.top = 7 + 'px';
// 		}
// 	}
// 	burgerFixed();
// });

// $(window).resize(function(event) {
// 	adaptive_function();
// });
//
// function adaptive_header(w,h) {
// 	if (w < 561) {
// 		if (!$('.sign__up').hasClass('done')) {
// 			$('.sign__up').addClass('done').appendTo(nav);
// 		}
// 	} else {
// 		if ($('.sign__up').hasClass('done')) {
// 			$('.sign__up').removeClass('done').prependTo($('.navbar'));
// 		}
// 	}
// }
//
// function adaptive_function() {
// 	let w = $(window).outerWidth();
// 	let h = $(window).outerHeight();
// 	adaptive_header(w,h);
// }
//
// adaptive_function();

// let liForButton = document.createElement('li');

// window.addEventListener('resize',function(e) {
// 	adaptive_function();
// });

// function buttonPush(w,h) {
// 	if (window.screen.width < 426) {
// 		if (!sign__up.classList.contains('done')) {
// 			sign__up.classList.add('done');
// 			liForButton.appendChild(sign__up);
// 			nav.appendChild(liForButton);
// 			if (nav.appendChild(liForButton)) {
// 				sign__up.classList.remove('done');
// 			}
// 		} else {
// 			if (sign__up.classList.contains('done')) {
// 				sign__up.classList.remove('done');
// 			}
// 		}
// 	} else {
			
// 	}
// }
// function adaptive_function() {
// 	let w = window.screen.width;
// 	let h = window.screen.height;
// 	buttonPush(w,h)
// }

// adaptive_function();

// function adaptiveHeader() {
// 	if (window.screen.width <= 425) {
// 		if (!sign__up.classList.contains('done')) {
// 			for (let i = 0; i < navAll.length; i++) {
// 				sign__up.classList.add('done');
// 				navAll[i].appendChild(sign__up);
// 			}
// 		}
// 	} else {
// 		if (sign__up.classList.contains('done')) {
// 			for (let i = 0; i < navAll.length; i++) {
// 				sign__up.classList.remove('done');
// 				sign__up.ParentNode.prepend(navAll[i]);
// 			}
// 		}
// 	}
// }

// adaptiveHeader();	


// function slowScroll(id) {
// 	var offset = 20;
// 	$('html, body').animate({
// 		scrollTop: $(id).offset().top - offset
// 	}, 1000);
// 	return false;
// }