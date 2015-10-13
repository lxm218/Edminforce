Cal.BillingUnfinished = React.createClass({

    render: function () {

        return <div>

            {
                this.props.unfinishedBillings.map(function (cart) {

                    return <div className="row" key={cart._id}>
                        <div className="col">
                            {cart.accountId}
                        </div>
                        <div className="col">
                            {
                                cart.items.map(function (item) {

                                    return <div>
                                        {item.swimmerId}|
                                        {item.classId}
                                    </div>
                                })
                            }

                        </div>
                    </div>
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