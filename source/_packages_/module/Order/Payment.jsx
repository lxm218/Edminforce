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
                    //return parser.text('every 1 day');
                    return parser.text('every 10 min');
                },
                job : function(){
                    console.log('[cronjob -- Create recurring order payment]')
                    let m = KG.DataHelper.getDepModule();
                    const DAY = 20;

                    let now = moment(new Date());
                    if(true || now.date() > DAY){
                        //find add recurring order
                        let orderList = m.Order.getDB().find({
                            recurring : true,
                            type : {$in : ['register class', 'change class'] },
                            status : 'success'
                        });


                        _.each(orderList.fetch(), (order)=>{
                            try{
                                self.checkAndCreatePaymentBillingByOrder(order);
                            }catch(e){}

                        })

                    }
                }
            }
        ];
    }

    checkAndCreatePaymentBillingByOrder(order){
        if(Meteor.isClient){
            throw KG.const.ONLYCALLINSERVERSIDE;
        }

        let m = KG.DataHelper.getDepModule(),
            self = this;

        if(!order.recurring) return false;

        let autoCreate = (order, date)=>{

            let data = {
                schoolID : order.schoolID,
                accountID : order.accountID,
                orderID : order._id,
                paymentType : 'holding',
                status : 'waiting',
                amount : order.monthlyAmount,
                month : moment(date).format(KG.const.monthFormat)
            };
            self._db.insert(data);
        };

        //check current month
        //if(!self.checkBillExistForDateMonth(order._id, new Date())){
        //    autoCreate(order, new Date());
        //}

        //check next month
        let nd = moment(new Date()).add(1, 'month');
        if(!self.checkBillExistForDateMonth(order._id, nd)){
            autoCreate(order, nd.toDate());
        }

    }

    checkBillExistForDateMonth(orderID, date){
        if(Meteor.isClient){
            throw KG.const.ONLYCALLINSERVERSIDE;
        }

        data = date || new Date();

        let m = KG.DataHelper.getDepModule(),
            self = this;

        let now = moment.isMoment(date) ? (date) : moment(date);
        let month = now.format(KG.const.monthFormat);

        let currentBilling = self._db.findOne({
            orderID : orderID,
            month : month
        });

        return !!currentBilling;
    }
});