{
    injectTapEventPlugin();

    // Import Material UI Components
    let {
        AppBar
        } = EdminForce.Components;
    let {
        RaisedButton,
        FontIcon
        } = MUI;

    // Don't forget to change `SomeName` to correct name
    EdminForce.Components.Home = React.createClass({

        render: function () {

            const iconStyles = {
                marginRight: 24,
            };

            const buttonStyle = {
                marginBottom: "20px"
            };

            // Fill with your UI
            return (
                <div className="edminforce-home">
                    <AppBar></AppBar>

                    <div role="homeContent" className="content">
                        <h2 className="content-title">
                            <$translate label="CCAName"></$translate>
                        </h2>

                        <RaisedButton style={buttonStyle} label={TAPi18n.__('programs', {})} primary={true} fullWidth={true}>
                        </RaisedButton>

                        <RaisedButton style={buttonStyle} label={TAPi18n.__('customer_portal', {})} primary={true} fullWidth={true}>
                        </RaisedButton>

                        <RaisedButton style={buttonStyle} label={TAPi18n.__('contact_us', {})} primary={true} fullWidth={true}>
                        </RaisedButton>
                    </div>
                </div>
            );
        }
    });

}