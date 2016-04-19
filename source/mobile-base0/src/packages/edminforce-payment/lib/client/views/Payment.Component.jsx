{
    EdminForce.Components.Payment = class extends RC.CSSMeteorData {

        getMeteorData() {
            let handler = Meteor.subscribe("EF-ShoppingCarts-Checkout");
            let list = EdminForce.Collections.orders.find().fetch();
            let ready = handler.ready()
            return {
                isReady:ready,
                list: list
            }
        }

        payWithCreditCard(){
            let orderID = FlowRouter.getQueryParam("order");
            let makeupOnly = FlowRouter.getQueryParam("makeupOnly");
            FlowRouter.go("/paymentCredit?order=" + orderID  + "&makeupOnly=" + makeupOnly);
        }

        payWithCheck(){
            let orderID = FlowRouter.getQueryParam("order");
            let makeupOnly = FlowRouter.getQueryParam("makeupOnly");
            FlowRouter.go("/paymentECheck?order=" + orderID + "&makeupOnly=" + makeupOnly);
        }

        render () {
            return (
                <div>
                    <RC.Button onClick={this.payWithCreditCard}>Use Credit Card, 3% Process Fee</RC.Button>
                    <RC.Button onClick={this.payWithCheck}>Use ECheck, $0.5 Process Fee</RC.Button>
                </div>
            );
        }
    };
}