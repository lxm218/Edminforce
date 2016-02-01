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
                    <RC.List>
                        <RC.Item title={TAPi18n.__("student")}>
                            <span>Mick Wang</span>
                        </RC.Item>
                        <RC.Item title={TAPi18n.__("date")}>
                            Jan 17, 2016
                        </RC.Item>
                        <RC.Item title={TAPi18n.__("time")}>
                            4:45pm - 6:00pm
                        </RC.Item>

                        <RC.Item title={TAPi18n.__("className")}>
                            Beginning
                        </RC.Item>
                    </RC.List>
                    <RC.Div>
                        You've book trial class on Jan 17, 2016 at 4:45pm for Mick. More questions:
                        <p>Email: edminforce@gmail.com</p>

                        <p>Phone: 5302048869</p>

                    </RC.Div>
                </RC.Div>
            );
        }
    });

}