/**
 * Created on 9/23/15.
 */

Cal.CRPaymentInstoreConfirm = React.createClass({

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

        let title="You’ve choose to pay in store. Please go to our store to " +
            "make a payment of $— within 24 hours in order to secure your spot!"
        return <div>


            <RC.Card  className="item-text-wrap"
                key={Math.random()} title={title}>


            </RC.Card>

            <RC.List theme="inset">
                <RC.Item theme="body">

                    <RC.Button name="button"
                               onClick={this.paied}
                               theme="full" buttonColor="brand">
                        OK
                    </RC.Button>
                </RC.Item>

            </RC.List>




        </div>
    }
})