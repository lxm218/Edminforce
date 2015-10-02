/**
 * Created on 9/26/15.
 */

Cal.AccountEvalSwimmerLevel = React.createClass({

    mixins: [ReactMeteorData],
    getMeteorData() {
        return {}
    },

    //actions
    confirm(){

        var level = this.refs.levelInput.getValue()

        Dispatcher.dispatch({
            actionType: "ACCOUNT_EVAL_LEVEL_SUBMIT",
            level: level
        });

    },


    render() {


        var levels = App.Config.classLevels.map(function(v){

            return {
                value:v,
                label:v
            }

        })


        return <div>

            <RC.Item theme="body">
                <h2 className="brand">Description</h2>
                <p>If you do not assign a &quot;name&quot; prop, a random string will be generated for you.</p>
            </RC.Item>

            <RC.RadioGroup list={levels}
                           ref = 'levelInput'
                           name="my-park"
                           value="elora-gorge" uiColor="brand2" />

            <RC.Button name="button" theme="full"
                       onClick={this.confirm}
                       buttonColor="brand">
                Select
            </RC.Button>

        </div>
    }
})