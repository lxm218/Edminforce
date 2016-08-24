
let Base = KG.getClass('Base');
KG.define('EF-Log', class extends Base {
    defineDBSchema() {
        return {
            type : KG.schema.default(),
            schoolID : KG.schema.default({
                optional : true
            }),
            logData: {
                type: Object,
                optional: true,
                blackbox: true
            },
            createTime : KG.schema.createTime()
        }        
    }
});
