{

    // Don't forget to change `SomeName` to correct name
    EdminForce.Components.CartsSummary = React.createClass({

        render: function () {

            // Fill with your UI
            return (
                <RC.Div style={{padding: "20px"}}>
                    <p>
                        Thanks for registering for Winter 2016 class. We have sent confirmation email to you!
                    </p>

                    <p>
                        Please sign new student <a download="Waiver.pdf"  href="/Waiver_and_Release_from_Liability.pdf">waiver form</a> before the first class.
                    </p>

                </RC.Div>
            );
        }
    });

}