
App.Main = React.createClass({
  render() {
    return <div className={h.getPlatform()} id="app-root">
      <RC.HeaderNav nav={this.props.headerNav} title={this.props.title} theme="flat" />
      <RC.GlobalNav isVisible={this.props.showGlobalNav} list={this.props.globalNav} location={this.props.globalNavLocation} theme="flat" />
      <App.Body tmpl={this.props.body} />
    </div>
  }
})
