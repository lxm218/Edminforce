{

    // Don't forget to change `SomeName` to correct name
    EdminForce.Components.Payment = React.createClass({

        pay(){
            let params = {
                cartId: "111"
            };
            let path = FlowRouter.path("/classes/:cartId/summary", params);
            FlowRouter.go(path);
        },

        render: function () {

            // Fill with your UI
            return (
                <div>
                    <p>Payment - Coming soon....</p>
                    <RC.Button onClick={this.pay}>Pay</RC.Button>
                </div>
            );
        }
    });

}