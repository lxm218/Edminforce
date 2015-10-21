/**
 * Created on 9/11/15.
 */


{

    let cancelClassStore;
    Dependency.autorun(function () {
        cancelClassStore = Dependency.get('classEdit.CancelClass.store');
    });


    Cal.CECancelClassPage = React.createClass({

        mixins: [ReactMeteorData],
        getMeteorData() {


            var classId = this.props.classId
            var swimmerId = this.props.swimmerId
            Meteor.subscribe("class", classId);

            return {
                class: DB.Classes.findOne({_id: classId}),
                swimmer:   DB.Swimmers.findOne({_id: swimmerId}),

                refundWay: cancelClassStore.refundWay
            }
        },

        selectRefundWay(item){


            console.log(item.value)
            //alert(this.refs.refundWay.getValue())

            cancelClassStore.refundWay.set(item.value)


        },

        next(e){
            e.preventDefault()
            if (!cancelClassStore.refundWay.get()) {
                alert('please select a refund way')
                e.preventDefault()
                return;
            }

            var href = '/classEdit/CancelClassConfirmPage'
                +'?classId='+this.props.classId
                +'&swimmerId='+this.props.swimmerId

            //alert(href)
            FlowRouter.go(href);

        },
        //发送一个 cancel请求
        requestSubmit(e){
            e.preventDefault()


            Dispatcher.dispatch({
                actionType: "CECancelClassPage_CLASS_SEND_REQUEST"
            });

        },

        render() {
            var classId = this.props.classId

            var href = '/classEdit/' + this.props.classId + '/CancelClassConfirmPage'

            let refundMethods = [{
                value: 'cash',
                label: "cash refund"
            }, {
                value: 'credit',
                label: "cash to you credit card"
            }, {
                value: 'account',
                label: "credit to your account"
            }]

            return <div className="padding">


                <Cal.ClassRegisterDetail title="Class Cancel Info"
                    classId={this.props.classId}
                    swimmerId={this.props.swimmerId}
                    />



                {
                    /*

                     <RC.Item theme="divider">Please select a refund method</RC.Item>

                     <RC.RadioGroup2 list={refundMethods}
                     changeHandler={this.selectRefundWay}
                     ref="refundWay"
                     name="refundWay" value="erindale"
                     uiClass="paw" uiColor="brand"/>

                    * */

                }



                {
                    /*
                     <RC.Button name="button" type="submit"
                     onClick={this.next}
                     theme="full" buttonColor="brand">
                     Next
                     </RC.Button>
                    * */
                }


                <div className="padding">
                    You’re going to cancel this class for Daniel.
                </div>

                <RC.Button name="button" type="submit"
                           onClick={this.requestSubmit}
                           theme="full" buttonColor="brand">
                    Submit Request

                </RC.Button>


            </div>
        }
    })

}
