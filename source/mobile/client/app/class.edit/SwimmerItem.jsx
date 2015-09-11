Cal.ClassEditSwimmerItem = React.createClass({

    mixins: [ReactMeteorData],
    getMeteorData() {



        let swimmerId = this.props.swimmer._id;

        Meteor.subscribe("registerInfoBySwimmerId", swimmerId);

        return {
            classesRegisterInfo: DB.classesRegister.find({swimmerId: swimmerId}).fetch()
        };
    },

    render() {
        return <RC.Item theme="icon-left, icon-right"
                        uiClass="user, chevron-right">
            {this.props.swimmer.name}

            {
                this.data.classesRegisterInfo.map(function (register, n) {

                    return <Cal.ClassEditSwimmerItemClassItem registerInfo={register} >
                    </Cal.ClassEditSwimmerItemClassItem>

                })
            }

        </RC.Item>
    }
})