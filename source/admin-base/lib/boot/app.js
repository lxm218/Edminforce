
App.debug = Meteor.settings.public.debug;
if(!App.debug && Meteor.isClient){
    console.log = function(){};
}