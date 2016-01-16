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
    resetTestData(){

        Meteor.call('resetTestData',function(err){
            if(err){
                alert('resetTestData error '+ err)
                return;
            }

            alert('resetTestData success')
        })
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
                         href="/testAdmin/billing">billings</RC.Item>

            </RC.List>

            <div className="row">
                <RC.Button className="item-button" name="button"
                           onClick={this.resetTestData}
                           buttonColor="brand">

                    Reset TestData
                </RC.Button>
            </div>

        </div>
    }
})