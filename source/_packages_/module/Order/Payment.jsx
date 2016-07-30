let Base = KG.getClass('Base');
KG.define('EF-Payment', class extends Base {
    defineDBSchema() {
        return Schema.Order;
    }
})