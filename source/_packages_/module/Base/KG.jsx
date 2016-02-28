let All = {},
    AllClass = {};
KG = {
    define : function(name, cls){
        if(All[name]){
            throw new Error(name + 'is exist');
        }


        AllClass[name] = cls;

        return cls;
    },

    create : function(name, opts){
        var cls = KG.getClass(name);

        All[name] = new cls(name, opts);
        console.log('['+name+'] class is create success');

        return All[name];
    },

    getAll : function(){
        return All;
    },

    get : function(name){
        return All[name] || null;
    },

    getClass : function(name){
        let rs = AllClass[name];
        if(!rs){
            throw new Error(name + 'class is not exist');
        }
        return AllClass[name];
    }
};

KG.const = {
    USERTOKEN : 'Meteor:user-token',
    CACHELOGINPATH : 'meteor:login-cache-path'
};

KG.schema = {
    default : function(opts){
        return _.extend({
            type : String,
            optional : false
        }, opts||{});
    },
    createTime : function(opts){
        return _.extend({
            type: Date,
            optional : true,
            autoValue: function(){
                if (this.isInsert){
                    return new Date();
                }
            }
        }, opts||{});
    },
    updateTime : function(opts){
        return _.extend({
            type: Date,
            optional : true,
            autoValue: function(){
                if (this.isInsert){
                    return new Date();
                }
                if (this.isUpdate){
                    return new Date();
                }
            }
        }, opts||{});
    }
};

KG.result = {
    out : function(flag, data, text){

        return {
            status : flag,
            data : data,
            statusText : data.reason || text || ''
        };
    },
    handle : function(rs, opts){
        var type = rs.status;

        opts.error = opts.error || function(err, rs){
                console.log(err);
                alert(rs.statusText);
            };

        if(type){
            if(_.isFunction(rs.data)){
                opts.step && opts.step(rs.data, rs.statusText);
            }
            else{
                opts.success && opts.success(rs.data, rs.statusText);
            }


        }
        else{
            opts.error(rs.data, rs);
        }
    }
};


KG.user = {
    isLogin : false,
    current : {},

    loginWithUser : function(user){
        KG.user.isLogin = true;
        KG.user.current = user;
    },
    reset : function(){
        KG.user.isLogin = false;
        KG.user.current = {};
    }
};



//SimpleSchema.debug = true;