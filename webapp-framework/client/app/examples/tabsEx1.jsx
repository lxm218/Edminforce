
App.TabsEx1 = App.Example(
  React.createClass({
    mixins: [RC.Mixins.PureRender],

    renderCode() {
        let code = '\
React.createClass({@br\
  getInitialState() {@br\
    return { tab: 0 }@br\
  },@br\
  changeTab(num) {@br\
    this.setState({ tab: num })@br\
  },@br\
  renderTab() {@br\
    let content;@br\
@br\
    // These are all valid colors@br\
    let white = "#FFF";@br\
    let yellow = RC.Theme.color.yellow;@br\
    let orange = "orange";@br\
@br\
    switch (this.state.tab) {@br\
      case 0:@br\
        content = <span style={{color: white}}>Hello World!</span>@br\
      break@br\
      case 1:@br\
        content = <span style={{color: yellow}}>Superman can fly!</span>@br\
      break@br\
      case 2:@br\
        content = <span style={{color: orange}}>Batman rides a Batmobile!</span>@br\
      break@br\
    }@br\
    return <div style={{textAlign: "center", padding: 20}}>@br\
      {content}@br\
    </div>@br\
  },@br\
  render() {@br\
    return <RC.Div bgColor="brand1">@br\
      <RC.Tabs bgColor="brand1" initialTab={0} onChange={this.changeTab}>@br\
        <RC.URL>Tab 1</RC.URL>@br\
        <RC.URL>Tab 2</RC.URL>@br\
        <RC.URL>Tab 3</RC.URL>@br\
      </RC.Tabs>@br\
      {this.renderTab()}@br\
    </RC.Div>@br\
  },@br\
})'

      return <code dangerouslySetInnerHTML={{__html: h.stringToCodeHL(code)}} />
    },
    getInitialState() {
      return { tab: 0 }
    },
    changeTab(num) {
      this.setState({ tab: num })
    },
    renderTab() {
      let content
      switch (this.state.tab) {
        case 0:
        content = <span style={{color: "#FFF"}}>Hello World!</span>
        break
        case 1:
        content = <span style={{color: RC.Theme.color.yellow}}>Superman can fly!</span>
        break
        case 2:
        content = <span style={{color: "orange"}}>Batman rides a Batmobile!</span>
        break
      }
      return <div style={{textAlign: "center", padding: 20}}>
        {content}
      </div>
    },
    renderExample() {
      return <RC.Div bgColor="brand1">
        <RC.Tabs bgColor="brand1" initialTab={0} onChange={this.changeTab}>
          <RC.URL>Tab 1</RC.URL>
          <RC.URL>Tab 2</RC.URL>
          <RC.URL>Tab 3</RC.URL>
        </RC.Tabs>
        {this.renderTab()}
      </RC.Div>
    },
    render() {
      return this.props.code
        ? this.renderCode()
        : (typeof this.props.snippet==="undefined" ? this.renderExample() : this.renderSnippet())
    },
  })
)
