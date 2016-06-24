let Base = KG.getClass('Base');
let ClassLevel = class extends Base{
    defineDBSchema(){
        return Schema.ClassLevel;
    }
}

KG.define('EF-ClassLevel', ClassLevel);