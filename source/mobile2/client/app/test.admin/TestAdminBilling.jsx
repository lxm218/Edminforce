/**
 * Created on 10/16/15.
 */

Cal.TestAdminBilling = React.createClass({
    mixins: [ReactMeteorData],
    getMeteorData() {

        Meteor.subscribe('allRegisterShoppingCart')

        return {
            carts: DB.ShoppingCart.find({
                //status:'checking'
            }).fetch()
        }


    },

    onPay(item){

        console.log('=====onPay====',item.status)

        if(item.status =="checking"){

            Meteor.call('move_to_applied',item._id,function(err,result){
                if(err) console.error(err)

                alert('payment success')

                //FlowRouter.go('/classEdit/swimmerList')

            })

        }

    },

    render: function () {
        var self=this

        return <div>

            <div className="row">
                <div className="col cal-text-wrap" >
                    CartId
                </div>
                <div className="col cal-text-wrap">
                    Type
                </div>
                <div className="col cal-text-wrap">
                    status
                </div>
                <div className="col col-20 cal-text-wrap">
                    action
                </div>
            </div>


            {
                this.data.carts.map(function(item ,i){

                    return <div className="row" key={i}>

                            <div className="col cal-text-wrap" >
                                {item._id}

                            </div>
                            <div className="col cal-text-wrap">
                                {item.checkoutType}

                            </div>

                            <div className="col cal-text-wrap ">
                                {item.status}

                            </div>

                            <div className="col col-20 cal-text-wrap">

                                <span className="button button-small button-clear"
                                      onClick={self.onPay.bind(self, item)}>
                                    pay
                                </span>

                            </div>

                    </div>
                })


            }

        </div>;
    }

});