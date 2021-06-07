$(function () {
    $(window).scroll(function() {
        $('.anim__start__1').each(function(){
            var imagePos = $(this).offset().top;
//  знаем высоту от начала страницы до необходимого блока
            var topOfWindow = $(window).scrollTop();
//  узнаем высоту от начала страницы
            if (imagePos < topOfWindow+650) {
                $(this).addClass("anim__features__1");
            }
        });
        $('.anim__start__2').each(function(){
            var imagePos = $(this).offset().top;
            var topOfWindow = $(window).scrollTop();
            if (imagePos < topOfWindow+650) {
                $(this).addClass("anim__features__2");
            }
        });
    });






})