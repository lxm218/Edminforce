
App.TabsEx1 = App.Example(
  class extends RC.Code {
    code() {
      return `
    constructor(props) {
      super(props)
      this.state = {
        obj: Immutable.Map({ tab: 0})
      }
    }
    changeTab(num) {
      this.setStateObj({ tab: num })
    }
    renderTab() {
      let content
      switch (this.state.obj.get("tab")) {
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
    }
    renderExample() {
      return <RC.Div bgColor="brand1">
        <RC.Tabs bgColor="brand1" initialTab={0} onChange={this.changeTab.bind(this)}>
          <RC.URL>Tab 1</RC.URL>
          <RC.URL>Tab 2</RC.URL>
          <RC.URL>Tab 3</RC.URL>
        </RC.Tabs>
        {this.renderTab()}
      </RC.Div>
    }
  `
    }
    constructor(props) {
      super(props)
      this.state = {
        obj: Immutable.Map({ tab: 0})
      }
    }
    changeTab(num) {
      this.setStateObj({ tab: num })
    }
    renderTab() {
      let content
      switch (this.state.obj.get("tab")) {
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
    }
    renderExample() {
      return <RC.Div bgColor="brand1">
        <RC.Tabs bgColor="brand1" initialTab={0} onChange={this.changeTab.bind(this)}>
          <RC.URL>Tab 1</RC.URL>
          <RC.URL>Tab 2</RC.URL>
          <RC.URL>Tab 3</RC.URL>
        </RC.Tabs>
        {this.renderTab()}
      </RC.Div>
    }
  }
)
