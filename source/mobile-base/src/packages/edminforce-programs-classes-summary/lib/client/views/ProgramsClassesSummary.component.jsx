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
                        You've book trial class successful. More questions:
                        <p>Email: edminforce@gmail.com</p>

                        <p>Phone: 5302048869</p>

                    </RC.Div>
                </RC.Div>
            );
        }
    });

}