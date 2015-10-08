
RC.AnimateWindow = React.createClass({
  mixins: [RC.Mixins.PureRender],
  displayName: "AnimateWindow",
  render() {
    let props = _.omit(this.props, ["tmpl","transitionName"])
    return <RC.Animate transitionName={this.props.transitionName || "from-right"}>
      {
      !!this.props.tmpl
      ?
      <div {... props} key="route-animation">
        {this.props.tmpl}
      </div>
      :
      null
      }
    </RC.Animate>
  },
})
