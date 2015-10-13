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

    //actions
    delete(shoppingCartItem){

        console.log(shoppingCartItem)

        Meteor.call('delete_class_from_cart',{
            classId :shoppingCartItem.class1._id,
            swimmerId :shoppingCartItem.swimmer._id,
            cartId:this.data.ShoppingCart._id
        },function(err, result){
            if(err){
                console.error(err)
                return;
            }

        })

    },

    render() {

        var self = this;
        let items = this.data.ShoppingCart && this.data.ShoppingCart.items

        debugger
        if (!items || !items.length) return <div className="padding">
            you have not added item in shopping cart
        </div>;

        return <div className="padding">
            <div className="row">
                <div className="col">Student</div>
                <div className="col">Class</div>
                <div className="col">Amt</div>
                <div className="col"></div>
            </div>
            {
                items.map(function (item, index, all) {

                    return <div className="row" key={index}>
                        <div className="col">{item.swimmer.name}</div>
                        <div className="col">{item.class1.name}</div>
                        <div className="col">{item.class1.price}</div>
                        <div className="col" onClick={self.delete.bind(self,item)}>Delete</div>
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