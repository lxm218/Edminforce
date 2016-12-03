
Meteor.startup(function(){
  if(Meteor.isClient){

    var head = document.getElementsByTagName('head')[0];

    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.charset = 'utf-8';
    script.defer = true;
    script.async = true;
    head.appendChild(script)
    script.src='/js-xlsx/xlsx.full.min.js'

  }
})