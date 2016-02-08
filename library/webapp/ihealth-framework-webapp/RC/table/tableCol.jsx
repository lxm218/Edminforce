"use strict"

const ellipsis = Object.assign({}, RC.cssMixins.ellipsis, {
  maxWidth: 150
})

RC.TH = class extends RC.CSS {
  constructor(p) {
    super(p)
    // this.watchProps = ["align","sort","ellipsis"]
    this.watchProps = ["align","sort"]
    this.defBgColor = "dark"
  }
  renderArrow() {
    if (!this.props.sort) return null
    let cssStates = []

    if (_.contains(["desc","asc"], this.props.sort)) {
      cssStates.push(":active")
      if (this.props.sort=="asc")
        cssStates.push(":asc")
    }
    return <span style={h.assignPseudos( this.css.get("styles").arrow, null, null, cssStates )} />
  }
  render() {
    return <th {... this.props} className="unselect" style={this.css.get("styles").th}>
      {this.renderChildren()}
      {this.renderArrow()}
    </th>
  }
  baseStyles(np,ns) {
    const PAD = RC.Theme.size.paddingPx
    let thStyle = Object.assign(RC.cssMixins.fontAlt("regular"), {
      position: "relative",
      backgroundColor: this.color.get("realHex"), color: this.color.get("textColor"),
      padding: `5px ${PAD+(np.sort ? 7 : 0)}px 6px ${PAD}px`, margin: 0,
      fontSize: RC.Theme.font.size-1, textAlign: np.align || "left"
    })
    // if (np.ellipsis)
    //   Object.assign( thStyle, ellipsis )

    return {
      th: thStyle,
      arrow: {
      	width: 0, height: 0, margin: "-2px 0 0 5px",
        transition: "all ease .3s", opacity: .25,
        // display: "inline-block", verticalAlign: "middle",
        position: "absolute", top: "50%",
      	borderTop: `4px solid ${this.color.get("textColor")}`, borderLeft: "4px solid transparent", borderRight: "4px solid transparent",
        ":active": {
          opacity: 1
        },
        ":asc": {
          transform: "rotate(180deg)"
        }
      }
    }
  }
}
RC.TH.displayName = "RC.TH"


RC.TD = class extends RC.CSS {
  constructor(p) {
    super(p)
    this.watchProps = ["align","ellipsis"]
  }
  render() {
    return <td {... this.props} style={this.css.get("styles").td}>
      {this.renderChildren()}
    </td>
  }
  baseStyles(np,ns) {
    const PAD = RC.Theme.size.paddingPx
    let tdStyle = {
      backgroundColor: this.color.get("realHex"),
      fontSize: RC.Theme.font.size-2, lineHeight: 1.25, verticalAlign: "top",
      padding: `10px ${PAD}px`, margin: 0,
      textAlign: np.align || "left"
    }

    if (np.ellipsis)
      Object.assign( tdStyle, ellipsis )

    return {
      td: tdStyle
    }
  }
}
RC.TD.displayName = "RC.TD"
