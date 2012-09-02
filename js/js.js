"use strict";
(function(){
  var mm=$('.main_menu'),sm=mm.clone().
    removeClass('main_menu').
    addClass('main_top').
    appendTo('body');
  $('a').each(function(){
    var ref=this.href.replace(/(.+#)|(.+)/,'');
    if (ref) {
      $(this).click(function(){
        $('html, body').animate({scrollTop:$('#'+ref).offset().top},700);
        document.location.hash=ref;
        return false;
      });
    }
  });
  $(window).scroll(function(){
    if ($(window).scrollTop()>mm.height()+mm.offset().top) {
      sm.show();
    } else {
      sm.hide();
    }
  });
})();