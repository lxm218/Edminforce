
App.Main = React.createClass({
  openLeftNav() {
    this.refs.LeftNav.open()
  },
  render() {

    let navList = [
      { text: "Pages", type: "title" },
      { text: "Swipe", href: "/examples/Swipe" },
      { text: "Chat", href: "/examples/Chat" },
      { text: "Cards", href: "/examples/Cards" },
      { text: "Timeline", href: "/examples/Timeline" },
      { text: "List", href: "/examples/List" },
      { text: "Tabs", href: "/examples/Tabs" },
      { text: "Form Elements", href: "/examples/Form" },
      { text: "Header Nav", href: "/examples/Header" },
      { text: "Global Nav", href: "/examples/Global_Nav" },
    ]

    return <div className={h.getPlatform()} id="app-root">
      <RC.LeftNav navList={navList} ref="LeftNav" />
      <RC.HeaderNav nav={this.props.headerNav} title={this.props.title} />
      <RC.GlobalNav isVisible={this.props.showGlobalNav} list={this.props.globalNav} location={this.props.globalNavLocation}/>
      <App.Body tmpl={this.props.body} props={{openLeftNav: this.openLeftNav}} />
    </div>
  }
})
