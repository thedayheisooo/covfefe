{% if jekyll.environment == "production" %}
  var gaProperty = '{{site.google-analytics.tracking-code}}';
{% else %}
  var gaProperty = 'UA-XXXXXXX-X';
{% endif %}

var disableStr = 'ga-disable-' + gaProperty;
if (document.cookie.indexOf(disableStr + '=true') > -1) {
  window[disableStr] = true;
}
function gaOptout() {
expiration_date = new Date();
expiration_date.setTime(expiration_date.getTime()+(1000*60*60*24*30));
document.cookie = disableStr + '=true; expires=' + expiration_date + '; path=/';
window[disableStr] = true;
}

if (document.cookie.indexOf('gaIgnore=true') > -1) {
  window[gaIgnore] = true;
}

function gaIgnore(){
  document.cookie = 'gaIgnore=true; expires=Thu, 31 Dec 2099 23:59:59 UTC; path=/';
  window[gaIgnore] = true;
}
