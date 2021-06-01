$(document).ready(function (){

    $('#nav').on('click','a', function (e){
        let li = $('.gallery li');
        li.each(function (index, elem){
            $(elem).css('display', 'block')
        })
        e.preventDefault()
        let id = e.currentTarget.id
        li.each(function (index, elem){
            if(id === 'all'){
                $(elem).css('display', 'block')
            }
            else if(id !== elem.dataset.collection){
                $(elem).css('display', 'none')
            }
        })
    })


    $('.fa-bars').click(function (){
        $("#menu").css('left', 0);
        $(this).css('display', 'none');
        $('.fa-times').css('display', 'block');
    })

    $('.fa-times').click(function (){
        $("#menu").css('left', '-80%');
        $(this).css('display', 'none');
        $('.fa-bars').css('display', 'block');
    })




})
