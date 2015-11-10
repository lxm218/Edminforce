
RC.Grid = React.createClass({
  mixins: [RC.Mixins.PureRender,RC.Mixins.CSS],
  displayName: "FlexBoxArea",

  propTypes: {
    color: React.PropTypes.string,
    bgColor: React.PropTypes.string,

    theme: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.array,
    ]),

    flexDirection: React.PropTypes.string,
    flexWrap: React.PropTypes.string,
    justifyContent: React.PropTypes.string,
    alignContent: React.PropTypes.string,
    alignItems: React.PropTypes.string,
    xAlign: React.PropTypes.string,
    yAlign: React.PropTypes.string,
    order: React.PropTypes.number,
  },

  render() {
    let styles = this.css.styles
    return <div style={styles.area}>
      {this.props.children}
    </div>
  },
  // @@@@
  // @@@@
  // Styles
  // @@@@
  // @@@@
  watchProps: ["flexDirection","flexWrap","justifyContent","alignContent","alignItems"],
  baseStyles(np,ns) {

    let size = typeof np.size==="undefined" ? 100 : np.size
    let flexDirection = _.contains(["row","row-reverse","column","column-reverse"], np.flexDirection)
      ? np.flexDirection : "row"
    let flexWrap = _.contains(["nowrap","wrap","wrap-reverse"], np.flexWrap)
      ? np.flexWrap : "nowrap"
    let justifyContent = _.contains(["flex-start","flex-end","center","space-between","space-around"], np.justifyContent)
      ? np.justifyContent : "flex-start"
    let alignContent = _.contains(["flex-start","flex-end","center","space-between","space-around"], np.alignContent)
      ? np.alignContent : "flex-start"
    let alignItems = _.contains(["flex-start","flex-end","center","stretch","baseline"], np.alignItems)
      ? np.alignItems : "flex-start"

    return {
      area: {
        position: "relative", zIndex: 1,
        display: "flex", width: "100%",
        flexFlow: `${flexDirection} ${flexWrap}`,
        justifyContent: justifyContent,
        alignItems: alignItems,
        alignContent: alignContent,
        backgroundColor: this.color.realHex, color: this.color.textColor,
        paddingTop: 0, paddingBottom: 0, paddingLeft: 0, paddingRight: 0,
      }
    }
  },
  themeStyles(np,ns) {
    return h.assignClone(RC.ThemeHelpers.core(), {
      // Content Area
      content: {
        area: {
          maxWidth: RC.Theme.size.contentArea
        },
      },
    })
  }
})




RC.GridItem = React.createClass({
  mixins: [RC.Mixins.PureRender,RC.Mixins.CSS],
  displayName: "FlexBoxItem",

  propTypes: {
    color: React.PropTypes.string,
    bgColor: React.PropTypes.string,

    theme: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.array,
    ]),

    flexGrow: React.PropTypes.number,
    flexShrink: React.PropTypes.number,
    flexBasis: React.PropTypes.number,
  },

  render() {
    let styles = this.css.styles
    return <div style={styles.area}>
      {this.props.children}
    </div>
  },
  // @@@@
  // @@@@
  // Styles
  // @@@@
  // @@@@
  watchProps: ["xAlign","yAlign","flexGrow","flexShrink","flexBasis","order","fixedWidth","width","height"],
  baseStyles(np,ns) {
    let flexGrow = typeof np.flexGrow!=="undefined"
      ? np.flexGrow : 0
    let flexShrink = typeof np.flexShrink!=="undefined"
      ? np.flexShrink : 1
    let flexBasis = typeof np.flexBasis!=="undefined"
      ? np.flexBasis : "auto"

    let flexAttr = { flex: `${flexGrow} ${flexShrink} ${flexBasis}`, }
    if (typeof np.order!=="undefined")
      flexAttr.order = np.order
    if (typeof np.xAlign!=="undefined")
      flexAttr.xAlign = np.xAlign

    // Y Align
    if (typeof np.yAlign!=="undefined") {
      if (_.contains(["auto","flex-start","flex-end","center","baseline","stretch"],np.yAlign))
        flexAttr.alignSelf = np.yAlign
      else if (np.yAlign=="top")
        flexAttr.alignSelf = "flex-start"
      else if (np.yAlign=="bottom")
        flexAttr.alignSelf = "flex-end"
    }

    // X Align
    if (typeof np.xAlign!=="undefined") {
      if (np.xAlign=="right")
        flexAttr.marginLeft = "auto"
      else if (np.xAlign=="center") {
        flexAttr.marginLeft = "auto"
        flexAttr.marginRight = "auto"
      }
    }

    if (typeof np.width!=="undefined" || typeof np.fixedWidth!=="undefined")
      flexAttr.width = typeof np.fixedWidth==="undefined" ? np.width : np.fixedWidth
    if (typeof np.fixedWidth!=="undefined")
      flexAttr.minWidth = np.fixedWidth
    if (typeof np.height!=="undefined")
      flexAttr.height = np.height

    return {
      area: h.assignClone(flexAttr, {
        position: "relative", zIndex: 1,
        backgroundColor: this.color.realHex, color: this.color.textColor,
        paddingTop: 0, paddingBottom: 0, paddingLeft: 0, paddingRight: 0,
      })
    }
  },
  themeStyles(){
    return RC.ThemeHelpers.core()
  }
})
