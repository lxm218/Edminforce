/**
 * Created on 9/23/15.
 */



Cal.CRPaymentOptionsPage = React.createClass({

    mixins: [ReactMeteorData],
    getMeteorData() {
        return {

        }
    },

    //////actions
    payNow(e){

        alert('payNow')
    },
    payInStore(){
        alert('payInStore')

        Meteor.call('move_to_checking',Session.get('CART_ID'),'pay-in-store',function(err,result){
            if(err) {
                console.error(err)
                return;
            };

            FlowRouter.go('/classRegister/paymentInstoreConfirm');

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