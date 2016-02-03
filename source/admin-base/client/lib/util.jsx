
var util = {};
_.extend(util, _);

_.extend(util, {
    goPath : function(url){
        FlowRouter.go(url);
    },

    renderLoading : function(opts){
        opts = _.extend({
            isReady : false
        }, opts||{});
        return <RC.Loading {... opts} />;
    }
});

util.const = {
    //TODO input to module
    'StudentStatus' : ['Active', 'Inactive'],
    'Gender' : ['Male', 'Female'],

    dateFormat : 'MM/DD/YYYY'
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
