
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
                    <RC.URL href="/">Home</RC.URL>
                    <RC.URL href="/account">My Account</RC.URL>
                    <RC.URL href="/students">Class Records</RC.URL>
                    <RC.URL href="/programs">Trial Class</RC.URL>
                    <RC.URL href="/classes">Class Registration</RC.URL>
                    <RC.URL href="/student/makeup">Make up Class</RC.URL>
                    <RC.URL href="/billing">Billing</RC.URL>
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
