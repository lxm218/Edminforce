
App.Global_Nav = React.createClass({
  getInitialState() {
    return {
      isVisible: true
    }
  },
  globalNav: [
    { label: "Home", href: "/globalNav/Global_Nav_Index", uiClass: "hand-rock-o", uiClassCur: "check", uiColor: "brand", uiColorCur: "brand2" },
    { label: "Top", href: "/globalNav/Top_Global_Nav", uiClass: "hand-paper-o", uiClassCur: "check", uiColor: "brand", uiColorCur: "brand2" },
    { label: "Auto", href: "/globalNav/Global_Nav", uiClass: "hand-peace-o", uiClassCur: "check", uiColor: "brand", uiColorCur: "brand2" },
    { label: "Bot", href: "/globalNav/Bottom_Global_Nav", uiClass: "hand-scissors-o", uiClassCur: "check", uiColor: "brand", uiColorCur: "brand2" },
  ],
  switchVisibility() {
    this.setState({
      isVisible: !this.state.isVisible
    })
  },
  render() {
    return <div>
      <RC.GlobalNav isVisible={this.state.isVisible} list={this.globalNav} location={this.props.loc}/>
      <RC.Div bgColor="brand1Light" theme={["padding","full"]}>
       <h3>{h.capitalize(this.props.loc)} Global Nav</h3>
       <p>
         By default on iOS devices, the Global Nav will be placed at the top. On Android devices, it will be placed at bottom.
       </p>
       <p>
         If you want to override the automatic location of the Global Nav, you must set the location prop to "top" or "bottom".
       </p>
       <p>
         <RC.URL style={{color: "red"}} onClick={this.switchVisibility}>{this.state.isVisible ? "Hide" : "Show"} Global Nav</RC.URL>
       </p>
      </RC.Div>
    </div>
  }
})
