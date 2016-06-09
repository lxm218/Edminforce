"use strict"

RC.LeftNav = class extends RC.CSS {
  constructor(p) {
    super(p)
    this.watchProps = ["topNav"]
  }
  renderChildren() {
    return h.renderWithFunction( this.props.children, (group,n) => {
      const props = {
        key: n,
        theme: h.nk(group, "props.theme") || this.props.theme || undefined,
        bgColor: h.nk(group, "props.bgColor") || this.props.bgColor || this.color.get("hex"),
        color: h.nk(group, "props.color") || this.props.color || this.color.get("textColor")
      }
      return React.cloneElement(group, props)
    })
  }
  render() {
    return <nav style={this.css.get("styles").area}>
      {this.renderChildren()}
    </nav>
  }
  // @@@@
  // @@@@
  // Styles
  // @@@@
  // @@@@
  baseStyles(np,ns) {
    return {
      area: Object.assign({}, RC.cssMixins.fontAlt("light"), {
        position: "fixed", bottom: 0, left: 0,
        top: np.topNav ? RC.Theme.size.topNavHeight : 0,
        overflowX: "hidden", overflowY: "auto",
        backgroundColor: this.color.get("hex"), color: this.color.get("textColor"),
        width: RC.Theme.size.leftNavWidth, paddingBottom: 50
      })
    }
  }
}

RC.LeftNav.displayName = "RC.LeftNav"
RC.LeftNav.propTypes = Object.assign({}, RC.LeftNav.propTypes, {
  topNav: React.PropTypes.bool
})
