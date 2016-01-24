/**
 * Created on 9/23/15.
 */

Cal.CRPaymentInstoreConfirm = React.createClass({
    propTypes: {
        cartId: React.PropTypes.string
    },
    mixins: [ReactMeteorData],
    getMeteorData() {
        return {}
    },

    paied:function(){

        //Meteor.call('move_to_applied',Session.get('CART_ID'),function(err,result){
        //    if(err) console.error(err)
        //
        //    alert('payment success')
        //
        //
        //
        //    FlowRouter.go('/classEdit/swimmerList')
        //
        //})
        FlowRouter.go('/classEdit/swimmerList')

    },
    render() {

        return <div>

            <Cal.CRRegBillingDetailCard
                cartId={this.props.cartId}
                view="view2"
            />



            <RC.List theme="inset">
                <RC.Item theme="body">

                    <RC.Button name="button" bgColor="brand1"
                               onClick={this.paied}
                               theme="full" buttonColor="brand">
                        OK
                    </RC.Button>
                </RC.Item>

            </RC.List>




        </div>
    }
})