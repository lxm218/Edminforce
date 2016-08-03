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
            blockOutDay : KG.schema.default({
                type : [Date],
                optional : true
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
            // recurring session, no start / end date
            recurring: {
                type: Boolean,
                optional: true,
                defaultValue: false
            },
            createTime : KG.schema.createTime(),
            updateTime : KG.schema.updateTime()
        };
    }

    defineCronJob(){
        let self = this;
        return [
            {
                name : 'Make session date to expired',
                schedule: function (parser) {
                    return parser.text('every 5 min');
                },
                job : function(){
                    let now = new Date();
                    self._db.update({
                        registrationStatus : 'Yes',
                        registrationEndDate : {
                            '$lt' : now
                        }
                    }, {
                        '$set' : {
                            registrationStatus : 'No'
                        }
                    }, {multi : true});
                }
            }
        ];
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
            return KG.result.out(false, e, e.toString());
        }
    }
    updateById(data, id){
        if(!data.registrationEndDate){
            data.registrationEndDate = data.endDate;
        }

        try{
            let rs = this._db.update({_id:id}, {'$set':data}, function(err){
                throw err;
            });
            return KG.result.out(true, rs);
        }catch(e){
            return KG.result.out(false, e, e.toString());
        }
    }

    defineMeteorMethod(){
        return {
            copyClassFromSession : function(fromSessionID, toSessionID){
                let m = KG.DataHelper.getDepModule();
                let classList = m.Class.getDB().find({
                    sessionID : fromSessionID
                }).fetch();

                if(classList.length < 1){
                    return KG.result.out(false, new Meteor.Error('error', 'No record'));
                }

                for(let i=0,len=classList.length; i<len; i++){
                    let item = classList[i];
                    item.sessionID = toSessionID;

                    //make numberOfRegister value is 0
                    item.numberOfRegistered = 0;

                    delete item._id;
                    delete item.createTime;
                    delete item.updateTime;
console.log(item);
                    m.Class.getDB().insert(item);
                }


                return KG.result.out(true, 'ok');
            }
        };
    }
});