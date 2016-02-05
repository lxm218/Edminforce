
let Base = KG.getClass('Base');
KG.define('EF-Customer', class extends Base{
    defineDBSchema(){
        return Schema.Customer;
    }

    addTestData(){
        //this._db.remove({});
        if(this._db.find().count() > 0){
            return;
        }

        let data = [
            {
                name : 'Jacky Lee',
                email : 'liyangwood@gmail.com',
                phone : '1122334455'
            },
            {
                name : 'Ying Zhang',
                email : 'xxx@xxx.xxx',
                phone : '5108897763'
            }
        ];

        _.each(data, (item)=>{
            this._db.insert(item);
        });
    }

    getAll(query, option){

        let rs = this._db.find(query||{}, option||{}).fetch();

        return rs;

    }
});