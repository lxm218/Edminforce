
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



});