(function(){

/////////////////////////////////////////////////////////////////////////
//                                                                     //
// client/app/class.edit/BillingUnfinished.jsx                         //
//                                                                     //
/////////////////////////////////////////////////////////////////////////
                                                                       //
Cal.BillingUnfinished = React.createClass({                            // 1
    displayName: "BillingUnfinished",                                  //
                                                                       //
    render: function () {                                              // 3
                                                                       //
        /*                                                             //
         <RC.URL href="/classRegister/RegBillingPage">                 //
         <RC.Button name="button" type="submit"                        //
         onClick={this.formSubmit}                                     //
         theme="full" buttonColor="brand">                             //
         Checkout                                                      //
         </RC.Button>                                                  //
          </RC.URL>                                                    //
          * */                                                         //
                                                                       //
        return React.createElement(                                    // 19
            "div",                                                     //
            null,                                                      //
            this.props.unfinishedBillings.map(function (cart) {        //
                                                                       //
                return React.createElement(                            // 24
                    "div",                                             //
                    { className: "padding" },                          //
                    React.createElement(                               //
                        "div",                                         //
                        null,                                          //
                        cart.items.map(function (item) {               //
                                                                       //
                            return React.createElement(                // 30
                                "div",                                 //
                                { className: "row", key: item.classId },
                                React.createElement(                   //
                                    "div",                             //
                                    { className: "col" },              //
                                    item.swimmer && item.swimmer.name  //
                                ),                                     //
                                React.createElement(                   //
                                    "div",                             //
                                    { className: "col" },              //
                                    item.class1 && item.class1.name    //
                                )                                      //
                            );                                         //
                        })                                             //
                    ),                                                 //
                    React.createElement(                               //
                        RC.Button,                                     // 44
                        { name: "button", type: "submit",              //
                            onClick: this.formSubmit,                  // 45
                            theme: "full", buttonColor: "brand" },     // 46
                        "Checkout"                                     //
                    )                                                  //
                );                                                     //
            })                                                         //
        );                                                             //
    }                                                                  //
                                                                       //
});                                                                    //
/////////////////////////////////////////////////////////////////////////

}).call(this);
