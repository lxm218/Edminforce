import {DefaultRoutes} from 'meteor/ihealth:utils'
import {RC} from 'meteor/ihealth:framework-mobile';
import React from 'react';
import {Meteor} from 'meteor/meteor';
import {FlowRouter} from 'meteor/kadira:flow-router';


class AppMain extends React.Component {
    constructor(p) {
        super(p);
        this.signout = this.signout.bind(this);
    }

    signout(){
        Dispatcher.dispatch({actionType: 'LEFT_NAV_CLOSE'})
        Dispatcher.dispatch({actionType: 'AUTH_LOGOUT'})
    }

    render() {
        return (
            <RC.Body>
                <RC.HeaderNav nav={this.props.headerNav} title={this.props.title}
                    useMiniNav={!Meteor.user() || !!this.props.headerNav}>
                    <RC.URL href="/">Home</RC.URL>
                    <RC.URL href="/account">My Account</RC.URL>
                    <RC.URL href="/students">Students</RC.URL>
                    <RC.URL href="/classes">Class Registration</RC.URL>
                    <RC.URL href="/carts/checkout">Shopping Cart</RC.URL>
                    <RC.URL href="/billings">Billing</RC.URL>
                    <RC.URL href="/contact">Contact Us</RC.URL>
                    <RC.URL onClick={this.signout}>Sign Out</RC.URL>
                </RC.HeaderNav>

                <RC.MobileContentArea>
                        {this.props.body}
                </RC.MobileContentArea>
            </RC.Body>
        );
    }
}

export default AppMain;