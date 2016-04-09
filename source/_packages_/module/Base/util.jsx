

KG.util = {
    setDBOption : function(opts){
        opts = _.extend({
            sort : {},
            pageSize : 10,
            pageNum : 1,
            field : null
        }, opts||{});

        let skip = opts.pageSize * (opts.pageNum-1);
        let option = {
            sort : opts.sort,
            skip : skip,
            limit : opts.pageSize
        };
        if(opts.field){
            option.fields = opts.field;
        };

        return option;
    },
    setDBQuery : function(query){
        _.mapObject(query || {}, (item, key)=>{
            if(_.isObject(item)){
                if(item.type === 'RegExp'){
                    query[key] = new RegExp(item.value, 'i');
                }
            }
        });

        return query;
    }
};

KG.util.email = {
    getDomain : function(address){
        let reg = /@([^\.]*)/;
        let rs = address.match(reg);

        return rs[1] || null;
    }
};