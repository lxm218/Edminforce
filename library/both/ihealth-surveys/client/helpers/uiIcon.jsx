IH.Survey.uiIcon = React.createClass({
  mixins: [RC.Mixins.PureRender,RC.Mixins.CSS],
  displayName: "uiIcon",

  propTypes: {
    uiClass: React.PropTypes.string,
    uiSize: React.PropTypes.number,
    uiBgColor: React.PropTypes.string,
    uiColor: React.PropTypes.string,
  },
  render() {
    if (!this.props.uiClass) {
      console.warn("You cannot use <RC.uiIcon /> without passing a uiClass prop.")
      return null
    }

    let styles = this.css.styles;
    _.extend(styles.item, this.props.iconStyle);

    let classList = [
      "fa",
      "fa-"+this.props.uiClass.trim(),
      (this.props.className || "")
    ]

    let ui = <i {... _.omit(this.props,RC.uiKeys)} className={classList.join(" ")} style={styles.item}>{this.props.children}</i>
    return this.props.uiBgColor ? <span style={styles.area}>{ui}</span> : ui
  },
  // @@@@
  // @@@@
  // Styles
  // @@@@
  // @@@@
  useUiKeys: true,
  baseStyles(np,ns) {
    let size = np.uiSize || 16
    let itemStyle = np.uiBgColor ? RC.cssMixins.absCenter(size) :
    {
      position: "absolute", top: 15, bottom: "auto",
      left: np.theme=="right" ? "auto" : 0,
      right: np.theme=="right" ? 0 : "auto",
      width: size*2, height: size, margin: "-3px 0 0"
    }

    // @@@@
    // Start Styles
    return {
      area: Object.assign({}, RC.cssMixins.avatar, {
        position: "absolute", top: 13, left: 15,
        backgroundColor: this.color.hex,
      }),
      item: Object.assign({}, itemStyle,{
        fontSize: size, lineHeight: 1, color: this.color.textColor, textAlign: "center",
        transformOrigin: "50%",
      })
    }
  },
  themeStyles(np,ns) {
    let size = np.uiSize || 16
    let styles = this.css
      ? this.css.styles :
      { area: { height: size, left: "auto" }}
    let inlineBlock = {
      width: size+3, height: size,
      position: "static", left: "auto", right: "auto", top: "auto",
      display: "inline-block"
    }

    return {
      "inline-block": {
        item: inlineBlock
      },
      "inline-block-left": {
        item: Object.assign({}, inlineBlock, {
          margin: "0 7px 0 0",
        })
      },
      "inline-block-right": {
        item: Object.assign({}, inlineBlock, {
          margin: "0 0 0 7px",
        })
      },
      absCenter: {
        area: {
          top: "50%", left: "50%", margin: (styles.area.height/-2)+"px 0 0 "+(styles.area.height/-2)+"px"
        },
        item: {
          top: "50%", left: "50%",
          width: size, height: size, margin: (size/-2)+"px 0 0 "+(size/-2)+"px"
        }
      },
      right: {
        area: {
          left: "auto", right: 15,
        },
        item: np.uiBgColor ? {} : {
          top: "50%", margin: -size/2+"px 0 0"
        }
      },
    }
  }
})
