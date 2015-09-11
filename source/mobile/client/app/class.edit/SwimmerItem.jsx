Cal.ClassEditSwimmerItem = React.createClass({

    mixins: [ReactMeteorData],
    getMeteorData() {



        let swimmerId = this.props.swimmer._id;

        Meteor.subscribe("registerInfoBySwimmerId", swimmerId);

        return {
            classesRegisterInfo: DB.ClassesRegister.find({swimmerId: swimmerId}).fetch()
        };
    },

    render() {
        return <RC.Item className="item-text-wrap"
                        theme="icon-left, icon-right "
                        uiClass="user, chevron-right ">
            {this.props.swimmer.name}

            {
                this.data.classesRegisterInfo.map(function (register, n) {


                    return <Cal.ClassEditSwimmerItemClassItem registerInfo={register} key={n}>
                    </Cal.ClassEditSwimmerItemClassItem>

                })
            }

        </RC.Item>
    }
})