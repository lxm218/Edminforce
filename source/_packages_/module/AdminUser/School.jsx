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
            createTime : KG.schema.createTime()
        };
    }

    initVar(){
        super.initVar();

        this.id = 'AdminSchoolID';
    }

    addTestData(){

        if(this._db.find({}).count() !== 1){
            this._db.remove({});

            let data = {
                name : 'Class Forth',
                email : 'contract@classforth.com',
                _id : this.id
            };
            this._db.insert(data);
        }
    }

    getInfo(){
        let rs = this._db.findOne({_id : this.id});
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
});