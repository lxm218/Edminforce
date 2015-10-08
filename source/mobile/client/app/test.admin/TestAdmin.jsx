/**
 * Created on 10/4/15.
 */

Cal.TestAdmin = React.createClass({

    mixins: [ReactMeteorData],
    getMeteorData() {

        Meteor.subscribe('appInfo')

        return {
           app: DB.App.findOne()
        }
    },

    render() {
        return <div>
            <RC.Card key={Math.random()} className="padding">


                <h4 className="brand">
                    Current stage
                </h4>


                <div className="row">
                    {this.data.app && this.data.app.registerStage}
                </div>

            </RC.Card>

            <RC.List>



                <RC.Item theme="icon-left" uiClass="list-ul" uiColor="brand1"
                         href="#">accounts</RC.Item>

                <RC.Item theme="icon-left" uiClass="list-ul" uiColor="brand1"
                         href="/testAdmin/registerStage">registerStage</RC.Item>

                <RC.Item theme="icon-left" uiClass="list-ul" uiColor="brand2"
                         href="#">classes</RC.Item>
                <RC.Item theme="icon-left" uiClass="list-ul" uiColor="brand3"
                         href="#">billings</RC.Item>

            </RC.List>

        </div>
    }
})