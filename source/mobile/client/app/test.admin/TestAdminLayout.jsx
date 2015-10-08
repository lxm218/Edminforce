/**
 * Created on 10/4/15.
 */

Cal.TestAdminLayout = React.createClass({

    mixins: [ReactMeteorData],
    getMeteorData() {
        return {}
    },

    render() {
        return <div>

            <RC.HeaderNav nav={this.props.headerNav}
                          hideBackButton= {this.props.hideBackButton}
                          title={this.props.title} theme="flat"/>
            <Cal.Body tmpl={this.props.body}/>
        </div>
    }
})