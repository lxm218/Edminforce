(function(){

/////////////////////////////////////////////////////////////////////////
//                                                                     //
// client/main.jsx                                                     //
//                                                                     //
/////////////////////////////////////////////////////////////////////////
                                                                       //
/*                                                                     //
*                                                                      //
* borrow from ihealth_framework-mobile startup.js                      //
* Todo will remove after update of ihealth_framework-mobile            //
* */                                                                   //
Meteor.startup(function () {                                           // 6
                                                                       //
    // Back Handler                                                    //
    document.addEventListener("backbutton", function (e) {             // 9
        e.preventDefault();                                            // 10
        if (FlowRouter.current().path == "/") {                        // 11
            navigator.app.exitApp();                                   // 12
        } else {                                                       //
            FlowRouter.BackButton = true;                              // 14
            navigator.app.backHistory();                               // 15
        }                                                              //
    }, false);                                                         //
                                                                       //
    // Important : Meta                                                //
    var metaTag = document.createElement('meta');                      // 20
    metaTag.name = "viewport";                                         // 21
    metaTag.content = "user-scalable=no, initial-scale=1, maximum-scale=1, minimum-scale=1";
    document.getElementsByTagName('head')[0].appendChild(metaTag);     // 23
});                                                                    //
/////////////////////////////////////////////////////////////////////////

}).call(this);
