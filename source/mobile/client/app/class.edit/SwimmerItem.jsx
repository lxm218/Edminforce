Cal.ClassEditSwimmerItem = React.createClass({

    mixins: [ReactMeteorData],
    getMeteorData() {



        let swimmerId = this.props.swimmer._id;

        Meteor.subscribe("registerInfoBySwimmerId", swimmerId);

        return {
            classesRegisterInfo: DB.ClassesRegister.find({
                swimmerId: swimmerId,
                status:'normal',  //不显示cancel中的和 change中的
                sessionId: App.info && App.info.sessionNow
            }).fetch()
        };
    },

    render() {

        //let href = '/classEditSwimmer/'+this.props.swimmer._id+'/registeredClass'
        let href = '/classEdit/SwimmerRegisteredClass?swimmerId='+this.props.swimmer._id


        return <RC.Item className="item-text-wrap"
                        href={href}
                        theme="icon-left, icon-right "
                        uiClass="user, angle-right">
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