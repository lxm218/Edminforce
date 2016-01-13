
let Base = KG.getClass('Base');
let Class = class extends Base{
    defineDBSchema(){
        return {
            name : KG.schema.default(),
            status : KG.schema.default({
                defaultValue : 'active'
            }),
            length : KG.schema.default(),
            level : KG.schema.default({
                optional : true
            }),
            teacher : KG.schema.default({
                type : [String],
                optional : true
            }),
            schedule : KG.schema.default({
                optional : true
            }),
            frequency : KG.schema.default({
                optional : true
            }),
            tuition : KG.schema.default({
                optional : true
            }),
            minAge : KG.schema.default({
                type : Number,
                optional : true
            }),
            maxAge : KG.schema.default({
                type : Number,
                optional : true
            }),
            maxStudent : KG.schema.default({
                type : Number,
                optional : true
            }),
            genderRequire : KG.schema.default({
                allowedValues : ['all', 'boy', 'girl'],
                defaultValue : 'all'
            }),
            customerType : KG.schema.default({
                optional : true
            }),
            startTime : KG.schema.default({
                type : Date,
                optional : true
            }),
            endTime : KG.schema.default({
                type : Date,
                optional : true
            }),
            createTime : KG.schema.default({
                type: Date,
                autoValue: function(){
                    if (this.isInsert){
                        return new Date();
                    }
                }
            })
        };
    }
    addTestData(){
        if(this._db.find({}).count() > 0){
            return false;
        }
        let data = [
            {
                name : 'Hip Hop I',
                length : '60 min',
                teacher : ['Jason'],
                schedule : 'Wed 3:00pm',
                maxStudent : 10
            },
            {
                name : 'Ballet II',
                length : '60 min',
                teacher : ['Erica'],
                schedule : 'Tuesday 4:00pm',
                maxStudent : 8
            },
            {
                name : 'Hip Hop II',
                length : '50 min',
                teacher : ['Jason'],
                schedule : 'Web 4:00pm',
                maxStudent : 10
            }
        ];

        let self = this;
        _.each(data, function(item){
            self._db.insert(item);
        });

    }
};

KG.define('EF-Class', Class);