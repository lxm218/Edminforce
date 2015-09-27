/**
 * Client Routes
 */



//define global triggers for test
FlowRouter.triggers.enter([function(context){
    console.log('Router enter: path='+context.path,' name= '+FlowRouter.getRouteName())
}]);
FlowRouter.triggers.exit([function(context){
    console.log('Router exit: path='+context.path,' name= '+FlowRouter.getRouteName())
}]);



// Home Route
DefaultRoutes.route('/', {
    name: "home",
    action: function (p) {
        App.routeHandler(p, {
            pageTitle: "Home",
            headerNav: null,
            leftNavToggle:true, //左侧导航触发按钮
            bodyTmpl: <Cal.Home/>
        })
    }
})

DefaultRoutes.route('/ContactInfoPage', {
    name: "ContactInfoPage",
    action: function (p) {
        App.routeHandler(p, {
            pageTitle: "ContactInfoPage",
            headerNav: null,
            leftNavToggle:true, //左侧导航触发按钮
            bodyTmpl: <Cal.ContactInfoPage/>
        })
    }
})





