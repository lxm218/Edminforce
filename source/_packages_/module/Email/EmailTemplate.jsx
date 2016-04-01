
let Base = KG.getClass('Base');
KG.define('EF-EmailTemplate', class extends Base{
    defineDBSchema(){
        return {
            name : KG.schema.default(),
            html : KG.schema.default(),
            createTime : KG.schema.createTime(),
            updateTime : KG.schema.updateTime()
        };
    }

    insert(data){
        data.html = encodeURIComponent(data.html);

        return super.insert(data);
    }




    /*
    * @param
    * {user} will replace with opts.user
    *
    * */
    getHtml(id, opts={}){
        let html = this._db.findOne({_id:id});

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