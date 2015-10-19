/**
 * Created on 9/22/15.
 */

{


    Cal.CEBillingAndPayment = React.createClass({

        mixins: [ReactMeteorData],
        getMeteorData() {


            Meteor.subscribe("historyShoppingCart", Meteor.userId());
            Meteor.subscribe("nowShoppingCart", Meteor.userId());



            //status==done
            let historyBillings = DB.ShoppingCart.find({
                accountId: Meteor.userId(),
                status: 'done'
            }).fetch()

            //尚未支付的订单 status  [active , checking]
            //active还未选择支付方式  checking已选择pay－now or pay－in－store
            let unfinishedBillings = DB.ShoppingCart.find({
                accountId: Meteor.userId(),
                status: {
                    $in: ['active', 'checking','applied']
                }
            }).fetch()

            debugger

            return {
                historyBillings: historyBillings,
                unfinishedBillings: unfinishedBillings
            }
        },

        ///actions


        render() {

            //<Cal.BillingUnfinished unfinishedBillings={this.data.unfinishedBillings}/>
            //<Cal.CRRegBillingPage />


            return <RC.Tabs className="bg-white">
                <div label="Pending Billing" className="padding">

                    <Cal.BillingUnfinished unfinishedBillings={this.data.unfinishedBillings}/>

                </div>
                <div label="History Payment" className="padding">

                    {
                        this.data.historyBillings.map(function (cart) {

                            return cart.items.map(function(item){

                                    return <div className="row">
                                            <div className="col">
                                                {item.swimmer &&item.swimmer.name }
                                            </div>
                                            <div className="col">
                                                {item.class1 &&item.class1.name }

                                            </div>
                                        </div>
                                })


                        })

                    }

                </div>
            </RC.Tabs>
        }
    })

}

