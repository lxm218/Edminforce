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
            return <RC.Tabs className="bg-white">
                <div label="Unfinished Billing" className="padding">


                    {
                        this.data.unfinishedBillings.map(function (cart) {

                            return <div className="row" key={cart._id}>
                                <div className="col">
                                    {cart.accountId}
                                </div>
                                <div className="col">
                                    {
                                        cart.items.map(function (item) {

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


                    <RC.URL href="/classRegister/RegBillingPage">
                        <RC.Button name="button" type="submit"
                                   onClick={this.formSubmit}
                                   theme="full" buttonColor="brand">
                            Checkout
                        </RC.Button>

                    </RC.URL>


                </div>
                <div label="History Payment" className="padding">

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

