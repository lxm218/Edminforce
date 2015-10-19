Cal.BillingUnfinished = React.createClass({

    render: function () {

        return <div>

            {
                this.props.unfinishedBillings.map(function (cart) {

                    return cart.items.map(function(item){

                        return <div className="row">
                            <div className="col">
                                {item.swimmer &&item.swimmer.name }
                            </div>
                            <div className="col">
                                {item.class1 &&item.class1.name }

                            </div>
                        </div>
                    })
                })
            }


            <RC.URL href="/classRegister/RegBillingPage">
                <RC.Button name="button" type="submit"
                           onClick={this.formSubmit}
                           theme="full" buttonColor="brand">
                    Checkout
                </RC.Button>

            </RC.URL>



        </div>;
    }

});