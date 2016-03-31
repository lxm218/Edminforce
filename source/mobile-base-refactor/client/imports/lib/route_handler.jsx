
import {mount} from 'react-mounter';
import AppMain from '/client/imports/modules/core/components/mainLayout.jsx';

// Route Handler Function for every Route
EdminForce.utils.routeHandler = function (p, args) {
    let defs = {
        // Meta
        metaTitle: Meteor.settings.public.appName,
        metaDesc: Meteor.settings.public.appDesc,

        // Route
        layout: AppMain,
        pageTitle: "Unknown",
        //showGlobalNav: false,
        //globalNav: null,
        //globalNavLocation: "auto",
        headerNav: null,
        bodyTmpl: <RC.NotFound/>
    }
    if (_.isObject(args)) _.defaults(args, defs); else args = defs;

    document.title = args.metaTitle
    document.description = args.metaDesc

    mount(args.layout, {
        title: args.pageTitle,
        //showGlobalNav: args.showGlobalNav,
        //globalNav: args.globalNav,
        //globalNavLocation: args.globalNavLocation,
        headerNav: args.headerNav,
        //leftNavToggle:args.leftNavToggle,

        hideBackButton: args.hideBackButton,
        hideLeftNavToggle: args.hideLeftNavToggle,
        hideShoppingCartButton: args.hideShoppingCartButton,

        body: args.bodyTmpl
    })
}

EdminForce.utils.authCheckRouteTrigger = function (context, redirect) {
    if (!Meteor.userId()) {
        redirect('/login');
    }
}

EdminForce.utils.authGo = function(path) {
    FlowRouter.go(Meteor.userId() ? path : '/login');
}

EdminForce.utils.renderError = function(error) {
    return error ? (
        <div className='center'>
            <div className="bigger inline-block invis-70 red">
                <div>{error}</div>
            </div>
        </div>
    ): null;
}

