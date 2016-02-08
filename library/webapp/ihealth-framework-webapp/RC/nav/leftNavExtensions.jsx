"use strict"

const PAD = 15

/**
 * LeftNav with Logo at top.
 * Height of logo (area) always matches the height of topNav (set from theme)
 */

RC.LeftNavLogo = class extends RC.LeftNav {
  constructor(p) {
    super(p)
    this.watchProps = this.watchProps.concat(["logo","headerBgColor"])
  }
  renderHeader() {
    if (!this.props.logo) return null
    const styles = this.css.get("styles")
    return <div style={styles.header}>
      <img src={this.props.logo} href={this.logoHref} style={styles.logo} />
    </div>
  }
  render() {
    const styles = this.css.get("styles")
    return <nav style={styles.area}>
      {this.renderHeader()}
      <div style={styles.areaInner}>
        {this.renderChildren()}
      </div>
    </nav>
  }
  // @@@@
  // @@@@
  // Styles
  // @@@@
  // @@@@
  baseStyles(np,ns) {
    let BASE = super.baseStyles(np,ns)
    if (typeof this.headerBgColor==="undefined" || np.headerBgColor!=this.props.headerBgColor)
      this.headerBgColor = h.getRealColor(np.headerBgColor, np.bgColor, "white", true)

    let topPos = 0
    if (np.logo) topPos = topPos+RC.Theme.size.topNavHeight

    Object.assign( BASE.area, { paddingTop: topPos })
    BASE.areaInner = {
      position: "absolute",
      top: topPos, bottom: 0, left: 0, right: 0,
      overflowY: "auto"
    }
    BASE.header = {
      height: RC.Theme.size.topNavHeight,
      backgroundColor: this.headerBgColor,
      position: "absolute", top: 0, left: 0, right: 0, zIndex: 2,
      display: "block", padding: PAD
    }
    BASE.logo = {
      height: RC.Theme.size.topNavHeight-PAD*2, width: "auto", margin: 0
    }

    return BASE
  }
}

RC.LeftNavLogo.displayName = "RC.LeftNavLogo"
RC.LeftNavLogo.propTypes = Object.assign({}, RC.LeftNavLogo.propTypes, {
  logo: React.PropTypes.string,
  headerBgColor: React.PropTypes.string
})

/**
 * LeftNav with tab slider at top.
 * Defaults to 75px height unless you override the styles.
 */

