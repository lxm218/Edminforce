
App.Layout.TopRoute = React.createClass({
  render() {
    return <RC.Animate transitionName="zoom">
      {
      !!this.props.tmpl
      ?
      <div key="route-animation">
        {h.returnComponent(this.props.tmpl)}
      </div>
      :
      null
      }
    </RC.Animate>
  }
})

App.Layout.LeftRoute = React.createClass({
  render() {
    return <RC.Animate transitionName="from-left">
      {
      !!this.props.tmpl
      ?
      <div key="route-animation">
        {h.returnComponent(this.props.tmpl)}
      </div>
      :
      null
      }
    </RC.Animate>
  }
})


App.Layout.RightRoute = React.createClass({
  render() {
    return <RC.Animate transitionName="from-right">
      {
      !!this.props.tmpl
      ?
      <div key="route-animation">
        {h.returnComponent(this.props.tmpl)}
      </div>
      :
      null
      }
    </RC.Animate>
  }
})
