
let Base = KG.getClass('Base');
KG.define('EF-Log', class extends Base {
    defineDBSchema() {
        return {
            type : KG.schema.default(),
            logData: {
                type: Object,
                optional: true,
                blackbox: true
            },
            createTime : KG.schema.createTime()
        }        
    }
});
