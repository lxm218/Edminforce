"use strict"

RC.TopNav = class extends RC.CSS {
  constructor(props) {
    super(props)
    this.watchProps = ["leftNav","fontWeight"]

    this.state = {
      obj: Immutable.Map({
        isHover: null,
        subOrder: null,
        submenu: null,
        pos: null
      })
    }
  }
  _hoverStart(n, submenu) {
    const pos = submenu ? h.getDomPos( ReactDOM.findDOMNode( this.refs[`nav${n}`], {reverse: true} )) : null
    this.setStateObj({
      isHover: n,
      subOrder: submenu ? n : null,
      submenu: submenu,
      pos: pos
    })
  }
  _hoverEnd(n) {
    this.setStateObj({ isHover: null })
  }
  _endDropDown() {
    this.setStateObj({
      isHover: null,
      subOrder: null,
      submenu: null
    })
  }
  // @@@@
  // @@@@
  // Render
  // @@@@
  // @@@@
  renderLogo() {
    if (this.props.logo)
      return <img src={this.props.logo} style={this.css.get("styles").logo} />
    return null
  }
  renderSubmenu() {
    const styles = this.css.get("styles")
    const state = this.state.obj

    const nav = state.get("subOrder")
    const pos = state.get("pos")
    const submenu = state.get("submenu")

    if (pos && !isNaN(nav) && nav>=0 && _.isArray(submenu)) {
      let submenuStyle = Object.assign({}, styles.submenu, {
        left: nav===0 ? "auto" : pos.left,
        right: nav===0 ? 0 : "auto"
      })
      return <div style={submenuStyle} onMouseLeave={this._endDropDown.bind(this)}>
        {
        submenu.map( (item,n) => {
          let props = _.omit(item, RC.uiKeys.concat(["text","children"]))
          props.style = styles.submenuItem
          props.color = "#FFF"
          props.colorHover = "rgba(255,255,255,.5)"
          return <RC.URL {... props} key={n}>
            {(item.text || item.children).replace(/ /g, String.fromCharCode(160))}
          </RC.URL>
        })
        }
      </div>
    }
    return null
  }
  renderChildren() {
    const state = this.state.obj
    return h.renderWithFunction( this.props.children, (item,n) => {
      let cssStates = []
      let props = {
        key: n,
        ref: `nav${n}`,
        onMouseEnter: this._hoverStart.bind(this, n, item.props.submenu || null),
        onMouseLeave: this._hoverEnd.bind(this,n)
      }

      if (!item.props.bgColor) props.bgColor = this.props.itemBgColor || null
      if (!item.props.color) props.color = this.props.itemColor || null
      if (!item.props.colorHover) props.noHover = true
      if (state.get("isHover")===n) cssStates.push(":active")

      if (item.props.uiClass && !item.props.children) {
        props.uiTheme = "absCenter"
        cssStates.push(":icon")
      }

      props.style = h.assignPseudos(this.css.get("styles").item, null, null, cssStates)
      return React.cloneElement(item,props)
    })
  }
  render() {
    const styles = this.css.get("styles")
    return <div>
      <nav style={styles.area}>
        {this.renderLogo()}
        {this.renderChildren()}
      </nav>
      {this.renderSubmenu()}
    </div>
  }
  // @@@@
  // @@@@
  // Styles
  // @@@@
  // @@@@
  baseStyles(np,ns) {
    const PAD = 15
    const absOrFixed = np.absolute ? "absolute" : "fixed"

    return {
      area: {
        position: absOrFixed, top: 0, right: 0, zIndex: 1000,
        left: np.leftNav ? RC.Theme.size.leftNavWidth : 0,
        backgroundColor: this.color.get("hex"), color: this.color.get("textColor"),
        height: RC.Theme.size.topNavHeight,
        padding: 0
      },
      logo: {
        height: RC.Theme.size.topNavHeight-PAD*2,
        margin: PAD,
        position: "absolute", top: 0, left: 0
      },
      // Items
      item: Object.assign({}, RC.cssMixins.font(np.fontWeight || "regular"),{
        height: RC.Theme.size.topNavHeight, minWidth: RC.Theme.size.topNavHeight,
        position: "relative", display: "inline-block", padding: `0 ${PAD}px`, margin: "0 0 0 1px",
        transition: "all ease .15s",
        float: "right", opacity: 1,
        display: "flex", alignItems: "center", justifyContent: "flex-end",
        ":active": {
          opacity: .85
        }
      }),
      // Submenu
      submenu: {
        position: absOrFixed, top: RC.Theme.size.topNavHeight, bottom: "auto", zIndex: 1001,
        backgroundColor: "rgba(0,0,0,.75)", color: "#FFF",
        padding: "7px 12px",
      },
      submenuItem: {
        display: "block", padding: "2px 0 3px"
      }
    }
  }
  themeStyles(np,ns) {
    return {
      lineCircle: {
        item: {
          ":icon": {
            borderRadius: "50%",
            margin: "5px 5px 5px 0",
            height: RC.Theme.size.topNavHeight-10, minWidth: RC.Theme.size.topNavHeight-10,
          }
        }
      }
    }
  }
}
RC.TopNav.displayName = "RC.TopNav"
RC.TopNav.propTypes = Object.assign({}, RC.TopNav.propTypes, {
  logo: React.PropTypes.string,
  fontWeight: React.PropTypes.string,
  leftNav: React.PropTypes.bool,
  absolute: React.PropTypes.bool
})
