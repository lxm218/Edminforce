Cal.BillingUnfinished = React.createClass({

    render: function () {

        /*
         <RC.URL href="/classRegister/RegBillingPage">
         <RC.Button name="button" type="submit"
         onClick={this.formSubmit}
         theme="full" buttonColor="brand">
         Checkout
         </RC.Button>

         </RC.URL>


        * */


        return <div>

            {
                this.props.unfinishedBillings.map(function (cart) {

                    return <div className="padding">
                        <div>
                        {

                            cart.items.map(function (item) {

                                return <div className="row" key={item.classId}>
                                    <div className="col">
                                        {item.swimmer && item.swimmer.name }
                                    </div>
                                    <div className="col">
                                        {item.class1 && item.class1.name }

                                    </div>
                                </div>
                            })

                        }
                        </div>

                        <RC.Button name="button" type="submit"
                                   onClick={this.formSubmit}
                                   theme="full" buttonColor="brand">
                            Checkout
                        </RC.Button>


                    </div>


                })
            }





        </div>;
    }

});