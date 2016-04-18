
injectTapEventPlugin();

EdminForce.Components.AppMain = React.createClass({
    signout(){
        Dispatcher.dispatch({actionType: 'LEFT_NAV_CLOSE'})
        Dispatcher.dispatch({actionType: 'AUTH_LOGOUT'})
    },

    render: function () {
        return (
            <RC.Body>
                <EdminForce.Components.HeaderNav nav={this.props.headerNav} title={this.props.title}
                    useMiniNav={!Meteor.user() || !!this.props.headerNav}>
                    <RC.URL href="/">Home</RC.URL>
                    <RC.URL href="/account">My Account</RC.URL>
                    <RC.URL href="/students">Students</RC.URL>
                    <RC.URL href="/classes">Class Registration</RC.URL>
                    <RC.URL href="/checkout">Shopping Cart</RC.URL>
                    <RC.URL href="/billings">Billing</RC.URL>
                    <RC.URL href="/contact">Contact Us</RC.URL>
                    <RC.URL onClick={this.signout}>Sign Out</RC.URL>
                </EdminForce.Components.HeaderNav>

                <RC.MobileContentArea>
                        {this.props.body}
                </RC.MobileContentArea>
            </RC.Body>
        );
    }
});
