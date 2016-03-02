
let Base = KG.getClass('Base');
KG.define('EF-Order', class extends Base{
    defineDBSchema(){
        return Schema.Order;
    }


});