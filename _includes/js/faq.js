function close_faq() {
  $('.faq_el.open').removeClass('open').children('.faq__a').css('height', '0');
}

function open_faq(el) {
  $('.faq_el.open').removeClass('open').children('.faq__a').css('height', '0');
  let a_height = el.find('.faq__a__inner').first().height();
  el.addClass('open').children('.faq__a').first().css('height', a_height + 10);
}

$('.faq_el').click( function(){
  var el = $(this);
  if ( el.hasClass('open') ) {
    close_faq();
  } else {
    open_faq(el);
  }
});

function open_on_load() {
  var el = $('.faq_el').first();
  open_faq(el);
}
open_on_load();
