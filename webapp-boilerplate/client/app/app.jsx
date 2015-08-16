
App.Main = React.createClass({
  getInitialState() {
    return {
      nav: Meteor.Device.isDesktop() ? true : false,
      animating: false
    }
  },
  toggleNav() {
    this.setState({
      nav: !this.state.nav,
      animating: true
    })

    var self = this
    Meteor.setTimeout( function(){
      self.setState({ animating: false })
    },250)
  },
  render() {
    return <div className={(this.state.nav ? "nav-open" : "nav-closed")+(this.state.animating ? "" : " fin")} id="app-root">

      <div className="transition-opacity" id="app-nav-back" />
      <App.Nav toggleNavFunc={this.toggleNav} />
      <App.Header toggleNavFunc={this.toggleNav} />
      <App.Body tmpl={this.props.body} />

    </div>
  }
})

Meteor.startup(function(){

  // Not available for Meteor-React -- "yet"
  // React.initializeTouchEvents(true)

})
