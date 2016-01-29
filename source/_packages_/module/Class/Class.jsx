
let Base = KG.getClass('Base');
let Class = class extends Base{
    defineDBSchema(){
        return Schema.Class;
    }
    addTestData(){
        this._db.remove({});
        if(this._db.find({}).count() > 0){
            return false;
        }
        let data = TestData.Class;

        let self = this;
        _.each(data, function(item){
            self._db.insert(item);
        });

    }

    getClassMaxStudent(classID){
        let one = this._db.findOne({_id: classID});
        return one.maxStudent;
    }
};

KG.define('EF-Class', Class);