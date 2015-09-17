/**
 * Created on 9/14/15.
 */

Cal.CRRegistraionInfoPage = React.createClass({

    mixins: [ReactMeteorData],
    getMeteorData() {
        return {}
    },

    render() {
        return <div >
            <RC.Card title="registraRoninfo">
                <p class="padding">
                    sfas
                    sfasf
                    fasf

                </p>
            </RC.Card>

            <RC.URL href="/classRegister/SelectClass">
                <RC.Button name="button" theme="full"  buttonColor="brand">
                    Continue
                </RC.Button>
            </RC.URL>


        </div>
    }
})