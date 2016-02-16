{

    // Don't forget to change `SomeName` to correct name
    EdminForce.Components.Payment = class extends RC.CSSMeteorData {

        getMeteorData() {

            let handler = null;

            //let programID =
            Tracker.autorun(function () {
                handler = Meteor.subscribe("EF-ShoppingCarts-Checkout");
            }.bind(this));

            return {
                isReady:handler.ready()
            }
        }

        pay(){


            let orderID = FlowRouter.getQueryParam("order");

            EdminForce.Collections.orders.update({
                "_id":orderID
            }, {
                $set:{
                    "_id": orderID,
                    status:"checkouted"
                }
            }, function(err, res){
               if(err) {
                   console.error("[Error] update order fail: ", err);
               }else{
                   console.log("[Info] Pay successful");
                   let params = {
                       orderId: orderID
                   };
                   let path = FlowRouter.path("/orders/summary/:orderId", params);
                   FlowRouter.go(path);
               }
            });
        }

        render () {

            // Fill with your UI
            return (
                <div>
                    <p>Payment - Coming soon....</p>
                    <p>Currently just a simulate payment, not really pay</p>
                    <RC.Button onClick={this.pay}>Pay</RC.Button>
                </div>
            );
        }
    };

}