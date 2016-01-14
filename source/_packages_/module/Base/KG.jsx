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

    create : function(name){
        var cls = KG.getClass(name);

        All[name] = new cls(name);
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

KG.schema = {
    default : function(opts){
        return _.extend({
            type : String,
            optional : false
        }, opts||{});
    }
};

KG.result = {
    out : function(flag, data, text){
        return {
            status : flag,
            data : data,
            statusText : text || ''
        };
    },
    handle : function(rs, opts){
        var type = rs.status;

        opts.error = opts.error || function(){
                alert(rs.statusText);
            };

        if(type){
            opts.success && opts.success(rs.data, rs);
        }
        else{
            opts.error(rs.data, rs);
        }
    }
};