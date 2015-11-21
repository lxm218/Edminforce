Cal.CRFastrackProgramConfirm = React.createClass({
    mixins: [ReactMeteorData],
    getMeteorData: function () {
        return {};
    },
    registerMore: function () {
        //console.log("Click Register");
        FlowRouter.go('littlestar_register');
    },
    checkout: function(){
        // TODO add checkou logic

    },
    render: function () {
        return (
            <div key={Math.random()}>

                <RC.Card key={Math.random()} title="Fastrack Program">

                    <p className="padding-left padding-right">
                        You’ve book Little star program:
                    </p>

                    <p className="padding-left padding-right">
                        Tue and Thu 3:45-4:45pm
                    </p>

                    <br/>
                    <br/>
                    <br/>

                </RC.Card>


                <p className="padding-left padding-right">

                    <button onClick={this.registerMore}
                            className="button button-full button-brand ">
                        Register More
                    </button>
                    <RC.URL href="/classRegister/RegBillingPage">
                        <RC.Button name="button" type="submit"
                                   theme="full" buttonColor="brand">
                            Checkout
                        </RC.Button>

                    </RC.URL>
                </p>


            </div>
        );
    }
});