/*************************************** HOME PAGE SLIDER **************************************************/
$(document).ready(function(){
    $(".owl-carousel").owlCarousel({
        items: 1,
        loop: true,
        nav: false,
        dots: true,
        autoplay: true,
        autoplayTimeout: 3000,
        animateOut: 'fadeOut',
        animateIn: 'fadeIn',
        responsive:{
            480:{
                items:1
            },
            720:{
                items:1
            },
            1024:{
                items:1
            },
            1600:{
              items:1
            }
        }
    });
  
    $('.single_slider').each(function(){
        var bgImg = $(this).data('bgimg');
        if(bgImg){
            $(this).css('background-image', 'url(' + bgImg + ')');
        }
    });
  });

/************************************ 4 SLIDER *********************************************/

$(".blog_wrapper").owlCarousel({
    autoplay: true,
    loop: true,
    nav: true,
    autoplayTimeout: 3000,
    items: 3,
    dots: false,
    margin: 30,
    responsiveClass: true,
    responsive: {
      0: {
        items: 1,
      },
      768: {
        items: 2,
      },
      992: {
        items: 3,
      },
    },
});

document.getElementById('hamburger').addEventListener('click', function() {
    document.getElementById('nav_list').classList.toggle('active');
});