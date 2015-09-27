/**
 * Created on 9/19/15.
 */

Cal.CRRegBillingPage = React.createClass({

    mixins: [ReactMeteorData],
    getMeteorData() {
        Meteor.subscribe("activeShoppingCart");

        return {
            //当前的 ShoppingCart
            ShoppingCart: DB.ShoppingCart.findOne({
                status:'active'
            })
        }
    },

    render() {

        let items = this.data.ShoppingCart && this.data.ShoppingCart.items

        debugger
        if (!items || !items.length) return <div></div>;

        return <div className="padding">
            <div className="row">
                <div className="col">Student</div>
                <div className="col">Class</div>
                <div className="col">Amt</div>
            </div>
            {
                items.map(function (item, index, all) {

                    return <div className="row">
                        <div className="col">{item.swimmer.name}</div>
                        <div className="col">{item.class1.name}</div>
                        <div className="col">{item.class1.price}</div>
                    </div>
                })


            }

            <br/><br/>
            <RC.URL href="/classRegister/paymentOptionsPage">
                <RC.Button name="button" type="submit"
                           theme="full" buttonColor="brand">
                    Process To Checkout
                </RC.Button>

            </RC.URL>

        </div>
    }
})