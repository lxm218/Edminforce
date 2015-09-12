/**
 * Created on 9/11/15.
 */

Cal.SwimmerRegisteredClassPage = React.createClass({

    mixins: [ReactMeteorData],
    getMeteorData() {
        return {}
    },

    render() {
        return <RC.List >
            <RC.Item theme="body">
                <h2 className="brand">Class Info</h2>

                <p>There are several collections of CSS colour classes in the framework. Some can be controlled from the
                    scss.scss file, others must be overriden.</p>

            </RC.Item>

            <RC.Item theme="divider">Class History</RC.Item>

        </RC.List>
    }
})