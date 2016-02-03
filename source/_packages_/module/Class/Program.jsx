
let Base = KG.getClass('Base');
KG.define('EF-Program', class extends Base{
    defineDBSchema(){
        return {
            name : KG.schema.default(),
            description : KG.schema.default({
                optional : true
            }),
            createTime : KG.schema.createTime(),
            updateTime : KG.schema.updateTime()
        };
    }

    addTestData(){
        if(this._db.find({}).count() > 0){
            return false;
        }
        let data = TestData.Program;

        _.each(data, (item)=>{
            this._db.insert(item);
        }, this);
    }


    // insert api
    insert(data){
        //TODO validate

        try{
            var rs = this._db.insert(data, function(err){
                throw err;
            });
            return KG.result.out(true, rs);
        }catch(e){
            return KG.result.out(false, e, e.toString());
        }

    }

    updateById(data, id){
        try{
            var rs = this._db.update({_id:id}, {'$set':data}, function(err){
                throw err;
            });
            return KG.result.out(true, rs);
        }catch(e){
            return KG.result.out(false, e, e.toString());
        }
    }

    removeById(id, callback){
        let one = this._db.findOne({_id:id});
        if(!one){
            return KG.result.out(false, {}, '纪录不存在');
        }

        //check can delete or not
        let tmp = this.getClassModule().callMeteorMethod('isProgramExist', [id], {
            success : (flag)=>{
                if(flag){
                    callback(false, '在Class表中有包含此Program的纪录，无法删除');
                }
                else{
                    this._db.remove({_id:id});
                    callback(true, {});
                }
            }
        });

    }

    getClassModule(){
        return KG.get('EF-Class');
    }

});