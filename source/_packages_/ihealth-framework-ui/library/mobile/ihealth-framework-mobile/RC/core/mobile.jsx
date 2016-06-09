
"use strict";

RC.MobileContentArea = class extends RC.CSS {

  render() {
    const styles = this.css.get("styles")
    return <div {... this.props} style={styles.area}>
      { this.renderChildren() }
    </div>
  }

  // @@@@
  // @@@@
  // Styles
  // @@@@
  // @@@@
  baseStyles(np,ns) {
    return {
      area: {
        backgroundColor: this.color.get("hex"),
        overflowY: "auto", overflowX: "hidden",
        paddingBottom: np.createGlobalNavSpace ? 50 : 0,
        position: "absolute", left: 0, right: 0, bottom: 0,
        top: np.noHeader ? 0 : RC.Theme.size.headerNavHeight(),
      }
    }
  }
}

RC.MobileContentArea.displayName = "RC.MobileContentArea"
RC.MobileContentArea.propTypes = {

  noHeader: React.PropTypes.bool,
  createGlobalNavSpace: React.PropTypes.bool,

  color: React.PropTypes.string,
  bgColor: React.PropTypes.string,

  theme: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.array,
  ]),

  id: React.PropTypes.string,
  style: React.PropTypes.object,
}