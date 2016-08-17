
App.debug = Meteor.settings.public.debug;
if(!App.debug && Meteor.isClient){
    console.log = function(){};
}


let config = Meteor.settings.public;
App.config = {
    AppName : 'Edminforce Admin',

    poundage : {
        credit : 0.03,
        echeck : 0.0075,
        cash : 0,
        check : 0
    },

    numberOfMonthClass : 4
};

_.extend(App.config, config);

