{
    injectTapEventPlugin();

    // Import Material UI Components
    let {
        AppBar
        } = MUI;

    // Don't forget to change `SomeName` to correct name
    EdminForce.Components.AppBar = React.createClass({

        render: function () {

            // style object
            const styles = {
                title: {
                    textAlign: 'center'
                }
            };

            // Fill with your UI
            return (
                <AppBar
                    title={<$translate label="title" ></$translate>}
                    titleStyle={styles.title}
                    showMenuIconButton={false}
                    />
            );
        }
    });

}