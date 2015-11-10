
RC.Tabs = React.createClass({
  mixins: [RC.Mixins.PureRender,RC.Mixins.CSS],
  displayName: "Tabs",

  propTypes: {
    initialTab: React.PropTypes.number,
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
      active: _.isNumber(this.props.initialTab) ? this.props.initialTab : -1
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
  // startHover(num, func){
  //   this.setState({ hover: num })
  //   // Putting handlers here makes it a lot more intuitive
  //   if (_.isFunction(func))
  //     func()
  // },
  // stopHover(func){
  //   this.setState({ hover: null })
  //   // Putting handlers here makes it a lot more intuitive
  //   if (_.isFunction(func))
  //     func()
  // },
  setActive(num, func){
    this.setState({ active: num })
    // Putting handlers here makes it a lot more intuitive
    if (_.isFunction(func))
      func()
    if (_.isFunction(this.props.onChange))
      this.props.onChange(num)
  },
  renderTabSelector(){
    if (_.contains(this.css.themeNames,"slider") && !_.contains(this.css.themeNames,"inline"))
      return <div style={this.css.styles.tabActive}>
        <span style={this.css.styles.tabCursor}/>
      </div>
  },
  render() {
    let self = this
    let styles = this.css.styles
    let color = this.color

    let allowHold = _.isUndefined(this.props.forceClicked) && (_.isUndefined(this.props.activateOnHold) || this.props.activateOnHold)
    let allowClick = _.isUndefined(this.props.forceClicked) && (_.isUndefined(this.props.activateOnClick) || this.props.activateOnClick)

    let bb = <nav style={styles.areaInner}>
      {
      this.children.map(function(c,n) {
        var buttonState = null
        if (self.state.hold==n || self.state.active==n || self.props.forceClicked==n)
          buttonState = ":clicked"
        else if (self.state.hold==(n-1) || (self.state.active>=0 && self.state.active==(n-1)) || self.props.forceClicked==(n-1))
          buttonState = ":afterClicked"
        else if (self.state.hover==n)
          buttonState = ":hover"

        var props = {
          key: n,
          color: self.color.textColor,
          uiSize: styles.item.fontSize,
          style: h.jsToCss(styles.item, n, self.children.length, buttonState)
        }

        if (self.props.bgColor && !_.contains(["white","light"],self.props.bgColor))
          props.noHover = typeof c.noHover==="undefined" ? true : c.noHover

        if (allowHold) {
          props.onMouseDown = self.startHold.bind(null,n,c.props.onMouseDown)
          props.onTouchStart = self.startHold.bind(null,n,c.props.onTouchStart)
          props.onMouseUp = self.stopHold.bind(null,n,c.props.onMouseUp)
          props.onMouseLeave = self.stopHold.bind(null,n,c.props.onMouseLeave)
          props.onTouchEnd = self.stopHold.bind(null,n,c.props.onTouchEnd)
        }
        if (allowClick)
          props.onClick = self.setActive.bind(null,n,c.props.onClick)

        // props.onMouseOver = self.startHover.bind(null,n,c.props.onMouseOver)
        // props.onMouseOut = self.stopHover.bind(null,c.props.onMouseOut)

        var urlChildren

        if (_.isArray(c.props.children)) {
          urlChildren = c.props.children
          urlChildren.unshift(ui)
        } else
          urlChildren = [<span key={"c"+n}>{c.props.children}</span>]

        if (buttonState==":clicked" && c.props.uiClassCur && c.props.uiClass)
          props.uiClass = c.props.uiClassCur

        return React.cloneElement(c, props, urlChildren)
      })
      }
    </nav>

    return <div {... _.omit(this.props,"theme","activateOnClick","activateOnHold","initialTab")} style={styles.area}>
      {bb}
      {this.renderTabSelector()}
    </div>
  },
  // @@@@
  // @@@@
  // Styles Start
  // @@@@
  // @@@@
  watchProps: ["cursorColor","forceClicked","children","clickedBgColor","clickedColor"],
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
    let childrenLength = this.children ? this.children.length : this.props.children.length

      if (!this.clickedBorderColor || this.color.hex!=(this.css && this.css.hex))
        this.clickedBorderColor = tinycolor(this.color.hex).darken(this.color.isDark ? 18 : 35).toHexString()

      if (!this.defaultBorderColor || this.color.hex!=(this.css && this.css.hex))
        this.defaultBorderColor = this.color.isDark ? RC.Theme.color.edgesDarker : RC.Theme.color.edges

      if (typeof this.cursorColor==="undefined" || np.cursorColor!=this.props.cursorColor)
        this.cursorColor = np.cursorColor
          ? h.getRealColor(np.cursorColor, "textColor", null, true)
          : this.color.textColor

      if (typeof this.clickedBgColor==="undefined" || np.clickedBgColor!=this.props.clickedBgColor)
        this.clickedBgColor = np.clickedBgColor
          ? h.getRealColor(np.clickedBgColor, null, null, true)
          : null

      if (typeof this.clickedColor==="undefined" || np.clickedColor!=this.props.clickedColor)
        this.clickedColor = np.clickedColor
          ? h.getRealColor(np.clickedColor, null, null, true)
          : this.color.textColor

    return {
      // Canvas Outer
      area: {
        position: "relative", zIndex: 1, overflow: "hidden",
        display: "flex", width: "100%",
        paddingTop: 5, paddingBottom: 5, paddingLeft: 5, paddingRight: 5,
        backgroundColor: this.color.hex,
        WebkitUserSelect: "none",
      },
      // Canvas Inner
      areaInner: {
        display: "flex", flex: 1, width: "100%",
        backgroundColor: this.color.hex,
      },
      // Links
      item: h.assignClone( RC.cssMixins.button, {
        display: "block", width: "auto", float: "left", flex: 1,
        fontSize: RC.Theme.font.size-2, lineHeight: "32px", textAlign: "center",
        minWidth: "initial", minHeight: 31,
        borderWidth: "1px 0 1px 1px", borderRadius: 0, borderColor: this.defaultBorderColor,
        overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
        ":clicked": {
          boxShadow: "inset 0 1px 4px rgba(0,0,0,.1)",
          borderColor: this.clickedBorderColor,
          backgroundColor: this.clickedBgColor || tinycolor(this.color.hex).darken(10).toHexString(),
          color: this.clickedColor
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
        backgroundColor: this.cursorColor,
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
      // Small
      small: {
        area: {
          background: "none",
          paddingTop: 0, paddingBottom: 0, paddingLeft: 0, paddingRight: 0,
        },
        item: {
          minHeight: 24, lineHeight: "25px",
        }
      },
      // Big
      big: {
        area: {
          paddingTop: "10px", paddingBottom: "10px", paddingLeft: "10px", paddingRight: "10px",
          backgroundColor: "transparent"
        },
        areaInner: {},
        item: {
          fontSize: RC.cssMixins.button.fontSize, lineHeight: RC.cssMixins.button.lineHeight,
          minHeight: RC.cssMixins.button.minHeight
        },
      },
      // Reverse
      reverse: {
        item: {
          borderColor: this.clickedBgColor,
          ":clicked": {
            borderColor: "transparent", backgroundColor: this.clickedBgColor, color: this.clickedColor
          },
          ":afterClicked": {
            borderColor: this.clickedBgColor
          },

        }
      },
      // No Lines
      "no-borders": {
        area: {
          paddingTop: 2, paddingBottom: 2, paddingLeft: 0, paddingRight: 0,
        },
        areaInner: {},
        item: noLines,
      },
      // Sliders
      slider: {
        area: {
          paddingTop: 2, paddingBottom: 2, paddingLeft: 0, paddingRight: 0,
        },
        item: noLines
      },
      // Inline
      inline: {
        area: {
          display: "block", width: "100%", backgroundColor: "none",
          paddingTop: 0, paddingBottom: 0, paddingLeft: 0, paddingRight: 0,
        },
        areaInner: {
          display: "block"
        },
        item: {
          margin: "8px 2px 8px 0",
          backgroundColor: this.color.hex, color: this.color.textColor,
          border: "none",
        }
      },
      // Folder Tabs
      folder: {
        area: {
          position: "absolute", top: -32, left: 0,
          width: "auto", height: 32,
          paddingTop: 0, paddingBottom: 0, paddingLeft: 0, paddingRight: 0,
          borderRadius: "2px 2px 0 0", overflow: "hidden"
        },
        item: {
          border: "none",
          overflow: "hidden", textOverflow: "clip", whiteSpace: "normal",
          flex: "0 1 auto",
          backgroundColor: this.clickedBgColor || tinycolor(this.color.hex).darken(10).toHexString(),
          ":clicked": {
            borderColor: this.clickedBorderColor,
            backgroundColor: this.color.hex,
            color: this.color.textColor
          },
        }
      }
    }
  },
})
