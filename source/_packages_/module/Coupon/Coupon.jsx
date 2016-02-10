let Base = KG.getClass('Base');
KG.define('EF-Coupon', class extends Base{
    defineDBSchema(){
        return Schema.Coupon;
    }


    save(data){
        data._id = Meteor.uuid();
        try{
            let rs = this._db.insert(data, function(err){
                throw err;
            });
            return KG.result.out(true, rs);
        }catch(e){
            return KG.result.out(false, e, e.reason||e.toString());
        }
    }

    updateById(data, id){

    }
});