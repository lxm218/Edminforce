
RC.TopNav = React.createClass({
  mixins: [RC.Mixins.PureRender,RC.Mixins.CSS],
  displayName: "TopNav",

  propTypes: {
    color: React.PropTypes.string,
    bgColor: React.PropTypes.string,
    cursorColor: React.PropTypes.string,

    theme: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.array,
    ]),

    logoUrl: React.PropTypes.string,
    createSpaceForLeftNav: React.PropTypes.bool,
    activateOnHold: React.PropTypes.bool
  },
  // @@@@
  // @@@@
  // State Control
  // @@@@
  // @@@@
  getInitialState(){
    return {
      hold: null,
    }
  },
  startHold(num, func){
    this.setState({ hold: num })
    // Putting handlers here makes it a lot more intuitive
    if (_.isFunction(func))
      func()
  },
  stopHold(func){
    this.setState({ hold: null })
    // Putting handlers here makes it a lot more intuitive
    if (_.isFunction(func))
      func()
  },
  // @@@@
  // @@@@
  // Render
  // @@@@
  // @@@@
  renderLogo() {
    if (this.props.logoUrl)
      return <img src={this.props.logoUrl} style={this.css.styles.logo} />
    return null
  },
  renderChildren() {
    let self = this
    let styles = this.css.styles
    let allowHold = _.isUndefined(this.props.activateOnHold) || this.props.activateOnHold
    let children = h.uniformChildren(this.props.children, "URL")

    return children.map(function(c,n) {

      var buttonState = null
      if (self.state.hold==n)
        buttonState = ":clicked"
      else if (self.state.hold==(n-1))
        buttonState = ":afterClicked"

      let props = c.props
      props.key = n
      props.style = h.jsToCss(styles.item, n, children.length, buttonState)
      props.color = self.color.textColor
      props.colorHover = self.color.textColor

      if (allowHold) {
        props.onMouseDown = self.startHold.bind(null,n,c.props.onMouseDown)
        props.onTouchStart = self.startHold.bind(null,n,c.props.onTouchStart)
        props.onMouseUp = self.stopHold.bind(null,n,c.props.onMouseUp)
        props.onTouchEnd = self.stopHold.bind(null,n,c.props.onTouchEnd)
      }

      let child = self.props.cur==c.props.href
        ? [<span key={1}>{c.props.children}</span>, <span style={styles.cursor} key={2}/>]
        : c.props.children

      return React.createElement(RC.URL, props, child)
    })
  },
  render() {
    let styles = this.css.styles
    return <nav style={styles.area}>
      {this.renderLogo()}
      {this.renderChildren()}
    </nav>
  },
  // @@@@
  // @@@@
  // Styles
  // @@@@
  // @@@@
  watchProps: ["cursorColor","createSpaceForLeftNav","fontWeight"],
  watchStates: ["active"],
  baseStyles(np,ns) {

    let PAD = 15

    if (typeof this.cursorColor==="undefined" || np.cursorColor!=this.props.cursorColor)
      this.cursorColor = np.cursorColor
        ? h.getRealColor(np.cursorColor, "textColor", null, true)
        : this.color.textColor

    return {
      area: {
        position: "absolute", top: 0, right: 0, zIndex: 1000,
        left: np.createSpaceForLeftNav ? RC.Theme.size.leftNavWidth : 0,
        backgroundColor: this.color.hex, color: this.color.textColor,
        display: "flex", alignItems: "center",
        height: RC.Theme.size.topNavHeight,
        padding: `0 ${PAD}px`
      },
      logo: {
        height: RC.Theme.size.topNavHeight-PAD*2,
        margin: PAD
      },
      // Items
      item: h.assignClone( RC.cssMixins.font(np.fontWeight || "regular"),{
        position: "relative", display: "inline-block", padding: `10px ${PAD}px 2px`, margin: "0 0 9px"
      }),
      cursor: {
        position: "absolute", bottom: 0, left: PAD, right: PAD,
        height: 1,
        background: this.cursorColor
      }
    }
  }
})

// <div className="transition-opacity" id="app-nav-back" />
// <App.Nav toggleNavFunc={this.toggleNav} />
// <App.Header toggleNavFunc={this.toggleNav} />
// <App.Body tmpl={this.props.body} />
