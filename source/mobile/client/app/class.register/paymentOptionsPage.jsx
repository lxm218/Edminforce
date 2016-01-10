/**
 * Created on 9/23/15.
 */



Cal.CRPaymentOptionsPage = React.createClass({
    propTypes: {
        cartId: React.PropTypes.string
    },
    mixins: [ReactMeteorData],
    getMeteorData() {
        //Meteor.subscribe("activeShoppingCart");
        Meteor.subscribe("accountShoppingCartByCartId", this.props.cartId);


        return {
            //当前的 ShoppingCart
            shoppingCart: DB.ShoppingCart.findOne({
                _id:this.props.cartId
                //status:'active',
                //type:'register'
            })
        }
    },

    //////actions
    payNow(e){

        alert('Pay now module need third-party gateway and is still not implemented')
    },
    payInStore(){
        //var cartId =  this.data.shoppingCart && this.data.shoppingCart._id
        var cartId = this.props.cartId

        Meteor.call('move_to_checking', cartId, 'pay-in-store',function(err,result){
            if(err) {
                console.error(err)
                return;
            };

            FlowRouter.go('/classRegister/paymentInstoreConfirm?cartId='+cartId);

        })


    },

    render() {
        return <div className="padding">


            <RC.Button name="button" type="submit"
                       onClick={this.payNow}
                       theme="full" buttonColor="brand">
                Pay Now
            </RC.Button>


            <RC.Button name="button" type="submit"
                       onClick={this.payInStore}
                       theme="full" buttonColor="brand">
                Pay In Store
            </RC.Button>


        </div>
    }
})