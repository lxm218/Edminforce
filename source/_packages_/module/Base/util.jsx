

KG.util = {};

KG.util.email = {
    getDomain : function(address){
        let reg = /@([^\.]*)/;
        let rs = address.match(reg);

        return rs[1] || null;
    }
};