
let Base = KG.getClass('Base');
KG.define('EF-EmailTemplate', class extends Base{
    defineDBSchema(){
        return {
            name : KG.schema.default(),
            html : KG.schema.default(),
            schoolID : KG.schema.default({
                optional : true
            }),
            canNotDelete : KG.schema.default({
                type : Boolean,
                optional : true,
                defaultValue : false
            }),
            createTime : KG.schema.createTime(),
            updateTime : KG.schema.updateTime()
        };
    }

    insert(data){
        data.html = encodeURIComponent(data.html);

        return super.insert(data);
    }

    updateById(data, id){
        data.html = encodeURIComponent(data.html);

        try{
            let rs = this._db.update({_id : id}, {'$set' : data});
            return KG.result.out(true, rs);
        }catch(e){
            return KG.result.out(false, e, e.toString());
        }
    }

    initEnd(){
        if(Meteor.isClient) return false;

        const TplList = [
            {
                id : 'ConfirmTrialClassTemplate',
                tpl : 'tpl/ConfirmTrialClass.html'
            },
            {
                id : 'ConfirmRegistrationClassTemplate',
                tpl : 'tpl/ConfirmRegistrationClass.html'
            },
            {
                id : 'ConfirmCancelClassTemplate',
                tpl : 'tpl/ConfirmCancelClass.html'
            },
            {
                id : 'ConfirmChangeClassTemplate',
                tpl : 'tpl/ConfirmChangeClass.html'
            },
            {
                id : 'ConfirmMakeupClassTemplate',
                tpl : 'tpl/ConfirmMakeupClass.html'
            }
        ];

        let loop = (schoolID)=>{
            _.each(TplList, (item)=>{

                let html = Assets.getText(item.tpl);
                let _id = item.id;

                this._db.remove({
                    name : _id,
                    schoolID : schoolID
                });
                let one = this._db.findOne({
                    name : _id,
                    schoolID : schoolID
                });

                if(!one){
                    data = {
                        //_id : _id,
                        name : _id,
                        canNotDelete : true,
                        html : html,
                        schoolID : schoolID
                    };
                    this.insert(data);
                }
            });
        };

        let sc = KG.get('EF-School');
        let s_list = sc.getDB().find().fetch();
        _.each(s_list, (s)=>{
            loop(s._id);
        });

    }



    /*
    * @param
    * {user} will replace with opts.user
    *
    * */
    getHtml(id, opts={}){
        let html = this._db.findOne({
            name:id,
            schoolID : KG.DataHelper.getSchoolID()
        });

        if(!html){
            return '';
        }

        html = decodeURIComponent(html.html);

        let rs = html.replace(/\{([^\}]*)\}/g, function(match, key, index){
            if(opts[key]){
                return opts[key];
            }
            else{
                return match;
            }
        });

        return rs;
    }



});