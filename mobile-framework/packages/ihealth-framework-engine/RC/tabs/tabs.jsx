
RC.Tabs = React.createClass({
  mixins: [RC.Mixins.PureRender,RC.Mixins.CSS],
  displayName: "Tabs",

  propTypes: {
    initialState: React.PropTypes.number,
    forceClicked: React.PropTypes.number,
    activateOnHold: React.PropTypes.bool,
    activateOnClick: React.PropTypes.bool,

    color: React.PropTypes.string,
    bgColor: React.PropTypes.string,

    theme: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.array,
    ]),

    id: React.PropTypes.string,
    style: React.PropTypes.object,
  },
  // @@@@
  // @@@@
  // Prep
  // @@@@
  // @@@@
  componentWillMount(){
    this.children = h.uniformChildren(this.props.children, "URL")
  },
  componentWillUpdate(np,ns){
    this.children = h.uniformChildren(np.children, "URL")
  },
  // @@@@
  // @@@@
  // State Control
  // @@@@
  // @@@@
  getInitialState(){
    return {
      hold: null,
      active: _.isNumber(this.props.initialState) ? this.props.initialState : -1
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
  },
  setActive(num, func){
    this.setState({ active: num })
    // Putting handlers here makes it a lot more intuitive
    if (_.isFunction(func))
      func()
  },
  renderTabSelector(){
    if (_.contains(this.css.themeNames, "slider"))
      return <div style={this.css.styles.tabActive}>
        <span style={this.css.styles.tabCursor}/>
      </div>
  },
  renderIcon(props, color, index){
    if (!props.uiClass) return null
    return <RC.uiIcon
      {... _.pick(props, _.without(RC.uiKeys,"uiBgColor"))}
      key={"ui"+index}
      uiClass={this.state.active==index && props.uiClassCur ? props.uiClassCur : props.uiClass}
      uiColor={props.uiColor || color}
      theme="inline-block-left" uiSize={14} />
  },
  render() {
    let self = this
    let styles = this.css.styles
    let color = this.color

    let allowHold = _.isUndefined(self.props.activateOnHold) || self.props.activateOnHold
    let allowClick = _.isUndefined(self.props.activateOnClick) || self.props.activateOnClick

    let bb = <nav style={styles.canvasInner}>
      {
      this.children.map(function(c,n) {

        var buttonState = null
        if (self.state.hold==n || self.state.active==n || self.props.forceClicked==n)
          buttonState = ":clicked"
        else if (self.state.hold==(n-1) || self.state.active==(n-1) || self.props.forceClicked==(n-1))
          buttonState = ":afterClicked"

        var props = c.props
        props.key = n
        props.style = h.jsToCss(styles.item, n, self.children.length, buttonState)
        props.color = self.color.textColor

        if (self.props.bgColor && !_.contains(["white","light"],self.props.bgColor))
          props.noHover = typeof c.noHover==="undefined" ? true : c.noHover

        if (allowHold) {
          props.onMouseDown = self.startHold.bind(null,n,c.props.onMouseDown)
          props.onTouchStart = self.startHold.bind(null,n,c.props.onTouchStart)
          props.onMouseUp = self.stopHold.bind(null,n,c.props.onMouseUp)
          props.onTouchEnd = self.stopHold.bind(null,n,c.props.onTouchEnd)
        }
        if (allowClick)
          props.onClick = self.setActive.bind(null,n,c.props.onClick)

        let ui = self.renderIcon(_.pick(c.props,RC.uiKeys), color.textColor, n)
        var urlChildren

        if (_.isArray(c.props.children)) {
          urlChildren = c.props.children
          urlChildren.unshift(ui)
        } else
          urlChildren = [ui, <span key={"c"+n}>{c.props.children}</span>]

        return React.createElement(RC.URL, props, urlChildren)
      })
      }
    </nav>

    return <div {... _.omit(this.props,"theme","activateOnClick","activateOnHold","initialState")} style={styles.canvas}>
      {bb}
      {this.renderTabSelector()}
    </div>
  },
  // @@@@
  // @@@@
  // Styles Start
  // @@@@
  // @@@@
  watchProps: ["cursorColor","forceClicked","children"],
  watchStates: ["active"],
  noBorders(np,ns) {
    return _.contains(
        (this.css && this.css.themeNames)
        || (_.isArray(np.theme) ? np.theme : [np.theme])
    , "no-borders")
  },
  defBgColor(np,ns) {
    return this.noBorders(np,ns) ? "white" : "light"
  },
  clickedBorderColor: null,
  defaultBorderColor: null,
  baseStyles(np,ns) {
    if (!this.clickedBorderColor || !_.isEqual(this.color, this.css.basicStyles))
      this.clickedBorderColor = tinycolor(this.color.hex).darken(this.color.isDark ? 18 : 35).toHexString()

    if (!this.defaultBorderColor || !_.isEqual(this.color, this.css.basicStyles))
      this.defaultBorderColor = this.color.isDark ? RC.Theme.color.edgesDarker : RC.Theme.color.edges

    let childrenLength = this.children ? this.children.length : this.props.children.length

    let cursorColor = np.cursorColor
      ? h.getBasicStyles(np.cursorColor).hex
      : this.color.textColor

    return {
      // Canvas Outer
      canvas: {
        position: "relative", zIndex: 1, overflow: "hidden",
        display: "flex", width: "100%",
        userSelect: "none",
        paddingTop: "5px", paddingBottom: "5px", paddingLeft: "5px", paddingRight: "5px",
        backgroundColor: this.color.hex,
      },
      // Canvas Inner
      canvasInner: {
        display: "flex", flex: 1, width: "100%",
        backgroundColor: this.color.hex,
      },
      // Links
      item: h.assignClone( RC.cssMixins.button, {
        display: "block", width: "auto", float: "left", flex: 1,
        fontSize: "13px", lineHeight: "32px", textAlign: "center",
        minWidth: "initial", minHeight: "31px",
        borderWidth: "1px 0 1px 1px", borderRadius: 0, borderColor: this.defaultBorderColor,
        overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
        ":clicked": {
          boxShadow: "inset 0 1px 4px rgba(0,0,0,.1)",
          borderColor: this.clickedBorderColor,
          backgroundColor: tinycolor(this.color.hex).darken(10).toHexString(),
        },
        ":firstChild": {
          borderRadius: "2px 0 0 2px",
        },
        ":lastChild": {
          borderRadius: "0 2px 2px 0", borderWidth: "1px",
        },
        ":afterClicked": {
          borderColor: this.defaultBorderColor+" "+this.defaultBorderColor+" "+this.defaultBorderColor+" "+this.clickedBorderColor
        },
      }),
      // Active Tab Selection
      tabActive: {
        transition: "all .4s ease",
        position: "absolute", top: "auto", bottom: 0, left: 100/childrenLength*(np.forceClicked || ns.active)+"%",
        width: (100/childrenLength)+"%", height: 2,
      },
      tabCursor: {
        position: "absolute", top: 0, bottom: 0, left: 10, right: 10,
        backgroundColor: cursorColor,
      }
    }
  },
  themeStyles(np,ns) {
    let noLines = {
      borderWidth: 0, padding: "2px 0",
      ":clicked": { boxShadow: "none", backgroundColor: this.color.hex },
      ":firstChild": { borderRadius: 0 },
      ":lastChild": { borderRadius: 0, borderWidth: 0, },
    }
    return {
      // Big Theme
      big: {
        canvas: {
          userSelect: "none",
          paddingTop: "10px", paddingBottom: "10px", paddingLeft: "10px", paddingRight: "10px",
          backgroundColor: "transparent"
        },
        canvasInner: {},
        item: {
          fontSize: RC.cssMixins.button.fontSize, lineHeight: RC.cssMixins.button.lineHeight,
          minHeight: RC.cssMixins.button.minHeight
        },
      },
      // Header Theme
      header: {
        canvas: {
          position: "absolute",
          top: 0, left: 0, right: 0,
        },
        canvasInner: {},
        item: {},
      },
      // Footer Theme
      footer: {
        canvas: {
          position: "absolute",
          bottom: 0, left: 0, right: 0,
        },
        canvasInner: {},
        item: {},
      },
      // No Lines Theme
      "no-borders": {
        canvas: {
          paddingTop: 2, paddingBottom: 2, paddingLeft: 0, paddingRight: 0,
        },
        canvasInner: {},
        item: noLines,
      },
      // Sliders
      slider: {
        canvas: {
          paddingTop: 2, paddingBottom: 2, paddingLeft: 0, paddingRight: 0,
        },
        item: noLines
      }
    }
  },
})
