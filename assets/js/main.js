---
---
{% include js/jquery.timeago.js %}
jQuery(document).ready(function() {
  jQuery("time.ooo_ago").timeago();
});


var window_width = $(window).width();
var window_height = $(window).height();

{% include js/fontawesome-all.min.js %}


// footer margin if mobile nav_el
function mobile_nav(){
  if ( $('.ooo_mobile_nav').css('display') == 'flex' ) {
    if ( !( $('footer').hasClass('mobile') ) ) {
      const nav_height = $('.ooo_mobile_nav').outerHeight();
      $('footer').addClass('mobile').css('padding-bottom', 'calc(' + nav_height + 'px + 30px)');
    }
  } else {
    if ( $('footer').hasClass('mobile') ) {
      $('footer').removeClass('mobile').css('padding-bottom', '30px');
    }
  }
}
mobile_nav();

$( window ).resize(function() {
  if( $(window).width() != window_width || $(window).height() != window_height ){
    mobile_nav();
  }
});
