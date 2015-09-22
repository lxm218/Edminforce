
Cal.ClassEditSwimmerItemClassItem = React.createClass({

    mixins: [ReactMeteorData],
    getMeteorData() {

        //account swimmers classes
        //Meteor.subscribe("accountWithSwimmersAndClasses",'account1');

        let classId = this.props.registerInfo.classId;

        Meteor.subscribe("class",classId);


        return {
            classInfo:DB.Classes.find({_id:classId}).fetch()
        };
    },

    render() {
        let href='/classEdit/'+this.props.registerInfo.classId+'/operationBoard'

        return <p>
            {
                this.data.classInfo.length?<a  href={href}>
                    {this.data.classInfo[0].name}
                    { this.data.classInfo[0].level}
                </a>:''
            }
        </p>
    }
});
