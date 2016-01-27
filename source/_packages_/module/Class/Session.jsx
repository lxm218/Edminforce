let Base = KG.getClass('Base');
KG.define('EF-Session', class extends Base{

    defineDBSchema(){
        return {
            name : KG.schema.default(),
            startDate : KG.schema.default({
                type : Date
            }),
            endDate : KG.schema.default({
                type : Date
            }),
            registrationStartDate : KG.schema.default({
                type : Date
            }),
            registrationEndDate : KG.schema.default({
                type : Date,
                optional : true
            }),
            registrationStatus : KG.schema.default({
                allowedValues : ['Yes', 'No']
            }),
            createTime : KG.schema.createTime()
        };
    }

    insert(data){
        //TODO validate

        if(!data.registrationEndDate){
            data.registrationEndDate = data.endDate;
        }

        try{
            let rs = this._db.insert(data, function(err){
                throw err;
            });
            return KG.result.out(true, rs);
        }catch(e){
            console.error(e);
            return KG.result.out(false, e, e.toString());
        }
    }
});