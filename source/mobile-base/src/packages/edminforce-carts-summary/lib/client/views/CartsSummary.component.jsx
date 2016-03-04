{

    // Don't forget to change `SomeName` to correct name
    EdminForce.Components.CartsSummary = React.createClass({

        render: function () {

            // Fill with your UI
            return (
                <RC.Div style={{padding: "20px"}}>
                    <p>
                        Thank for your registration. We have sent a confirmation email to you!
                    </p>

                    <p>
                        Please sign <a download="Waiver.pdf"  href="/Waiver_and_Release_from_Liability.pdf"><b>New Student Waiver Form</b></a> and hand it in before the first class. You don't need to re-sign this form for returning student.
                    </p>

                </RC.Div>
            );
        }
    });

}
