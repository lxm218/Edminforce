/**
 * Created on 11/29/15.
 */

Cal.CEMakeUpClassPage = React.createClass({

    propTypes: {},
    mixins: [ReactMeteorData],
    getMeteorData() {


        var classId = this.props.classId
        var swimmerId = this.props.swimmerId
        Meteor.subscribe("class", classId);

        return {
            class: DB.Classes.findOne({_id: classId}),
            swimmer:   DB.Swimmers.findOne({_id: swimmerId}),

            //refundWay: cancelClassStore.refundWay
        }
    },
    requestSubmit(e){
        e.preventDefault()

        DB.Requests.insert({
            type:'makeup_class',
            swimmerId:this.data.swimmer._id,
            swimmerInfo:this.data.swimmer,
            classId:this.data.class._id,
            classInfo: _.omit(this.data.class,['students','pendingTransactions'])
        },function(err,result){

            if(err){
                console.error(err)
                return
            }


            alert(
                'Your request to make up class for ' +
                'Daniel has been submitted. ' +
                'We’ll contact you soon.'
            )

            var href = '/classEdit/swimmerList'

            FlowRouter.go(href);

        })

    },

    render: function () {
        return <div className="padding">

            <Cal.ClassRegisterDetail title="Class Make Up Info"
                                     classId={this.props.classId}
                                     swimmerId={this.props.swimmerId}
                />
            <div className="padding">
                You’re going to send a request  for
                <b>{this.data.swimmer && this.data.swimmer.name}</b>
                to make up this class.
            </div>

            <RC.Button name="button" type="submit"
                       onClick={this.requestSubmit}
                       theme="full" buttonColor="brand">
                Submit Request

            </RC.Button>

        </div>;
    }

});