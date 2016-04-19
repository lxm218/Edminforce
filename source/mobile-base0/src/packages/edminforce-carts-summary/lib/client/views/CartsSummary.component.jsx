{

    // Don't forget to change `SomeName` to correct name
    EdminForce.Components.CartsSummary = React.createClass({

        render: function () {

            let makeupOnly = FlowRouter.getQueryParam("makeupOnly") === "true";

            // Fill with your UI
            if (makeupOnly)
                return (
                <RC.Div style={{padding:"10px"}}>
                    <RC.VerticalAlign center={true} className="padding" height="300px">
                        <h2>Book Summary</h2>
                    </RC.VerticalAlign>
                    <RC.Div>
                        <p>You've booked a make up class successfully.</p>
                        <p>Contact us if you have more questions:</p>
                        <p>Email: <a href="mailto: calcoloracademy@gmail.com">calcoloracademy@gmail.com</a></p>

                        <p>Phone: 530-204-8869</p>
                    </RC.Div>
                </RC.Div>
            )
            else
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
