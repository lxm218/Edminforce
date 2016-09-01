/*
 *
 * router相关
 * */
if(Meteor.isClient){



// Route Handler Function for every Route

    App.routeHandler = function (p, args) {
        let defs = {
            // Meta
            metaTitle: Meteor.settings.public.appName,
            metaDesc: Meteor.settings.public.appDesc,

            // Route
            layout: KUI.Layout,
            pageTitle: "Unknown",
            showGlobalNav: false,
            globalNav: null,
            globalNavLocation: "auto",
            headerNav: null,
            bodyTmpl: <RC.NotFound/>
        };
        if (_.isObject(args)) _.defaults(args, defs); else args = defs;

        document.title = args.pageTitle;
        document.description = args.metaDesc;

        ReactLayout.render(args.layout, {
            title: args.pageTitle,
            showGlobalNav: args.showGlobalNav,
            globalNav: args.globalNav,
            globalNavLocation: args.globalNavLocation,
            headerNav: args.headerNav,
            leftNavToggle:args.leftNavToggle,

            hideBackButton:args.hideBackButton,
            hideLeftNavToggle:args.hideLeftNavToggle,
            hideShoppingCartButton:args.hideShoppingCartButton,

            body: args.bodyTmpl
        })
    };


    App.checkLogin = function(callback){

        KG.get('EF-AdminUser').callMeteorMethod('getCurrentUser', [], {
            success : function(user){
                console.log(user);
                App.user = user;
                callback(user);
            }
        });



    };

    let cacheUrl = '';
    FlowRouter.triggers.enter([function(param){
        //console.log(param)
        if(param.queryParams.needLogin === "false"){
            return;
        }
        App.checkLogin(function(flag){
            if(!flag){
                if(param.path !== '/home/login')
                    Session.set(KG.const.CACHELOGINPATH, param.path);

                FlowRouter.go('/home/login');
            }
            else{
                _.delay(function(){
                    $(window).scrollTop(0);
                }, 16);

            }

        });
    }]);
    FlowRouter.triggers.exit([function(){
        try{
            util.message.publish('KG:show-error-message', {
                error : false
            })
        }catch(e){}
    }]);



}