Cal.ClassEditSwimmerItemClassItem = React.createClass({
    propTypes: {
        //registerInfo: React.PropTypes.object,
        isLink: React.PropTypes.bool,
        classInfo:React.PropTypes.object
    },
    mixins: [ReactMeteorData],
    getMeteorData() {

        //account swimmers classes
        //Meteor.subscribe("accountWithSwimmersAndClasses",'account1');

        //let registerInfo = this.props.registerInfo
        //let classId = registerInfo.classId;
        //let swimmerId = registerInfo.swimmerId


        let classInfo = this.props.classInfo
        let swimmerId = this.props.swimmerId


        //Meteor.subscribe("class", classId);
        Meteor.subscribe("swimmer", swimmerId);


        return {
            swimmer: DB.Swimmers.find({_id: swimmerId}).fetch(),
            //classInfo: DB.Classes.find({_id: classId}).fetch(),
            classInfo: classInfo

        };
    },

    render() {
        let registerInfo = this.props.registerInfo

        let href = '/classEdit/operationBoard?'
            + 'classId=' + encodeURIComponent(this.props.classInfo._id)
            + '&swimmerId=' + this.props.swimmerId

        return !this.props.isLink ? <p>
            {
                <span>
                    {this.props.classInfo.name}
                </span>
            }
        </p> :
            <RC.Item className="item-text-wrap"
                     href={href}
                     theme="icon-left, icon-right "
                     uiClass="user, angle-right">
                {this.data.classInfo.name}
            </RC.Item>
    }
});
