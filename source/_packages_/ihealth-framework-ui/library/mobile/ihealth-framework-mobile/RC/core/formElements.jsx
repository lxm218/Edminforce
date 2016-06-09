"use strict"

// Mobile Checkbox
RC.Checkbox = class extends RC.CheckboxBase {

  constructor(props) {
    super(props)

    this.watchProps = ["uiBgColorActive","borderColor"]
    this.watchStates = ["checked"]
  }

  renderCheckbox() {
    let styles = this.css.get("styles")
    let isChecked = this.getValue() // this.state.checked
    let uiProps = {
      style: styles.form,
      uiClass: this.props.uiClass || "check",
      uiBgColor: isChecked ? (this.props.uiBgColor || "brand1") : "transparent",
      uiColor: isChecked ? (this.props.uiColor || "white") : "transparent",
    }

    return <RC.uiIcon {... uiProps}>{this.renderInput()}</RC.uiIcon>
  }

  renderLabel(){
    return this.props.label
  }

  // @@@@
  // @@@@
  // Styles
  // @@@@
  // @@@@
  baseStyles(np,ns) {
    return {
      area: Object.assign({}, RC.cssMixins.item(), {
        transition: "all .2s ease",
        paddingLeft: 48,
        textAlign: "left",
        backgroundColor: this.color.get("realHex"), color: this.color.get("textColor"),
        borderColor: RC.Theme.color.edges,
      }),
      form: {
        width: 28, height: 28,
        top: 10, left: 10,
        border: `solid 1px ${np.borderColor ? RC.Theme.color.edges : RC.Theme.color.edges}`
      }
    }
  }

  themeStyles(np,ns) {
    let THEMES = super.themeStyles(np,ns)
    THEMES.overlay = {
      area: Object.assign({}, RC.cssMixins.font("light"), {
        // borderStyle: "none", borderWidth: 0,
        borderTopWidth: 0, borderRightWidth: 0, borderLeftWidth: 0,
        fontSize: RC.Theme.font.size+8
      }),
      form: { top: 17 }
    }
    return THEMES
  }
}
RC.Checkbox.displayName = "RC.Checkbox"

// RC.CheckboxSquare = class extends RC.Checkbox {
//   baseStyles(np, ns) {
//     let base = super.baseStyles(np, ns)
//     base.checkbox.borderRadius = '0'
//     return base
//   }
// }

/*
 *  Toggle Checkbox
 */

RC.ToggleCheckbox = class extends RC.Checkbox {

  renderAuto(loopedName, key) {
    const styles = this.css.get("styles")

    return <div style={styles.toggle}>
      {this.renderInput()}
      <span style={styles.ball}/>
    </div>
  }

  baseStyles(np, ns) {
    const SIZE = 26
    const nsChecked = ns.obj.get("checked")
    let base = super.baseStyles(np, ns)

    if (typeof this.uiBgColor==="undefined" || np.uiBgColor!=this.props.uiBgColor)
      this.uiBgColor = np.uiBgColor
        ? h.getRealColor(np.uiBgColor, "light", null, true)
        : RC.Theme.color.light

    if (typeof this.uiBgColorActive==="undefined" || np.uiBgColorActive!=this.props.uiBgColorActive)
      this.uiBgColorActive = np.uiBgColorActive
        ? h.getRealColor(np.uiBgColorActive, "brand1", null, true)
        : RC.Theme.color.brand1

    Object.assign(base.area, {
      paddingLeft: 74
    })

    base.toggle ={
      transition: "background .2s ease",
      width: 54, height: SIZE+6,
      borderRadius: (SIZE+6)/2,
      backgroundColor: nsChecked ? this.uiBgColorActive : this.uiBgColor,
      borderStyle: "solid", borderWidth: 1 , borderColor: RC.Theme.color.edges,
      position: "absolute", top: 9, left: 10,
    }

    base.ball = {
      transition: "all .2s ease",
      backgroundColor: RC.Theme.color.white,
      position: "absolute", top: "50%", margin: `-${SIZE/2}px 0 0 0`,
      boxShadow: "0 0 4px rgba(0,0,0,.2)",
      left: nsChecked ? SIZE-2 : 2,
      width: SIZE, height: SIZE,
      borderRadius: "50%",
    }

    return base
  }
}
