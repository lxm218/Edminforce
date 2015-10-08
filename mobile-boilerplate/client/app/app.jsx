
App.Main = React.createClass({
  render() {
    return <RC.Body>
      <RC.HeaderNav nav={this.props.headerNav} title={this.props.title} />
      <RC.GlobalNav isVisible={this.props.showGlobalNav} list={this.props.globalNav} location={this.props.globalNavLocation} />
      <RC.MobileContentArea>
        {this.props.body}
      </RC.MobileContentArea>
    </RC.Body>
  }
})
