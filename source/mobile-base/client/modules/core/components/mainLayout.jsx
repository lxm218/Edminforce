
injectTapEventPlugin();

EdminForce.Components.AppMain = React.createClass({
    signout(){
        Dispatcher.dispatch({actionType: 'LEFT_NAV_CLOSE'})
        Dispatcher.dispatch({actionType: 'AUTH_LOGOUT'})
    },

    render: function () {
        return (
            <RC.Body>
                <EdminForce.Components.HeaderNav id="navMenu"
                                                 nav={this.props.headerNav}
                                                 title={this.props.title}
                                                 logoUrl="/img/logo/calcolor.png"
                                                 useMiniNav={!this.props.user || !!this.props.headerNav}
                                                 shoppingCartCount={this.props.count}
                                                 shoppingCartUrl="/checkout">
                    <RC.URL href={`/${EdminForce.sid}`}>Home</RC.URL>
                    <RC.URL href={`/${EdminForce.sid}/account`}>My Account</RC.URL>
                    <RC.URL href={`/${EdminForce.sid}/students`}>Booking Records</RC.URL>
                    <RC.URL href={`/${EdminForce.sid}/programs`}>Trial Class</RC.URL>
                    <RC.URL href={`/${EdminForce.sid}/classes`}>Class Registration</RC.URL>
                    <RC.URL href={`/${EdminForce.sid}/student/makeup`}>Make up Class</RC.URL>
                    <RC.URL href={`/${EdminForce.sid}/billing`}>Billing</RC.URL>
                    <RC.URL href={`/${EdminForce.sid}/contact`}>Contact Us</RC.URL>
                    <RC.URL onClick={this.signout}>Sign Out</RC.URL>
                </EdminForce.Components.HeaderNav>

                <RC.MobileContentArea>
                        {this.props.body}
                </RC.MobileContentArea>
            </RC.Body>
        );
    }
});
