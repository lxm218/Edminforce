let Base = KG.getClass('Base');
let Student = class extends Base{
    defineDBSchema(){
        return Schema.Student;
    }
    addTestData(){
        //this._db.remove({});
        if(this._db.find({}).count() > 0){
            return false;
        }
        let data = [
            {
                accountID : 'test AccountID',
                accountName : 'test AccountName',
                nickName : 'Emma',
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

    publishMeteorData(){
        let self = this;
        Meteor.publish(this._name, function(query, sort){
            query = query || {};
            sort = sort || {};
            return self._db.find(query, sort);
        });
    }
};

KG.define('EF-Student', Student);