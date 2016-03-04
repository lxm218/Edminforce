{

    // Don't forget to change `SomeName` to correct name
    EdminForce.Components.ProgramsClassesSummary = React.createClass({

        render: function () {

            // Fill with your UI
            return (
                <RC.Div style={{padding:"10px"}}>
                    <RC.VerticalAlign center={true} className="padding" height="300px">
                        <h2>
                            {TAPi18n.__("bookSummary")}
                        </h2>
                    </RC.VerticalAlign>
                    <RC.Div>
                        <p>You've booked a trial class successfully.</p>
                        <p>Contact us if you have more questions:</p>
                        <p>Email: <a href="mailto: calcoloracademy@gmail.com">calcoloracademy@gmail.com</a></p>

                        <p>Phone: 530-204-8869</p>

                    </RC.Div>
                </RC.Div>
            );
        }
    });

}
