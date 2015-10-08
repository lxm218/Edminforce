
Cal.ClassEditSwimmerItemClassItem = React.createClass({
    propTypes:{
        registerInfo:React.PropTypes.bool
    },
    mixins: [ReactMeteorData],
    getMeteorData() {

        //account swimmers classes
        //Meteor.subscribe("accountWithSwimmersAndClasses",'account1');

        let registerInfo = this.props.registerInfo
        let classId = registerInfo.classId;
        let swimmerId= registerInfo.swimmerId

        Meteor.subscribe("class",classId);
        Meteor.subscribe("swimmer",swimmerId);


        return {
            swimmer:DB.Swimmers.find({_id:swimmerId}).fetch(),
            classInfo:DB.Classes.find({_id:classId}).fetch()
        };
    },

    render() {
        let registerInfo = this.props.registerInfo

        let href='/classEdit/operationBoard?'
                +'classId='+encodeURIComponent(registerInfo.classId)
                +'&swimmerId='+registerInfo.swimmerId
                +'&registerInfoId='+registerInfo._id

        return <p>
            {
                this.data.classInfo.length?<span  href={href}>
                    {this.data.classInfo[0].name}
                    { this.data.classInfo[0].level}
                </span>:''
            }
        </p>
    }
});
