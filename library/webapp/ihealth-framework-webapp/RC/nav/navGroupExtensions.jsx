"use strict"

const diameter = 34
const wrappedItemStyle = {
  textIndent: 0,
  minHeight: diameter+4, paddingLeft: 50
}
const submenuStyle = {
  minHeight: diameter+4
}
const submenuItemStyle = {
  marginLeft: 25, paddingLeft: 24
}

RC.NavGroupIcons = class extends RC.NavGroup {
  renderSingle(single,n,maxLen) {
    const styles = this.css.get("styles")
    let props = { key: n, noHover: true }
    if (h.nk(single, "type.displayName")==="RC.URL" || typeof single.type==="string") {
      this.isWrapped[n] = !!h.nk(single, "props.uiBgColor")
      const hasUI = h.nk(single, "props.uiClass")
      if (hasUI) {
        Object.assign( props, {
          uiTheme: single.props.theme || (this.isWrapped[n] ? "absCenter" : null),
          uiColor: single.props.uiColor || (this.isWrapped[n] ? null : (this.props.color || this.color.get("textColor"))),
          uiStyle: this.isWrapped[n] ? styles.uiWrapped : null,
          uiItemStyle: this.isWrapped[n] ? null : styles.uiNotWrapped
        })
      }
      props.style = h.assignPseudos( styles.item, n, maxLen, this.isWrapped[n] ? ":wrapped" : null )
    }

    if (_.isArray(single.props.submenu))
      props.onClick= this._toggleSubmenu.bind(this, n)
    return React.cloneElement(single, props, h.nk(single, "props.children"))
  }
  // @@@@
  // @@@@
  // Styles
  // @@@@
  // @@@@
  themeStyles(np,ns) {
    let THEMES = super.themeStyles(np,ns)

    THEMES.big.item[":wrapped"] = wrappedItemStyle
    THEMES.big.uiWrapped = {
      left: 9, margin: `${diameter/-2}px 0 0`,
      width: diameter, height: diameter
    }
    THEMES.big.uiNotWrapped = {
      margin: "0 2px 0 -6px",
      width: diameter
    }
    Object.assign( THEMES.big.submenu, submenuStyle )
    THEMES.big.submenuItem[":wrapped"] = submenuItemStyle

    return THEMES
  }
}

RC.NavGroupIcons.displayName = "RC.NavGroupIcons"


RC.NavGroupAvatars = class extends RC.NavGroup {
  renderSingle(single,n,maxLen) {
    const styles = this.css.get("styles")
    let props = { key: n, noHover: true }

    if (_.isArray(single.props.submenu))
      props.onClick= this._toggleSubmenu.bind(this, n)

    if (h.nk(single, "type.displayName")==="RC.URL" || typeof single.type==="string") {
      Object.assign(props, _.omit(single.props, RC.uiKeys.concat("avatar")))

      this.isWrapped[n] = h.nk(single, "props.uiClass") || h.nk(single, "props.avatar")
      props.style = h.assignPseudos( styles.item, n, maxLen, this.isWrapped[n] ? ":wrapped" : null )

      let avatar = _.pick(single.props, _.without(RC.uiKeys, ["uiBgColor","src","avatar"]))
      Object.assign( avatar, {
        key: 0,
        src: single.props.avatar,
        theme: "absLeft",
        diameter: diameter,
        style: this.isWrapped[n] ? styles.uiWrapped : null,
        bgColor: single.props.uiBgColor || this.props.bgColor || this.color.get("hex"),
        color: single.props.uiColor || this.props.color || this.color.get("textColor")
      })

      let Class = RC.Avatar
      if (typeof single.props.badge!=="undefined" && !isNaN(single.props.badge)) {
        Class = RC.AvatarBadge
        avatar.badge = single.props.badge
        avatar.badgeBgColor = single.props.badgeBgColor || this.props.badgeBgColor
        avatar.badgeColor = single.props.badgeColor || this.props.badgeColor
        avatar.badgeOnLeft = true
      } else if (typeof single.props.outlineColor!=="undefined") {
        Class = RC.AvatarOutline
        avatar.outlineColor = single.props.outlineColor
      }

      const children = [
        React.createElement(Class, avatar),
        <span key={1}>{single.props.children}</span>
      ]
      return React.createElement(single.type, props, children)
    }
    return React.cloneElement(single, props)
  }
  // @@@@
  // @@@@
  // Styles
  // @@@@
  // @@@@
  themeStyles(np,ns) {
    let THEMES = super.themeStyles(np,ns)
    THEMES.big.item[":wrapped"] = wrappedItemStyle
    THEMES.big.uiWrapped = { left: 9 }
    Object.assign( THEMES.big.submenu, submenuStyle )
    THEMES.big.submenuItem[":wrapped"] = submenuItemStyle
    return THEMES
  }
}

RC.NavGroupAvatars.displayName = "RC.NavGroupAvatars"
