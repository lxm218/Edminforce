let Base = KG.getClass('Base');
KG.define('EF-Coupon', class extends Base{
    defineDBSchema(){
        return Schema.Coupon;
    }

    defineMeteorMethod(){
        return {
            checkRecordById(id){
                return !!this._db.findOne({_id: id});
            }
        };
    }

    insert(data){

        try{
            let rs = this._db.insert(data, function(err){
                throw err;
            });
            return KG.result.out(true, rs);
        }catch(e){
            return KG.result.out(false, e, e.reason||e.toString());
        }
    }

    insertWithCallback(data, callback){
        let self = this;
        if(!data._id){
            //data._id = Meteor.uuid();
            return callback(KG.result.out(false, new Meteor.Error(-601, 'Coupon Code is require')));
        }
        this.callMeteorMethod('checkRecordById', [data._id], {
            context : this,
            success : function(flag){
                if(flag){
                    return callback(KG.result.out(false, new Meteor.Error(-602, 'Coupon Code is exist')));
                }
                else{
                    return callback(this.insert(data));
                }
            }
        });

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