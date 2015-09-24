/**
 * Created on 9/22/15.
 */

{


    Cal.CEBillingAndPayment = React.createClass({

        mixins: [ReactMeteorData],
        getMeteorData() {


            Meteor.subscribe("historyShoppingCart", 'account1');
            Meteor.subscribe("nowShoppingCart", 'account1');



            //status==done
            let historyBillings = DB.ShoppingCart.find({
                accountId: 'account1',
                status: 'done'
            }).fetch()

            //尚未支付的订单 status  [active , checking]
            //active还未选择支付方式  checking已选择pay－now or pay－in－store
            let nowBillings = DB.ShoppingCart.find({
                accountId: 'account1',
                status: {
                    $in: ['status', 'checking']
                }
            }).fetch()



            return {
                historyBillings: historyBillings,
                activeBillings: nowBillings
            }
        },

        ///actions

        render() {
            return <RC.Tabs className="bg-white">
                <div label="current billing" className="padding">
                    <h1>
                        current
                    </h1>
                </div>
                <div label="history pament" className="padding">
                    <h1>
                        history
                    </h1>
                    {
                        this.data.historyBillings.map(function (cart) {

                            return <div className="row">
                                <div className="col">
                                    {cart.accountId}
                                </div>
                                <div className="col">
                                    {
                                        cart.items.map(function(item){

                                            return <div>
                                                {item.swimmerId}|
                                                {item.classId}
                                            </div>
                                        })
                                    }

                                </div>
                            </div>
                        })

                    }

                </div>
            </RC.Tabs>
        }
    })

}

