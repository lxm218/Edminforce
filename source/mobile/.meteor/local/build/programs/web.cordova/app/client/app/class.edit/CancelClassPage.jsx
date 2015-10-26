(function(){

/////////////////////////////////////////////////////////////////////////
//                                                                     //
// client/app/class.edit/CancelClassPage.jsx                           //
//                                                                     //
/////////////////////////////////////////////////////////////////////////
                                                                       //
/**                                                                    //
 * Created on 9/11/15.                                                 //
 */                                                                    //
                                                                       //
{                                                                      // 6
    (function () {                                                     //
                                                                       //
        var cancelClassStore = undefined;                              // 8
        Dependency.autorun(function () {                               // 9
            cancelClassStore = Dependency.get('classEdit.CancelClass.store');
        });                                                            //
                                                                       //
        Cal.CECancelClassPage = React.createClass({                    // 14
            displayName: 'CECancelClassPage',                          //
                                                                       //
            mixins: [ReactMeteorData],                                 // 16
            getMeteorData: function () {                               // 17
                                                                       //
                var classId = this.props.classId;                      // 20
                var swimmerId = this.props.swimmerId;                  // 21
                Meteor.subscribe("class", classId);                    // 22
                                                                       //
                return {                                               // 24
                    'class': DB.Classes.findOne({ _id: classId }),     // 25
                    swimmer: DB.Swimmers.findOne({ _id: swimmerId }),  // 26
                                                                       //
                    refundWay: cancelClassStore.refundWay              // 28
                };                                                     //
            },                                                         //
                                                                       //
            selectRefundWay: function (item) {                         // 32
                                                                       //
                console.log(item.value);                               // 35
                //alert(this.refs.refundWay.getValue())                //
                                                                       //
                cancelClassStore.refundWay.set(item.value);            // 38
            },                                                         //
                                                                       //
            next: function (e) {                                       // 43
                e.preventDefault();                                    // 44
                if (!cancelClassStore.refundWay.get()) {               // 45
                    alert('please select a refund way');               // 46
                    e.preventDefault();                                // 47
                    return;                                            // 48
                }                                                      //
                                                                       //
                var href = '/classEdit/CancelClassConfirmPage' + '?classId=' + this.props.classId + '&swimmerId=' + this.props.swimmerId;
                                                                       //
                //alert(href)                                          //
                FlowRouter.go(href);                                   // 56
            },                                                         //
            //发送一个 cancel请求                                            //
            requestSubmit: function (e) {                              // 60
                e.preventDefault();                                    // 61
                                                                       //
                Dispatcher.dispatch({                                  // 64
                    actionType: "CECancelClassPage_CLASS_SEND_REQUEST"
                });                                                    //
            },                                                         //
                                                                       //
            render: function () {                                      // 70
                var classId = this.props.classId;                      // 71
                                                                       //
                var href = '/classEdit/' + this.props.classId + '/CancelClassConfirmPage';
                                                                       //
                var refundMethods = [{                                 // 75
                    value: 'cash',                                     // 76
                    label: "cash refund"                               // 77
                }, {                                                   //
                    value: 'credit',                                   // 79
                    label: "cash to you credit card"                   // 80
                }, {                                                   //
                    value: 'account',                                  // 82
                    label: "credit to your account"                    // 83
                }];                                                    //
                                                                       //
                return React.createElement(                            // 86
                    'div',                                             //
                    { className: 'padding' },                          //
                    React.createElement(Cal.ClassRegisterDetail, { title: 'Class Cancel Info',
                        classId: this.props.classId,                   // 90
                        swimmerId: this.props.swimmerId                // 91
                    }),                                                //
                    React.createElement(                               //
                        'div',                                         //
                        { className: 'padding' },                      //
                        'You’re going to cancel this class for Daniel.'
                    ),                                                 //
                    React.createElement(                               //
                        RC.Button,                                     // 128
                        { name: 'button', type: 'submit',              //
                            onClick: this.requestSubmit,               // 129
                            theme: 'full', buttonColor: 'brand' },     // 130
                        'Submit Request'                               //
                    )                                                  //
                );                                                     //
            }                                                          //
        });                                                            //
    })();                                                              //
}                                                                      //
                                                                       //
/*                                                                     //
  <RC.Item theme="divider">Please select a refund method</RC.Item>     //
  <RC.RadioGroup2 list={refundMethods}                                 //
 changeHandler={this.selectRefundWay}                                  //
 ref="refundWay"                                                       //
 name="refundWay" value="erindale"                                     //
 uiClass="paw" uiColor="brand"/>                                       //
 * */                                                                  //
/*                                                                     //
 <RC.Button name="button" type="submit"                                //
 onClick={this.next}                                                   //
 theme="full" buttonColor="brand">                                     //
 Next                                                                  //
 </RC.Button>                                                          //
* */                                                                   //
/////////////////////////////////////////////////////////////////////////

}).call(this);
