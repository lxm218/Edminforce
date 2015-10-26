(function(){

/////////////////////////////////////////////////////////////////////////
//                                                                     //
// client/app/component/SelectedClassInfoCard.jsx                      //
//                                                                     //
/////////////////////////////////////////////////////////////////////////
                                                                       //
/**                                                                    //
 * Created on 10/13/15.                                                //
 */                                                                    //
                                                                       //
Cal.SelectedClassInfoCard = React.createClass({                        // 5
    displayName: 'SelectedClassInfoCard',                              //
                                                                       //
    //selectedClasses 是一个Immutable.Map 非纯对象 所以这里直接传入内容                 //
    propTypes: {                                                       // 8
        title: React.PropTypes.string,                                 // 9
        swimmer: React.PropTypes.object,                               // 10
        selectedClasses: React.PropTypes.object                        // 11
        //class1:React.PropTypes.object,                               //
        //class2:React.PropTypes.object,                               //
        //class3:React.PropTypes.object                                //
    },                                                                 //
                                                                       //
    render: function () {                                              // 17
                                                                       //
        var title = this.props.title || 'Register for spring 2015';    // 19
        var swimmer = this.props.swimmer;                              // 20
                                                                       //
        var selectedClasses = this.props.selectedClasses;              // 22
        var class1 = selectedClasses['class1'];                        // 23
        var class2 = selectedClasses['class2'];                        // 24
        var class3 = selectedClasses['class3'];                        // 25
                                                                       //
        return React.createElement(                                    // 28
            RC.Card,                                                   // 28
            { className: 'padding' },                                  //
            React.createElement(                                       //
                'h4',                                                  //
                { className: 'brand' },                                //
                title                                                  //
            ),                                                         //
            class1 ? React.createElement(                              //
                'div',                                                 //
                { className: 'row' },                                  //
                React.createElement(                                   //
                    'div',                                             //
                    { className: 'col' },                              //
                    'Preference 1'                                     //
                ),                                                     //
                React.createElement(                                   //
                    'div',                                             //
                    { className: 'col' },                              //
                    class1.name                                        //
                )                                                      //
            ) : '',                                                    //
            class2 ? React.createElement(                              //
                'div',                                                 //
                { className: 'row' },                                  //
                React.createElement(                                   //
                    'div',                                             //
                    { className: 'col' },                              //
                    'Preference 2'                                     //
                ),                                                     //
                React.createElement(                                   //
                    'div',                                             //
                    { className: 'col' },                              //
                    class2 && class2.name                              //
                )                                                      //
            ) : '',                                                    //
            class3 ? React.createElement(                              //
                'div',                                                 //
                { className: 'row' },                                  //
                React.createElement(                                   //
                    'div',                                             //
                    { className: 'col' },                              //
                    'Preference 3'                                     //
                ),                                                     //
                React.createElement(                                   //
                    'div',                                             //
                    { className: 'col ' },                             //
                    class3 && class3.name                              //
                )                                                      //
            ) : ''                                                     //
        );                                                             //
    }                                                                  //
                                                                       //
});                                                                    //
/*swimmer && swimmer.name*/                                            //
/////////////////////////////////////////////////////////////////////////

}).call(this);
