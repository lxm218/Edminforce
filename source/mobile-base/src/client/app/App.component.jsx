{
    injectTapEventPlugin();

    let {
        AppBar
        } = EdminForce.Components;

    EdminForce.Components.AppMain = React.createClass({

        render: function () {
            return (
                <RC.Body>
                    <RC.HeaderNav nav={this.props.headerNav} title={this.props.title} useMiniNav={!!this.props.headerNav}>
                        <RC.URL>This is an Example</RC.URL>
                        <RC.URL>Ripe Peaches</RC.URL>

                    </RC.HeaderNav>

                    <RC.MobileContentArea>
                        {this.props.body}
                    </RC.MobileContentArea>
                </RC.Body>
            );
        }
    });

}