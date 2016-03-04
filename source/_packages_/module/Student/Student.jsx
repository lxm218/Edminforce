let Base = KG.getClass('Base');
let Student = class extends Base{
    defineDBSchema(){
        return Schema.Student;
    }
    addTestData(){
        //this._db.remove({});
        if(true || this._db.find({}).count() > 0){
            return false;
        }
        let data = [
            {
                accountID : 'test AccountID',
                accountName : 'test AccountName',
                nickName : 'Emma',
                name : 'Emma',
                profile : {
                    birthday : moment('20010101', 'YYYYMMDD').toDate(),
                    gender : 'Female'
                },
                status : 'Active'
            },
            {
                accountID : 'test AccountID',
                accountName : 'test AccountName',
                nickName : 'Sherry',
                name : 'Sherry',
                profile : {
                    birthday : moment('20071030', 'YYYYMMDD').toDate(),
                    gender : 'Female'
                },
                status : 'Active'
            },
            {
                accountID : 'test AccountID',
                accountName : 'test AccountName',
                nickName : 'Tom1',
                name : 'Tom1',
                profile : {
                    birthday : moment('19901111', 'YYYYMMDD').toDate(),
                    gender : 'Male'
                },
                status : 'Inactive'
            }
        ];

        let self = this;
        _.each(data, function(item){
            self._db.insert(item);
        });

    }

    getDepModule(){
        return {
            customer : KG.get('EF-Customer')
        };
    }

    getAll(query, option){
        let list = this._db.find(query||{}, option||{}).fetch();

        let {customer} = this.getDepModule();

        return _.map(list, (item)=>{
            item.age = '';
            if(item.profile.birthday){
                item.age = moment().year() - moment(item.profile.birthday).year()
            }

            //find family name
            let tmp = customer.getDB().findOne({_id:item.accountID});
            if(tmp){
                item.accountName = tmp.name;
            }

            item.nickName = item.nickName || item.name || '';

            return item;
        });
    }

    insert(data){

        if(data.nickName){
            data.name = data.nickName;
        }

        try{
            let rs = this._db.insert(data, function(err){
                if(err) throw err;
            });
            return KG.result.out(true, rs);
        }catch(e){
            return KG.result.out(false, e, e.reason||e.toString());
        }
    }


};

KG.define('EF-Student', Student);