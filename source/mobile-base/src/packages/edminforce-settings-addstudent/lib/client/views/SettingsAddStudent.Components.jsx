{

    // Don't forget to change `SomeName` to correct name
    EdminForce.Components.SettingsAddStudent = React.createClass({

        render: function () {

            // Fill with your UI
            return (
                <RC.Div >
                    <h3>Add Student</h3>
                    <ul>
                        <li>Add student from Account page</li>
                        <li>When book trial, user don't have student</li>
                    </ul>

                    <RC.Button bgColor="brand2" bgColorHover="dark">Save</RC.Button>
                </RC.Div>
            );
        }
    });

}