RC.LeftNavTabs = class extends RC.LeftNav {
  constructor(p) {
    super(p)
    this.watchProps = this.watchProps.concat(["header","headerBgColor"])
    this.watchStates = ["activeTab"]
    this.state = {
      obj: Immutable.Map({
        activeTab: this.props.initialTab || 0,
        hoverTab: null
      })
    }
  }
  componentWillMount() {
    this.childrenLen = h.getChildrenLength(this.props.children)
    super.componentWillMount()
  }
  componentWillReceiveProps(np) {
    const children = h.uniformChildren(np.children, "div")
    const len = h.getChildrenLength(children)
    if (this.childrenLen !== len) {
      this.childrenLen = len
      this.css = this.getCSS(this.css, np, this.state)
    }
  }
  // @@@@
  // @@@@
  // Events
  // @@@@
  // @@@@
  _tabClick(n) {
    this.setStateObj({ activeTab: n })
  }
  _tabHoverStart(n) {
    this.setStateObj({ hoverTab: n })
  }
  _tabHoverEnd(n) {
    this.setStateObj({ hoverTab: null })
  }
  // @@@@
  // @@@@
  // Render
  // @@@@
  // @@@@
  renderHeader() {
    if (!this.props.header) return null

    const header = React.isValidElement(this.props.header)
      ? React.cloneElement(this.props.header, {
        bgColor: this.props.headerBgColor || this.props.bgColor || this.color.get("hex")
      })
      : this.props.header

    return <div style={this.css.get("styles").header}>
      {header}
    </div>
  }
  renderTabs() {
    if (this.childrenLen < 2) return null

    const children = h.uniformChildren(this.props.children, "div")
    const styles = this.css.get("styles")
    const states = this.state.obj

    return <div style={styles.tabArea}>
      {
      h.renderWithFunction( children, (tab,n) => {
        let tabStates = []
        if (states.get("hoverTab")===n) tabStates.push(":hover")
        if (states.get("activeTab")===n) tabStates.push(":active")
        if (states.get("activeTab")===n+1) tabStates.push(":beforeActive")

        const tabProps = {
          onMouseEnter: this._tabHoverStart.bind(this, n),
          onMouseLeave: this._tabHoverEnd.bind(this, n),
          onClick: this._tabClick.bind(this, n),
          style: h.assignPseudos( styles.tab, n, this.childrenLen, tabStates )
        }

        let uiProps = _.pick(tab.props, _.without(RC.uiKeys, "uiBgColor"))
        if (!uiProps.uiColor) uiProps.uiColor = this.props.color || this.color.get("textColor")
        uiProps.theme = "absCenter"

        const badge = tab.props.badge ? <span style={styles.badge}>{tab.props.badge}</span> : null

        return <p {... tabProps} key={n}>
          {badge}
          <RC.uiIcon {... uiProps} />
        </p>
      })
      }
    </div>
  }
  renderChildren() {
    const children = h.uniformChildren(this.props.children, "div")
    const styles = this.css.get("styles")

    return h.renderWithFunction( children, (area,n) => {
      const areaProps = {
        style: styles.pane
      }
      return <div {... areaProps} key={n}>
        {
        h.renderWithFunction( area.props.children, (group,nn) => {
          const groupProps = {
            key: nn,
            theme: h.nk(group, "props.theme") || this.props.theme || undefined,
            bgColor: h.nk(group, "props.bgColor") || this.props.bgColor || this.color.get("hex"),
            color: h.nk(group, "props.color") || this.props.color || this.color.get("textColor")
          }
          return React.cloneElement(group,groupProps)
        })
        }
      </div>
    })
  }
  render() {
    const styles = this.css.get("styles")
    return <nav style={styles.area}>
      {this.renderHeader()}
      {this.renderTabs()}
      <div style={styles.areaInner}>
        {this.renderChildren()}
      </div>
    </nav>
  }
  // @@@@
  // @@@@
  // Styles
  // @@@@
  // @@@@
  baseStyles(np,ns) {
    const headerHt = 75
    const tabHt = 25
    const activeTab = ns.obj.get("activeTab") || 0 // Default to 0 if null

    if (typeof this.hColor==="undefined" || np.headerBgColor!=this.props.headerBgColor) {
      this.hColor = h.getBasicColor( np.headerBgColor, np.bgColor, null )
      this.hColorShade = tinycolor(this.hColor.hex).darken(this.hColor.isDark ? 15 : 10).toHexString()
    }

    let BASE = super.baseStyles(np,ns)
    let topPos = 0
    if (this.childrenLen>1) topPos = topPos+tabHt
    if (np.header) topPos = topPos+headerHt

    Object.assign( BASE.area, { paddingTop: topPos, overflowX: "hidden", overflowY: "hidden" })
    BASE.areaInner = {
      position: "absolute",
      top: topPos, bottom: 0, left: 0, right: "auto",
      width: `${100*this.childrenLen}%`, margin: `0 0 0 ${activeTab*-100}%`,
      overflowX: "hidden", overflowY: "auto",
      transition: "all ease .15s"
    }
    BASE.header = {
      height: headerHt,
      backgroundColor: this.hColor.hex,
      position: "absolute", top: 0, left: 0, right: 0, zIndex: 2,
      display: "block"
    }
    BASE.pane = {
      width: `${100/this.childrenLen}%`, float: "left"
    }
    BASE.tabArea = {
      position: "absolute", left: 0, right: 0, top: headerHt, zIndex: 3,
      background: this.hColorShade,
      textAlign: "center",
      borderTop: `solid 1px rgba(0,0,0,.15)`
    }
    BASE.tab = {
      width: `${100/this.childrenLen}%`, height: tabHt, float: "left",
      position: "relative", padding: 0, cursor: "pointer",
      transition: "all ease .15s",
      borderRight: `solid 1px rgba(0,0,0,.15)`,
      ":beforeActive": { borderRight: "solid 1px transparent" },
      ":hover": { background: "rgba(0,0,0,.15)", borderRight: "solid 1px transparent" },
      ":active": { background: "rgba(0,0,0,.25)", borderRight: "solid 1px transparent" },
      ":lastChild": { borderRight: "none" },
    }
    BASE.badge = Object.assign(RC.cssMixins.font("bold"), {
      position: "absolute", top: 2, right: 2,
      borderRadius: "50%",
      fontSize: 10,
      width: 14, height: 14, padding: 1,
      backgroundColor: this.hColor.textColor, color: this.hColor.hex,
    })

    return BASE
  }
}

RC.LeftNavTabs.displayName = "RC.LeftNavTabs"
RC.LeftNavTabs.propTypes = Object.assign({}, RC.LeftNavTabs.propTypes, {
  headerBgColor: React.PropTypes.string,
  initialTab: React.PropTypes.number
})
