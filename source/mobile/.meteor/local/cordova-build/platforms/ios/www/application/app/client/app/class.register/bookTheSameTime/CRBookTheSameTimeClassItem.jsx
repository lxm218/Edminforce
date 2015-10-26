(function(){

/////////////////////////////////////////////////////////////////////////
//                                                                     //
// client/app/class.register/bookTheSameTime/CRBookTheSameTimeClassIte //
//                                                                     //
/////////////////////////////////////////////////////////////////////////
                                                                       //
/**                                                                    //
 * Created on 10/1/15.                                                 //
 */                                                                    //
                                                                       //
Cal.CRBookTheSameTimeClassItem = React.createClass({                   // 5
    displayName: "CRBookTheSameTimeClassItem",                         //
                                                                       //
    propTypes: {                                                       // 6
        classInfo: React.PropTypes.object //.isRequired                // 7
    },                                                                 //
    //mixins: [ReactMeteorData],                                       //
    //getMeteorData() {                                                //
    //    return {                                                     //
    //    }                                                            //
    //},                                                               //
    //actions                                                          //
    book: function () {                                                // 15
                                                                       //
        Dispatcher.dispatch({                                          // 17
            actionType: "BookTheSameTime_CLASS_SELECT_FOR_CURRENT",    // 18
            selectedClass: this.props.classInfo,                       // 19
            currentStep: 1                                             // 20
        });                                                            //
    },                                                                 //
                                                                       //
    render: function () {                                              // 24
                                                                       //
        return React.createElement(                                    // 26
            RC.Item,                                                   // 26
            { uiColor: "brand1", className: "item-text-wrap" },        //
            this.props.classInfo ? React.createElement(                //
                "div",                                                 //
                { className: "row" },                                  //
                React.createElement(                                   //
                    "div",                                             //
                    { className: "col" },                              //
                    this.props.classInfo.name                          //
                ),                                                     //
                React.createElement(                                   //
                    "div",                                             //
                    { className: "col col-20" },                       //
                    React.createElement(                               //
                        "span",                                        //
                        { onClick: this.book, className: "button button-small" },
                        "BOOK"                                         //
                    )                                                  //
                )                                                      //
            ) : ''                                                     //
        );                                                             //
    }                                                                  //
});                                                                    //
/////////////////////////////////////////////////////////////////////////

}).call(this);
