"use strict"

RC.AnimateWindow = class extends RC.CSS {
  render() {
    let props = _.omit(this.props, ["tmpl","transitionName"])

    return <RC.Animate transitionName={this.props.transitionName || "from-right"} transitionEnterTimeout={500} transitionLeaveTimeout={500}>
        {
        !!this.props.children
        ?
        this.props.children
        :
        null
        }
      </RC.Animate>
  }
}

RC.AnimateWindow.displayName = "RC.AnimateWindow"
