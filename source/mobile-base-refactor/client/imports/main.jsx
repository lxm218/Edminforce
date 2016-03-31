import {Meteor} from 'meteor/meteor';
import {FlowRouter} from 'meteor/kadira:flow-router';
import ReactDOM from 'react-dom';
import React from 'react';
import {RC} from 'meteor/ihealth:framework-mobile';

//import AppMain from './modules/core/components/mainLayout.jsx';
//import AppMain from '/client/imports/modules/core/components/mainLayout.jsx';

console.log('react-dom');
console.log(ReactDOM);

class AppBase extends React.Component {
    constructor(p) {
        super(p);
    }
    render() {
        return (<div>base</div>)
    }
}

class AppComp extends AppBase {
    constructor(p) {
        super(p);
    }
    render() {
        return (<div>comp</div>)
    }
}


class AppMain extends AppBase {
    constructor(p) {
        super(p);
        this.signout = this.signout.bind(this);
    }

    signout(){
        Dispatcher.dispatch({actionType: 'LEFT_NAV_CLOSE'})
        Dispatcher.dispatch({actionType: 'AUTH_LOGOUT'})
    }

    render() {
        //return
        // ( <RC.CSS>
        //     <div>test</div></RC.CSS> );

/*
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

 */

        return (<RC.Body>
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
        </RC.Body>);
    }
}


export default function () {
    Dependency.add('auth.store', new function () {

        var self = this;

        function postLoginAction() {
            if (Session.get("BookTrialClassId")) {
                let params = {
                    programsId: Session.get("BookTrialProgramId"),
                    classId: Session.get("BookTrialClassId"),
                    timestamp: Session.get("BookTrialTimestamp")
                }
                let path = FlowRouter.path("/programs/:programsId/:classId/:timestamp", params);
                FlowRouter.go(path);
                Session.set("BookTrialClassId", null);
                Session.set("BookTrialProgramId", null);
                Session.set("BookTrialTimestamp", null);
            } else {
                FlowRouter.go('/account')
            }
        }

        self.tokenId = Dispatcher.register(function (payload) {
            switch (payload.actionType) {
                case "AUTH_LOGOUT":
                {
                    Meteor.logout(function (err) {
                        if (err) {
                            console.error(err) //todo UI side
                            return;
                        }
                        FlowRouter.go('/login')
                    })
                    break;
                }
                case "AUTH_REGISTER_SUCCESS":
                {
                    FlowRouter.LastRoute
                    FlowRouter.LastRoute = [];
                    postLoginAction();

                    break;
                }
                case "AUTH_RESET_SUCCESS":
                {
                    FlowRouter.LastRoute
                    FlowRouter.LastRoute = [];
                    FlowRouter.go('/account')
                    break;
                }
                case "AUTH_LOGIN_SUCCESS":
                {
                    postLoginAction();
                    break;
                }
            }
        })
    })


        Meteor.startup(() => {

            // Back Handler
            document.addEventListener("backbutton", function (e) {
                e.preventDefault()
                if (FlowRouter.current().path == "/") {
                    navigator.app.exitApp()
                } else {
                    FlowRouter.BackButton = true
                    navigator.app.backHistory()
                }
            }, false)

            // Important : Meta
            var metaTag = document.createElement('meta');
            metaTag.name = "viewport"
            metaTag.content = "user-scalable=no, initial-scale=1, maximum-scale=1, minimum-scale=1"
            document.getElementsByTagName('head')[0].appendChild(metaTag)

            var titleTag = document.createElement("title");
            titleTag.content = "Edmin Force";
            document.getElementsByTagName('head')[0].appendChild(titleTag);

            // Add App Container
            let appContainer = document.createElement('div');
            appContainer.id = "appContainer";
            document.body.appendChild(appContainer);

            ReactDOM.render(<AppMain></AppMain>, document.getElementById("appContainer"));
        });
}