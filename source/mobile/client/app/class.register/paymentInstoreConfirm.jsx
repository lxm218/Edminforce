/**
 * Created on 9/23/15.
 */

Cal.CRPaymentInstoreConfirm = React.createClass({

    mixins: [ReactMeteorData],
    getMeteorData() {
        return {}
    },

    paied:function(){

        Meteor.call('move_to_applied',Session.get('CART_ID'),function(err,result){
            if(err) console.error(err)

            alert('payment success')



            FlowRouter.go('/classEdit/swimmerList')

        })

    },
    render() {
        return <div>


            <RC.Card key={Math.random()} title="Complete payment [假设支付成功]">

            </RC.Card>

            <RC.List theme="inset">
                <RC.Item theme="body">

                    <RC.Button name="button"
                               onClick={this.paied}
                               theme="full" buttonColor="brand">
                        Complete payment
                    </RC.Button>
                </RC.Item>

            </RC.List>




        </div>
    }
})