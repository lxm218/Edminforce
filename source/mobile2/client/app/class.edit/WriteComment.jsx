/**
 * Created on 9/11/15.
 */

Cal.WriteComment = React.createClass({

    mixins: [ReactMeteorData],
    getMeteorData() {


        swimmerId = this.props.swimmerId
        classId = this.props.classId

        Meteor.subscribe('swimmer', swimmerId)
        Meteor.subscribe('class', classId)


        return {
            swimmerInfo: DB.Swimmers.findOne({_id: swimmerId}),
            classInfo: DB.Classes.findOne({_id: classId})
        }


    },
    submitForm(event){
        event.preventDefault();

        let formData = this.refs.form.getFormData()

        var self= this
        console.log(formData)

        Meteor.call('add_comment_to_class_register_item', {
            swimmerId:this.props.swimmerId,
            classId:this.props.classId,
            comment:formData.comment
        },function(err,result){
            if(err){
                console.error(err)
                return;
            }

            var href= '/classEdit/operationBoard' +
                    '?classId='+self.props.classId
                    +'&swimmerId='+self.props.swimmerId
            FlowRouter.go(href);


        })


    },

    render() {
        let students= this.data.classInfo.students ||[];
        let registerItem= _.findWhere(students,{swimmerId:this.props.swimmerId})
        let currentComment= registerItem && registerItem.comment


        return <div>

            <RC.Card className="padding">
                <h4 className="brand">
                    Write comment
                </h4>

                <div>
                    swimmer:{this.data.swimmerInfo && this.data.swimmerInfo.name}
                </div>
                <div>
                    class:{this.data.classInfo && this.data.classInfo.name}
                </div>


            </RC.Card>
            <RC.Form ref="form" onSubmit={this.submitForm}>

                <RC.List theme="inset">

                    <RC.Textarea
                        ref="comment"
                        name="comment"
                        placeholder="Add a comment(optional)"
                        label="Comment:">{currentComment}</RC.Textarea>

                    <RC.Button name="button" type="submit" bgColor="brand1"
                               theme="full" buttonColor="brand">
                        submit
                    </RC.Button>

                </RC.List>

            </RC.Form>

        </div>
    }
})