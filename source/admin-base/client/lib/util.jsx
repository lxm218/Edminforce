
var util = {};
_.extend(util, _);

_.extend(util, {
    goPath : function(url){
        FlowRouter.go(url);
    },

    //renderLoading : function(opts){
    //    opts = _.extend({
    //        isReady : false
    //    }, opts||{});
    //    return <RC.Loading {... opts} />;
    //},
    renderLoading : function(opts){
        opts = _.extend({
            isReady : false
        }, opts||{});


        return <div className="sk-spinner sk-spinner-three-bounce">
            <div className="sk-bounce1"></div>
            <div className="sk-bounce2"></div>
            <div className="sk-bounce3"></div>
        </div>;
    },
    getReactDomNode : function(reactObj){
        return ReactDOM.findDOMNode(reactObj);
    },
    getReactJQueryObject : function(reactObj){
        return $(util.getReactDomNode(reactObj));
    },

    addDollerSign : function(num){
        var tmp = num;
        if(tmp < 0){
            return '-$'+Math.abs(tmp);
        }
        else{
            return '$'+tmp;
        }
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

util.email = KG.util.email;


let MSGALL = {};
util.message = {
    init : false,
    register : function(name, fn){
        let all = MSGALL;
        all[name] = fn;

        if(this.init){
            return;
        }

        Dispatcher.register(function(param){
            if(all[param.actionType]){
                all[param.actionType].call(null, param);
            }
        });
        this.init = true;
    },
    publish : function(name, param){
        let data = {
            actionType : name
        };
        param = param || {};
        param = _.isObject(param) ? param : {data:param};
        _.extend(data, param);

        Dispatcher.dispatch(data);
    }
};

util.toast = {
    showError(msg){
        util.message.publish('KG:show-error-message', {
            error : msg
        });
    },
    alert(msg){
        util.message.publish('KG:show-toast-message', {
            toast : msg || ''
        });
    }
};




window.util = util;
