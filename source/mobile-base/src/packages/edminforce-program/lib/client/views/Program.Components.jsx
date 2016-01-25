{
    injectTapEventPlugin();

    // Import Material UI Components
    let {
        DatePicker,
        AppBar
        } = MUI;

    // Don't forget to change `SomeName` to correct name
    EdminForce.Components.SomeName = React.createClass({

        render: function () {

            // style object
            const styles = {
                title: {
                    textAlign: 'center'
                }
            };

            // Fill with your UI
            return (
                <div>

                </div>
            );
        }
    });

}