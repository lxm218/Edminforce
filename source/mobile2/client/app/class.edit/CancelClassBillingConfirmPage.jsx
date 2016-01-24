/**
 * Created on 9/25/15.
 */
{
    let cancelClassStore;
    Dependency.autorun(function () {
        cancelClassStore = Dependency.get('classEdit.CancelClass.store');
    });

    Cal.CECancelClassConfirmPage = React.createClass({

        mixins: [ReactMeteorData],
        getMeteorData() {
            var classId = this.props.classId
            Meteor.subscribe("class", classId);

            return {

                class: DB.Classes.findOne({_id: classId}),

                refundWay: cancelClassStore.refundWay
            }
        },


        ////action
        confirm(){

            Meteor.call('cancel_class',
                this.props.swimmerId,
                this.props.classId,
                function(err,result){
                    if(err) {
                        console.error(err)
                        return
                    }

                    alert('cancel success')

                });

        },



        render() {

            return <div>


                <Cal.ClassRegisterDetail
                    classId={this.props.classId}
                    swimmerId={this.props.swimmerId}
                    />

                <div>
                    <div className="row">
                        <div className="col">DUE</div>
                        <div className="col">
                                0
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">Credit</div>
                        <div className="col">
                            {this.data.class && this.data.class.price}
                        </div>
                    </div>
                </div>


                <p className="padding">
                    <RC.Button name="button" type="submit" bgColor="brand1"
                               onClick={this.confirm}
                               theme="full" buttonColor="brand">
                        Confirm Cancel
                    </RC.Button>
                </p>



            </div>
        }
    })

}
