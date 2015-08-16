
App.Main = React.createClass({
  render() {

    let footerList = [
      { label: "Dashboard", href: "/", uiClass: "area-chart" },
      {
        label: "Mailbox",
        uiClass: "coffee",
        onClick: function(){
          console.log("Hello! I am an event handler.")
        },
      },
      { label: "Gallery", href: "#", uiClass: "shield" },
    ]

    return <div className={h.getPlatform()} id="app-root">
      <RC.HeaderNav nav={this.props.headerNav} title={this.props.title} theme="flat" />
      <RC.GlobalNav isVisible={this.props.showGlobalNav} list={footerList} theme="flat" />
      <App.Body tmpl={this.props.body} />
    </div>
  }
})
