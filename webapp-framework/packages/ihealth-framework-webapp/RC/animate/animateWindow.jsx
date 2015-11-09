
RC.AnimateWindow = React.createClass({
  mixins: [RC.Mixins.PureRender],
  displayName: "AnimateWindow",
  render() {
    let props = _.omit(this.props, ["tmpl","transitionName"])

    return <RC.Animate transitionName={this.props.transitionName || "from-right"}>
        {
        !!this.props.children
        ?
        this.props.children
        :
        null
        }
      </RC.Animate>
  },
})
