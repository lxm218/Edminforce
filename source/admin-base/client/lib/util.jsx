
var util = {};
_.extend(util, _);

_.extend(util, {
    goPath : function(url){
        FlowRouter.go(url);
    }
});

util.const = {
    //TODO input to module
    'StudentStatus' : ['Active', 'Inactive'],
    'Gender' : ['Male', 'Female']
};

util.dialog = {
    confirm : function(opts){
        if(confirm(opts.msg)){
            opts.YesFn();
        }
    },
    alert : function(msg){
        alert(msg);
    }
};



window.util = util;
