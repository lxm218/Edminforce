(function(){

/////////////////////////////////////////////////////////////////////////
//                                                                     //
// client/lib/mixins/windowUnload.jsx                                  //
//                                                                     //
/////////////////////////////////////////////////////////////////////////
                                                                       //
/**                                                                    //
 * Created on 10/17/15.                                                //
 */                                                                    //
                                                                       //
Cal.Mixins.windowUnload = {                                            // 5
    componentDidMount: function () {                                   // 6
        if (this.onUnload) {                                           // 7
            window.addEventListener("unload", this.onUnload);          // 8
        }                                                              //
        if (this.onBeforeUnload) {                                     // 10
            window.addEventListener("beforeunload", this.onBeforeUnload);
        }                                                              //
    },                                                                 //
                                                                       //
    componentWillUnmount: function () {                                // 15
        if (this.onUnload) {                                           // 16
            window.removeEventListener("unload", this.onUnload);       // 17
        }                                                              //
        if (this.onBeforeUnload) {                                     // 19
            window.removeEventListener("beforeunload", this.onBeforeUnload);
        }                                                              //
    }                                                                  //
                                                                       //
};                                                                     //
/////////////////////////////////////////////////////////////////////////

}).call(this);
