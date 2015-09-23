/**
 * Created on 9/22/15.
 */

Cal.CEBillingAndPayment = React.createClass({

    mixins: [ReactMeteorData],
    getMeteorData() {
        return {}
    },

    render() {
        return <RC.Tabs className="bg-white">
            <div label="current billing" className="padding">
                <h1>
                    current
                </h1>
            </div>
            <div label="history pament" className="padding">
                <h1>
                    history
                </h1>
            </div>
        </RC.Tabs>
    }
})