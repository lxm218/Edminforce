(function(){

/////////////////////////////////////////////////////////////////////////
//                                                                     //
// client/app/class.register/SelectClassEditPage.jsx                   //
//                                                                     //
/////////////////////////////////////////////////////////////////////////
                                                                       //
                                                                       //
                                                                       //
{                                                                      // 3
    (function () {                                                     //
        //let CRSelectClassEditPageStoreClass;                         //
        //Dependency.autorun(function () {                             //
        //    CRSelectClassEditPageStoreClass = Dependency.get('classRegister.CRSelectClassEditPage.storeClass');
        //});                                                          //
        var PageStore = undefined;                                     // 8
        Dependency.autorun(function () {                               // 9
            PageStore = Dependency.get('classRegister.CRSelectClassEditPage.store');
        });                                                            //
                                                                       //
        function getShoppingItem(cart, swimmerId, classId) {           // 16
            if (!cart || !cart.items) return;                          // 17
            var items = cart.items;                                    // 18
                                                                       //
            for (var i = 0; i < items.length; i++) {                   // 20
                if (items[i].swimmerId == swimmerId && items[i].classId == classId) {
                    return items[i];                                   // 24
                }                                                      //
            }                                                          //
            return null;                                               // 27
        }                                                              //
                                                                       //
        Cal.CRSelectClassEditPage = React.createClass({                // 31
            displayName: "CRSelectClassEditPage",                      //
                                                                       //
            propTypes: {                                               // 32
                cartId: React.PropTypes.string,                        // 33
                swimmerId: React.PropTypes.string,                     // 34
                classId: React.PropTypes.string,                       // 35
                preferenceNum: React.PropTypes.number //preferenceNumber
                                                                       //
            },                                                         //
            mixins: [ReactMeteorData],                                 // 39
                                                                       //
            getMeteorData: function () {                               // 41
                                                                       //
                //////////////////subscribe/////////////////////////   //
                Meteor.subscribe("swimmersByAccountId", Meteor.userId());
                //Meteor.subscribe("appInfo");                         //
                Meteor.subscribe("classes");                           // 46
                Meteor.subscribe("activeShoppingCart");                // 47
                //Meteor.subscribe("accountShoppingCart");             //
                                                                       //
                //var PageStore = new CRSelectClassEditPageStoreClass;
                                                                       //
                var data = {                                           // 55
                                                                       //
                    cart: PageStore.cart.get(),                        // 57
                                                                       //
                    //account: Meteor.users.find().fetch(),            //
                    currentSwimmer: PageStore.currentSwimmer.get(),    // 60
                    currentClass: PageStore.currentClass.get(),        // 61
                                                                       //
                    currentLevel: PageStore.currentLevel.get(), //next level
                                                                       //
                    //should wait for currentSwimmer                   //
                    avaiableDays: PageStore.avaiableDays.get(),        // 67
                    avaiableTimes: PageStore.avaiableTimes.get(),      // 68
                    currentDay: PageStore.currentDay.get(),            // 69
                    currentTime: PageStore.currentTime.get()           // 70
                                                                       //
                };                                                     //
                                                                       //
                //currentStep: PageStore.currentStep.get(),            //
                                                                       //
                //一次选课流程的所有信息                                          //
                //selectedClasses: PageStore.selectedClasses.get()     //
                                                                       //
                //                                                     //
                return data;                                           // 80
            },                                                         //
                                                                       //
            componentWillMount: function () {                          // 85
                ///         ///PASS  props value to store              //
                Dispatcher.dispatch({                                  // 87
                    actionType: 'CRSelectClassEditPage_PROPS_UPDATE',  // 88
                    props: this.props                                  // 89
                });                                                    //
            },                                                         //
            formSubmit: function (e) {                                 // 93
                e.preventDefault();                                    // 94
                                                                       //
                Dispatcher.dispatch({                                  // 96
                    actionType: 'CRSelectClassEditPage_CLASS_SELECT',  // 97
                    props: this.props                                  // 98
                });                                                    //
            },                                                         //
                                                                       //
            ///////////////actions////////////////                     //
                                                                       //
            render: function () {                                      // 106
                                                                       //
                var items = this.data.cart && this.data.cart.items;    // 108
                var item = _.findWhere(items, {                        // 109
                    swimmerId: this.props.swimmerId,                   // 110
                    classId: this.props.classId                        // 111
                });                                                    //
                console.log(item);                                     // 113
                //                                                     //
                                                                       //
                return React.createElement(                            // 117
                    "div",                                             //
                    null,                                              //
                    React.createElement(                               //
                        RC.Card,                                       // 119
                        { className: "padding" },                      //
                        React.createElement(                           //
                            "h4",                                      //
                            { className: "brand" },                    //
                            "Register Class Edit Preference",          //
                            this.props.preferenceNum                   //
                        ),                                             //
                        React.createElement(                           //
                            "div",                                     //
                            null,                                      //
                            "now :",                                   //
                            item && item['class' + this.props.preferenceNum] && item['class' + this.props.preferenceNum].name
                        ),                                             //
                        React.createElement(                           //
                            "div",                                     //
                            null,                                      //
                            "changed :",                               //
                            this.data.currentClass && this.data.currentClass.name
                        )                                              //
                    ),                                                 //
                    React.createElement(                               //
                        RC.Form,                                       // 132
                        { ref: "myForm", onSubmit: this.formSubmit },  //
                        React.createElement(                           //
                            RC.Item,                                   // 134
                            { uiColor: "brand1" },                     //
                            "Swimmer: ",                               //
                            this.data.currentSwimmer && this.data.currentSwimmer.name
                        ),                                             //
                        React.createElement(                           //
                            RC.Item,                                   // 137
                            { uiColor: "brand1" },                     //
                            "Level: ",                                 //
                            this.data.currentLevel                     //
                        ),                                             //
                        React.createElement(Cal.SelectDay, {           //
                            avaiableDays: this.data.avaiableDays,      // 142
                            currentDay: this.data.currentDay,          // 143
                            changeMessage: "CRSelectClassEditPage_DAY_CHANGE"
                        }),                                            //
                        React.createElement(Cal.SelectTime, {          //
                            avaiableTimes: this.data.avaiableTimes,    // 147
                            currentTime: this.data.currentTime,        // 148
                            changeMessage: "CRSelectClassEditPage_TIME_CHANGE"
                        }),                                            //
                        React.createElement(                           //
                            RC.Button,                                 // 152
                            { name: "button", type: "submit",          //
                                onClick: this.formSubmit,              // 153
                                theme: "full", buttonColor: "brand" },
                            this.data.currentStep == 1 ? 'Book' : 'Select'
                        )                                              //
                    )                                                  //
                );                                                     //
            }                                                          //
                                                                       //
        });                                                            //
    })();                                                              //
}                                                                      //
/////////////////////////////////////////////////////////////////////////

}).call(this);
