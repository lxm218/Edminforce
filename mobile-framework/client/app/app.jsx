
App.Main = React.createClass({
  openNav() {
    this.refs.nav.open()
  },
  render() {

    return <RC.Body>
      <RC.HeaderNav nav={this.props.headerNav} title={this.props.title} useMiniNav={!!this.props.headerNav}>
        <RC.URL>This is an Example</RC.URL>
        <RC.URL>Ripe Peaches</RC.URL>
        <RC.URL>Red Apples</RC.URL>
        <RC.URL>Blue Blueberries</RC.URL>
        <RC.URL>Rotten Tomatoes</RC.URL>
      </RC.HeaderNav>

      <RC.MobileContentArea>
        {this.props.body}
      </RC.MobileContentArea>
    </RC.Body>
  }
})
