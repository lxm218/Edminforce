Cal.ClassEditSwimmerItem = React.createClass({

    mixins: [ReactMeteorData],
    getMeteorData() {

        let swimmerId = this.props.swimmer._id;

        Meteor.subscribe("classes");

        return {

            classes:DB.Classes.find({
                'students.swimmerId':swimmerId,
                 sessionId: App.info && App.info.sessionNow

            }).fetch()
        };
    },

    render() {

        let href = '/classEdit/SwimmerRegisteredClass?swimmerId='+this.props.swimmer._id

        let swimmer = this.props.swimmer

        return <RC.Item className="item-text-wrap"
                        href={href}
                        theme="icon-left, icon-right "
                        uiClass="user, angle-right">
            {swimmer.name}

            {
                this.data.classes.map(function(classItem){

                    return (
                        <Cal.ClassEditSwimmerItemClassItem
                            classInfo= {classItem}
                            swimmerId={swimmer._id}/>
                    )
                })

            }

        </RC.Item>
    }
})