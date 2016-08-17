let Base = KG.getClass('Base');
KG.define('EF-Payment', class extends Base {
    defineDBSchema() {
        return Schema.Payment;
    }

    defineCronJob(){
        //create auto billing
        let self = this;
        return [
            {
                name : 'Create recurring order payment',
                schedule: function (parser) {
                    return parser.text('every 1 day');
                },
                job : function(){
                    console.log('[cronjob -- Create recurring order payment]')
                    let m = KG.DataHelper.getDepModule();
                    const DAY = 20;

                    let now = moment(new Date());
                    if(now.date() > DAY){
                        //find add recurring order
                        let orderList = m.Order.getDB().find({
                            recurring : true,
                            type : 'register class',
                            status : 'success'
                        });


                        _.each(orderList.fetch(), (order)=>{
                            self.checkAndCreatePaymentBillingByOrder(order);
                        })

                    }
                }
            }
        ];
    }

    checkAndCreatePaymentBillingByOrder(order){
        let m = KG.DataHelper.getDepModule(),
            self = this;

        if(!order.recurring) return false;

        let autoCreate = (order, date)=>{

            let data = {
                accountID : order.accountID,
                orderID : order._id,
                paymentType : 'holding',
                status : 'waiting',
                amount : order.monthlyAmount,
                createTime : date,
                updateTime : date
            };
            self._db.insert(data);
        };

        //check current month
        let now = moment(new Date());
        let range = [now.clone().startOf('month').toDate(), now.clone().endOf('month').toDate()];

        let currentBilling = self._db.findOne({
            orderID : order._id,
            createTime : {
                $gt : range[0],
                $lte : range[1]
            }
        });
        if(!currentBilling){
            autoCreate(order, now.toDate());
        }

        //check next month
        let nd = now.clone().add(1, 'month');
        range = [nd.clone().startOf('month').toDate(), nd.clone().endOf('month').toDate()];
        let nextBilling = self._db.findOne({
            orderID : order._id,
            createTime : {
                $gt : range[0],
                $lte : range[1]
            }
        });
        if(!nextBilling){
            autoCreate(order, nd.toDate());
        }

    }
});