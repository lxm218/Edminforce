
RC.ActionSheet = React.createClass({
  mixins: [RC.Mixins.PureRender,RC.Mixins.CSS],
  displayName: "BackDropArea",

  propTypes: {
    color: React.PropTypes.string,
    bgColor: React.PropTypes.string,

    theme: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.array,
    ]),

    isHidden: React.PropTypes.bool
  },
  getInitialState() {
    return {
      isHidden: _.isUndefined(this.props.isHidden) ? true : this.props.isHidden
    }
  },
  // @@@@
  // @@@@
  // Utility
  // @@@@
  // @@@@
  show() {
    this.setState({isHidden: false})
  },
  hide() {
    this.setState({isHidden: true})
  },
  stopPropagation(e) {
    e.stopPropagation()
    if (_.isFunction(this.props.onClick))
      this.props.onClick(e)
  },
  renderBackDrop() {
    return <RC.Animate transitionName="fade" transitionEnterTimeout={500} transitionLeaveTimeout={500}>
      {
      this.state.isHidden ? null :
      <div style={this.css.styles.backdrop} onClick={this.hide} />
      }
    </RC.Animate>
  },
  renderActionSheet() {
    let styles = this.css.styles
    let children = h.uniformChildren(this.props.children, "Button")

    let buttonColor = this.props.buttonColor
    let buttonColorHover = this.props.buttonColorHover
    let buttonBgColor = this.props.buttonBgColor
    let buttonBgColorHover = this.props.buttonBgColorHover

    return <RC.Animate transitionName="from-bottom" transitionEnterTimeout={500} transitionLeaveTimeout={500}>
      {
      this.state.isHidden ? null :
      <div {... this.props} style={styles.area} onClick={this.stopPropagation}>
        <div style={styles.areaInner}>
          {
          children.map(function(c,n){

            let props = c.props || {}
            if (!props.color) props.color = buttonColor || "text"
            if (!props.colorHover) props.colorHover = buttonColorHover || "text"
            if (!props.bgColor) props.bgColor = buttonBgColor || "white"
            if (!props.bgColorHover) props.bgColorHover = buttonBgColorHover || "fog"

            let hasBreak = c.props && c.props.break
            let hadBreak = n && children[n-1].props && children[n-1].props.break
            let computedStyle = {
              background: props.bgColor,
              margin: hasBreak ? "0 0 9px" : "0 0 -1px",
              borderRadius: (!n || hadBreak ? "2px 2px " : "0 0 ")+(n===children.length-1 || hasBreak ? "2px 2px" : "0 0")
            }

            // Return text if it was String
            if (typeof c==="string" || typeof c.type==="string") {

              computedStyle.fontSize = RC.Theme.font.size-3
              computedStyle.padding = "12px 10px 11px"

              if (props.color==="text") computedStyle.color = "rgba(0,0,0,.4)"
              if (typeof c==="string") return <div style={computedStyle} key={n}>{c}</div>
            }

            props.key = n

            props.style = typeof c.props.style==="object"
              ? h.assignClone(computedStyle, c.props.style)
              : computedStyle

            if (!props.color) props.color = buttonColor || "text"
            if (!props.colorHover) props.colorHover = buttonColorHover || "text"
            if (!props.bgColor) props.bgColor = buttonBgColor || "white"
            if (!props.bgColorHover) props.bgColorHover = buttonBgColorHover || "fog"

            return React.createElement(c.type, props, props.children)
          })
          }
        </div>
      </div>
      }
    </RC.Animate>
  },
  render() {

    // return <div {... this.props} style={styles.area} onClick={this.stopPropagation}>
    return <div>
      {this.renderBackDrop()}
      {this.renderActionSheet()}
    </div>
  },
  // @@@@
  // @@@@
  // Styles
  // @@@@
  // @@@@
  watchStates: ["isHidden"],
  baseStyles(np,ns) {

    if (typeof this.backDropColor === "undefined" || np.backDropColor!=this.props.backDropColor)
      this.backDropColor = np.backDropColor
        ? h.getRealColor(np.backDropColor, "backdrop", null, true)
        : RC.Theme.color.backdrop

    return {
      area: {
        position: "absolute", bottom: 0, left: 0, right: 0,
        padding: 15,
        backgroundColor: this.color.realHex,
        overflow: "hidden", zIndex: 5001,
      },
      areaInner: {
        minWidth: 350, maxWidth: 700, margin: "0 auto",
        textAlign: "center"
      },
      backdrop: h.assignClone( RC.cssMixins.fixedFull, {
        backgroundColor: this.backDropColor, zIndex: 5000,
      }),
    }
  },
})
