$(document).ready(function () {
    /*모바일 높이*/
    document.documentElement.style.setProperty("--vh", window.innerHeight * 0.01 + 'px');
    $(window).resize(function () {
        document.documentElement.style.setProperty("--vh", window.innerHeight * 0.01 + 'px');
    });

    if (window.matchMedia("(min-width: 768px)").matches) {
        new WOW().init();
    }

    var specificArea = document.querySelector('.page_wrap.main .special_sect .box > *');

    if (window.matchMedia("(max-width: 768px)").matches && specificArea) {
        var wow = new WOW();
        wow.init();
        wow.add(specificArea);
    }





    /*header*/
    $('.gnb_bg').css('width',$('body').innerWidth());
    $(window).resize(function(){
        $('.gnb_bg').css('width',$('body').innerWidth());
    });


    //top_btn
    $(".top_btn").click(function () {
        $('html, body').animate({
            scrollTop: 0
        }, 400);
        return false;
    });

    $("select").niceSelect()

    $(".modal").click(function (e){
        var target = e.target;
        if ($(target).hasClass("scroll_box") || $(target).hasClass("modal") ) {
            if ($('.modal').length > 0) {
                modalClose();
            }else{
                modalClose();
            }
        }
    });




});


