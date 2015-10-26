(function(){

/////////////////////////////////////////////////////////////////////////
//                                                                     //
// client/app/component/SelectSwimmer.jsx                              //
//                                                                     //
/////////////////////////////////////////////////////////////////////////
                                                                       //
/**                                                                    //
 * Created on 10/1/15.                                                 //
 */                                                                    //
                                                                       //
Cal.SelectSwimmer = React.createClass({                                // 5
    displayName: "SelectSwimmer",                                      //
                                                                       //
    propTypes: {                                                       // 6
        swimmers: React.PropTypes.array,                               // 7
        currentSwimmer: React.PropTypes.object,                        // 8
        changeMessage: React.PropTypes.string,                         // 9
        readyOnly: React.PropTypes.bool                                // 10
    },                                                                 //
    mixins: [ReactMeteorData],                                         // 12
    getMeteorData: function () {                                       // 13
        var swimmers = this.props.swimmers && this.props.swimmers.map(function (v, i) {
            return { text: v['name'], value: v._id };                  // 15
        });                                                            //
                                                                       //
        var currentSwimmerValue = this.props.currentSwimmer && this.props.currentSwimmer._id;
        //&& {value:this.props.currentSwimmer._id,                     //
        //    text:this.props.currentSwimmer.name}                     //
                                                                       //
        return {                                                       // 24
            swimmers: swimmers,                                        // 25
            currentSwimmerValue: currentSwimmerValue,                  // 26
                                                                       //
            currentSwimmer: this.props.currentSwimmer,                 // 28
            readyOnly: this.props.readyOnly                            // 29
        };                                                             //
    },                                                                 //
                                                                       //
    //actions                                                          //
    swimmerChange: function (e) {                                      // 34
        var value = this.refs.swimmer.getValue();                      // 35
                                                                       //
        var swimmer = _.find(this.props.swimmers, function (v, n) {    // 37
            return v._id == value;                                     // 38
        });                                                            //
                                                                       //
        Dispatcher.dispatch({                                          // 41
            actionType: this.props.changeMessage,                      // 42
            swimmer: swimmer                                           // 43
        });                                                            //
    },                                                                 //
                                                                       //
    render: function () {                                              // 48
                                                                       //
        return this.props.readyOnly ? React.createElement(             // 50
            RC.Item,                                                   // 51
            { uiColor: "brand1" },                                     //
            "Swimmer: ",                                               //
            this.data.currentSwimmer && this.data.currentSwimmer.name  //
        ) : React.createElement(RC.Select2, {                          //
            ref: "swimmer",                                            // 56
            options: this.data.swimmers,                               // 57
            value: this.data.currentSwimmerValue,                      // 58
            name: "swimmer",                                           // 59
            changeHandler: this.swimmerChange,                         // 60
            label: "Swimmer"                                           // 61
        });                                                            //
    }                                                                  //
});                                                                    //
/////////////////////////////////////////////////////////////////////////

}).call(this);
