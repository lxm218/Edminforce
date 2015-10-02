/**
 * Created on 10/1/15.
 */

Cal.CRSwimmerLevel = React.createClass({

    mixins: [ReactMeteorData],
    getMeteorData() {
        return {}
    },

    render() {
        return <RC.Item uiColor="brand1">
            Level: {this.props.currentSwimmer && this.props.currentSwimmer.level}
        </RC.Item>
    }
})