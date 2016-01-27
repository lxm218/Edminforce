
let Base = KG.getClass('Base');
KG.define('EF-Program', class extends Base{
    defineDBSchema(){
        return {
            name : KG.schema.default(),
            description : KG.schema.default({
                optional : true
            }),
            createTime : KG.schema.createTime()
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

});