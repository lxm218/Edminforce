
let Base = KG.getClass('Base');
KG.define('EF-Order', class extends Base{
    defineDBSchema(){
        return Schema.Order;
    }


    updateById(data, id){
        try{
            let rs = this._db.update({_id : id}, {'$set' : data});
            return KG.result.out(true, rs);
        }catch(e){
            return KG.result.out(false, e, e.reason);
        }
    }
});