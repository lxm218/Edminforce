/**
 * Created on 10/4/15.
 */

Cal.TestAdminRegisterStage = React.createClass({

    mixins: [ReactMeteorData],
    getMeteorData() {

        Meteor.subscribe('appInfo')

        return {
            app: DB.App.findOne()
        }


    },

    stageChange(){

        var value = this.refs.stageSelect.getValue()

        //DB.App.update(
        //    {_id: App.info._id },
        //    {
        //        $set:{registerStage: value}
        //    })


        Meteor.call('test_change_stage',value,function(err,result){

            if(err) console.error(err)


        })
    },

    render() {

        var options = [
            {text: "stage-1", value: 1},
            {text: "stage-2", value: 2},
            {text: "stage-3", value: 3},

            {text: "stage-4-case1", value: 4},
            {text: "stage-4-case2", value: 5},

            {text: "frozen", value: -1}

        ]


        return <div>

            <RC.Card key={Math.random()} className="padding">


                <h4 className="brand">
                    Current stage
                </h4>


                <div className="row">
                    {this.data.app && this.data.app.registerStage}
                </div>

            </RC.Card>


            <RC.Select
                ref="stageSelect"
                changeHandler={this.stageChange}
                theme="small-label"
                options={options}
                value={App.info && App.info.registerStage} label="stage" labelColor="brand3"
                />


        </div>
    }
})