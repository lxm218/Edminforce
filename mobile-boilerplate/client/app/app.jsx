
App.Main = React.createClass({
  render() {

    let footerList = [
      { label: "Ex1", href: "/Ex1" },
      {
        label: "Ex2",

        href:"/Ex2"
      },
      {label: "Ex3", href: "/Ex3" },
      {label:"Task", href:"/Task"}
    ]

    return <div className={h.getPlatform()} id="app-root">
      <RC.HeaderNav nav={this.props.headerNav} title={this.props.title} theme="flat" />
      <RC.GlobalNav isVisible={this.props.showGlobalNav} list={footerList} theme="flat" />
      <App.Body tmpl={this.props.body} />
    </div>
  }
})
