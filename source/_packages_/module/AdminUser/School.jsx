let Base = KG.getClass('Base');

KG.define('EF-School', class extends Base{
    defineDBSchema(){
        return {
            'name' : KG.schema.default({
                optional : true
            }),
            'email' : KG.schema.default({
                optional : true
            }),
            'phone' : KG.schema.default({
                optional : true
            }),
            'address' : KG.schema.default({
                optional : true
            }),
            'city' : KG.schema.default({
                optional : true
            }),
            'state' : KG.schema.default({
                optional : true
            }),
            'zipcode' : KG.schema.default({
                optional : true
            }),
            // class forth site url
            'classforthUrl':KG.schema.default({
                optional : true
            }),

            // school id that is used as unique id in multi-tenant url
            // such classforth.com/kidsart
            // this is required
            sid: KG.schema.default({
                    optional : false
            }),

            domain : KG.schema.default({
                optional : true
            }),
            timezone : KG.schema.default({
                optional : true,
                type : Number,
                defaultValue : 0
            }),
            timezoneString : KG.schema.default({
                optional : true,
                defaultValue : ''
            }),
            createTime : KG.schema.createTime(),
            updateTime : KG.schema.updateTime()
        };
    }

    initVar(){
        super.initVar();

        this.id = 'AdminSchoolID';
    }

    addTestData(){

        if(this._db.find({}).count() < 1){
            //this._db.remove({});

            let data = {
                name : 'Class Forth',
                email : 'contract@classforth.com',
                sid : this.id,
                _id : this.id
            };
            this._db.insert(data);
        }
    }

    getInfo(schoolID){
        let id = schoolID || this.id;
        if(!id){
            id = Meteor.user().schoolID;
        }
        let rs = this._db.findOne({_id : id});
        rs.allAddress = '';
        if(rs.address){
            rs.allAddress += rs.address+' ';
        }
        if(rs.city){
            rs.allAddress += rs.city+' ';
        }
        if(rs.state){
            rs.allAddress += rs.state+' ';
        }
        if(rs.zipcode){
            rs.allAddress += rs.zipcode;
        }


        return rs;
    }

    setInfo(data){
        let id = this.id;
        try{
            let rs = this._db.update({_id : id}, {'$set' : data});
            return KG.result.out(true, rs);
        }catch(e){
            return KG.result.out(false, e, e.reason);
        }
    }

    defineMeteorMethod(){
        let self = this;
        return {
            addSchool : function(data){
                return self._db.insert(data);
            }
        };
    }
});