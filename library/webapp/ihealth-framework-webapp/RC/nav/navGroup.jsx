"use strict"

const lineHeightOffset = 5
const ITEM = {
  display: "block",
  paddingTop: 5, paddingBottom: 5, paddingLeft: 12, paddingRight: 12
}

// @@@@
// @@@@
// TODO !!!!
// Convert each submenu item into its own extended class so that the event handlers are not shared.
// @@@@
// @@@@

RC.NavGroup = class extends RC.CSS {
  constructor(p) {
    super(p)
    this.isWrapped = {}

    const children = _.isArray(this.props.children) ? this.props.children : [this.props.children]

    this.state = {
      obj: Immutable.fromJS({
        expanded: Immutable.Map( _.object( children.map( (c,n) => {
          return [n,false]
        })) )
      })
    }
  }
  _toggleSubmenu(n) {
    // console.log(n, this.state.obj.toJS())
    this.setState({
      obj: this.state.obj.updateIn(["expanded",n], val => !val)
    })
    // console.log("@@@", this.state.obj.toJS())
  }
  // @@@@
  // @@@@
  // Render
  // @@@@
  // @@@@
  renderTitle() {
    if (!this.props.title)
      return null
    return <strong style={this.css.get("styles").title}>{this.props.title}</strong>
  }
  renderSubmenu(submenu,passedStates) {
    const styles = this.css.get("styles")
    return submenu.map( (item,n) => {
      let props = _.omit(item, ["text","children","uiBgColor"])
      props.style = h.assignPseudos( styles.submenuItem, n, submenu.length, this.isWrapped[n] ? ":wrapped" : null )
      if (!props.uiColor) props.uiColor = this.color.get("textColor")
      if (!props.noHover) props.noHover = true
      props.uiItemStyle = {
        width: 20,
        margin: this.isWrapped[n] ? "0 3px 0 -5px" : "0 2px 0 0"
      }

      return <RC.URL {... props} key={n}>
        <span style={styles.submenuItemLine} />
        {item.text || item.children}
      </RC.URL>
    })
  }
  renderSingle(single,n,maxLen) {
    const styles = this.css.get("styles")
    let props = { key: n }
    if (h.nk(single, "type.displayName")==="RC.URL") {
      props.style = h.assignPseudos( styles.item, n, maxLen )
      Object.assign(props, _.omit(single.props, RC.uiKeys.concat("submenu")))
    }
    if (_.isArray(single.props.submenu))
      props.onClick= this._toggleSubmenu.bind(this, n)
    return React.createElement(single.type, props)
  }
  renderChildren() {
    const styles = this.css.get("styles")
    const state = this.state.obj
    const maxLen = this.props.children.length
    return h.renderWithFunction( this.props.children, (single,n) => {
      if (!React.isValidElement(single)) return single

      const navItem = this.renderSingle(single,n,maxLen)
      if (!_.isArray(single.props.submenu) || !single.props.submenu.length)
        return navItem
      const styleState = state.getIn(["expanded",n]) ? ":expanded" : null
      return <div style={h.assignPseudos( styles.submenu, null, null, styleState )} key={n}>
        <span style={h.assignPseudos( styles.submenuArrow, null, null, styleState)} />
        {navItem}
        {this.renderSubmenu(single.props.submenu)}
      </div>
    })
  }
  render() {
    return <div {... this.props} className="unselect" style={this.css.get("styles").area}>
      {this.renderTitle()}
      {this.renderChildren()}
    </div>
  }
  // @@@@
  // @@@@
  // Styles
  // @@@@
  // @@@@
  baseStyles(np,ns) {
    const fontSize = RC.Theme.font.size
    const BASE = {
      color: this.color.get("textColor"),
      fontSize: fontSize
    }
    return {
      // Main Menu
      area: {},
      title: Object.assign({},BASE,ITEM, {
        opacity: .3,
        margin: "30px 0 8px",
        borderBottom: `solid 1px ${this.color.get("textColor")}`
      }),
      item: Object.assign({},BASE,ITEM, {
        margin: 0, lineHeight: `${fontSize+lineHeightOffset}px`
      }),
      // Submenu
      submenu: {
        overflow: "hidden", position: "relative",
        transition: "ease all .4s",
        maxHeight: `${fontSize+lineHeightOffset+ITEM.paddingTop+ITEM.paddingBottom}px`,
        ":expanded": {
          maxHeight: "750px"
        }
      },
      submenuItem: Object.assign({},BASE, {
        display: "block", position: "relative", paddingTop: 2, paddingBottom: 2, paddingLeft: 15, paddingRight: 15,
        marginTop: 0, marginLeft: ITEM.paddingLeft+2, marginBottom: 0, marginRight: ITEM.paddingRight+2,
        borderLeft: `solid 1px ${this.color.get("textColor")}`,
        ":firstChild": {
          marginTop: 5, paddingTop: 1
        },
        ":lastChild": {
          marginBottom: 15
        }
      }),
      submenuItemLine: {
        position: "absolute", top: "50%", left: 0,
        width: 5, height: 1,
        background: this.color.get("textColor")
      },
      submenuArrow: {
      	width: 0, height: 0,
	      borderTop: "7px solid transparent", borderBottom: "7px solid transparent",
      	borderRight: `7px solid ${this.color.get("isDark") ? "rgba(255,255,255,.2)" : "rgba(0,0,0,.2)"}`,
        position: "absolute", top: 7, right: 7,
        transition: "ease all .15s",
        ":expanded": {
          transform: "rotate(-90deg)",
        }
      }
    }
  }
  themeStyles(np,ns) {
    const fontSize = RC.Theme.font.size
    const bigItemPad = 7
    return {
      big: {
        // Main Menu
        title: Object.assign({}, RC.cssMixins.fontAlt("regular"), {
          opacity: .55, // Make sure this matches the leftNav tab color too
          background: this.color.get("isDark") ? "rgba(255,255,255,.1)" : "rgba(0,0,0,.1)", // Make sure this matches the leftNav tab color too
          fontSize: fontSize-4, textTransform: "uppercase", letterSpacing: 3, textIndent: -3,
          color: this.color.get("textColor"), borderBottom: "none",
          paddingTop: 5, paddingLeft: "7.5%", paddingBottom: 5, paddingRight: "7.5%",
          margin: "10px 0 15px"
        }),
        item: Object.assign({},RC.cssMixins.fontAlt("light"), RC.cssMixins.ellipsis,{
          fontSize: fontSize+2,
          paddingTop: bigItemPad, paddingLeft: "10%", paddingBottom: bigItemPad, paddingRight: "10%",
          position: "relative"
        }),
        // Submenu
        submenu: {
          maxHeight: `${fontSize+2+lineHeightOffset+bigItemPad+bigItemPad}px`,
        },
        submenuItem: {
          marginLeft: "11%", marginRight: "11%"
        },
        submenuArrow: {
          top: 10, margin: "0 10% 0 0",
        }
      }
    }
  }
}

RC.NavGroup.displayName = "RC.NavGroup"
RC.NavGroup.propTypes = Object.assign({}, RC.NavGroup.propTypes, {
  title: React.PropTypes.string,
  submenu: React.PropTypes.array
})
