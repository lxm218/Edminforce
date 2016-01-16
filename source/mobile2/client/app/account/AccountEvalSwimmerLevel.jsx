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

        return <div>

            <RC.Item theme="body">
                <h2 className="brand">Description</h2>
                <p>If you do not assign a &quot;name&quot; prop, a random string will be generated for you.</p>
            </RC.Item>

            <RC.RadioGroup list={App.Config.classEVALLevels}
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