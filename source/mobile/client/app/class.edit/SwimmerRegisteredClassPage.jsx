/**
 * Created on 9/11/15.
 */

Cal.SwimmerRegisteredClassPage = React.createClass({

    mixins: [ReactMeteorData],
    getMeteorData() {

        Meteor.subscribe("classes");


        //var registeredClasses = DB.ClassesRegister.find({
        //    swimmerId: this.props.swimmerId,
        //    status:'normal',  //不显示cancel中的和 change中的
        //    sessionId: App.info && App.info.sessionRegister
        //}).fetch();

        var registeredClasses= DB.Classes.find({
            'students.swimmerId':this.props.swimmerId,
             sessionId: App.info && App.info.sessionRegister
        }).fetch()


        //var nowClasses = DB.ClassesRegister.find({
        //    swimmerId: this.props.swimmerId,
        //    status:'normal',  //不显示cancel中的和 change中的
        //    sessionId: App.info && App.info.sessionNow
        //}).fetch();
        var nowClasses= DB.Classes.find({
            'students.swimmerId':this.props.swimmerId,
            sessionId: App.info && App.info.sessionNow
        }).fetch()


        //var historyClasses=DB.ClassesRegister.find({
        //    swimmerId: this.props.swimmerId,
        //    status:'normal',  //不显示cancel中的和 change中的
        //    sessionId:{$nin:[App.info && App.info.sessionNow , App.info && App.info.sessionRegister]}
        //
        //}).fetch();

        var historyClasses= DB.Classes.find({
            'students.swimmerId':this.props.swimmerId,
             sessionId:{$nin:[App.info && App.info.sessionNow , App.info && App.info.sessionRegister]}
        }).fetch()



        return {
            registeredClasses:registeredClasses,
            nowClasses:nowClasses,
            historyClasses:historyClasses
        }
    },

    render() {

        var swimmerId = this.props.swimmerId;

        return <RC.Tabs className="bg-white">
            <div label="new session" className="padding">


                {
                    this.data.registeredClasses && this.data.registeredClasses.map(function (item) {

                        return <Cal.ClassEditSwimmerItemClassItem
                            isLink={true}
                            classInfo= {item}
                            swimmerId={swimmerId}

                            />
                    })
                }



            </div>
            <div label="current session" className="padding">

                {
                    this.data.nowClasses &&  this.data.nowClasses.map(function (item) {

                        return <Cal.ClassEditSwimmerItemClassItem
                            isLink={true}
                            classInfo= {item}
                            swimmerId={swimmerId}
                            />
                    })

                }

            </div>
            <div label="history" className="padding">

                {
                    this.data.historyClasses && this.data.historyClasses.map(function (item) {

                        return <Cal.ClassEditSwimmerItemClassItem
                            classInfo= {item}
                            swimmerId={swimmerId}
                            />
                    })

                }

            </div>
        </RC.Tabs>
    }
})