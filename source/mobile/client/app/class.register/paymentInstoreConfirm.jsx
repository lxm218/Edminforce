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
            CRPaymentInstoreConfirm


            <RC.Button name="button" type="submit"
                       onClick={this.paied}
                       theme="full" buttonColor="brand">
                [test]Complete payment
            </RC.Button>
        </div>
    }
})