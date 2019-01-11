---
sitemap:
  exclude: 'yes'
---
{% include js/slick.min.js %}
{% include js/faq.js %}

$('.ooo_ways__frame').slick({
  infinite: true,
  initialSlide: 0,
  adaptiveHeight: true,
  dots: true,
  appendArrows: $('.ways_parent'),
  nextArrow: '<div class="way__ctrl ctrl_prev"><svg aria-hidden="true" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512"><path fill="currentColor" d="M24.707 38.101L4.908 57.899c-4.686 4.686-4.686 12.284 0 16.971L185.607 256 4.908 437.13c-4.686 4.686-4.686 12.284 0 16.971L24.707 473.9c4.686 4.686 12.284 4.686 16.971 0l209.414-209.414c4.686-4.686 4.686-12.284 0-16.971L41.678 38.101c-4.687-4.687-12.285-4.687-16.971 0z" class=""></path></svg></div>',
  prevArrow: '<div class="way__ctrl ctrl_next"><svg aria-hidden="true" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512"><path fill="currentColor" d="M231.293 473.899l19.799-19.799c4.686-4.686 4.686-12.284 0-16.971L70.393 256 251.092 74.87c4.686-4.686 4.686-12.284 0-16.971L231.293 38.1c-4.686-4.686-12.284-4.686-16.971 0L4.908 247.515c-4.686 4.686-4.686 12.284 0 16.971L214.322 473.9c4.687 4.686 12.285 4.686 16.971-.001z" class=""></path></svg></div>'
});

// calc min-height of video element
function video_frame() {
  const top = $('.ooo_top').outerHeight();
  if ( $('footer').hasClass('mobile') ) {
    var nav = $('.ooo_mobile_nav').outerHeight();
  } else {
    var nav = '0';
  }
  $('.ooo__video').css('min-height', 'calc(100vh - ' + top + 'px - ' + nav + 'px - 200px)');
}
video_frame();

// product image slider
$('#shop_image').slick({
  infinite: true,
  initialSlide: 0,
  dots: true,
  appendDots: $('#shop_image'),
  arrows: false,
  lazyLoad: 'ondemand',
  autoplay: false
})



$( window ).resize(function() {
  if( $(window).width() != window_width || $(window).height() != window_height ){
    open_on_load();
    video_frame();
  }
});
