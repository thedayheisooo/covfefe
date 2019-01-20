$(window).on('load', function() {
  setTimeout(
    function(){
      if (!window[disableStr] && !window[gaIgnore]) {
        $('#ooo_analytics').css('display','block');
        setTimeout( /* fix which allows display to change before addClass gets executed */
          function(){
            $('#ooo_analytics').addClass('ooo_active');
            setTimeout( function(){
              $('.ooo_active').css('transition', 'none');
            }, 500);
        }, 500);

        function close_ga_notify(){
          $('#ooo_analytics').removeClass('ooo_active').css('transition', 'all 0.4s ease-in-out')
          setTimeout(function(){
            $('#ooo_analytics').css('display','none')
          }, 500) /* 400 for animation + 100 as buffer */
        }

        $("#ooo_close, #ooo_ignore-bttn").click(function(){
          gaIgnore();
          close_ga_notify();
        });

        $('#ooo_optOut').click(function(){
          gaOptout();
          close_ga_notify();
        });

      } /* end if not disabled and not ignored */

  }, 1000); /* end Timeout & function */
}) /* end window onload */
