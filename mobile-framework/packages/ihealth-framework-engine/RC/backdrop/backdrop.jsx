
RC.BackDropArea = React.createClass({
  mixins: [RC.Mixins.PureRender,RC.Mixins.CSS],
  displayName: "BackDropArea",

  propTypes: {
    color: React.PropTypes.string,
    bgColor: React.PropTypes.string,

    theme: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.array,
    ]),
  },
  stopPropagation(e) {
    e.stopPropagation()
  },
  render() {
    var styles = this.css.styles

    return <RC.Animate transitionName={this.props.transitionName || "fade"}>
      {
      !!this.props.children
      ?
      <div {... this.props} style={styles.canvas} key="backdrop-animation">
        <div onClick={this.stopPropagation} style={styles.canvasInner}>
          {this.props.children}
        </div>
      </div>
      :
      null
      }
    </RC.Animate>
  },
  // @@@@
  // @@@@
  // Styles
  // @@@@
  // @@@@
  defBgColor: "backdrop",
  baseStyles(np,ns) {

    // if (typeof this.backDropColor === "undefined" || np.backDropColor!=this.props.backDropColor)
    //   this.backDropColor = np.backDropColor
    //     ? h.getRealColor(np.backDropColor, "edgesDarker", null, true)
    //     : RC.Theme.color.edgesDarker

    return {
      canvas: h.assignClone( RC.cssMixins.fixedFull, {
        display: "flex", alignItems: "center",
        padding: "4%",
        backgroundColor: this.color.hex, color: this.color.textColor,
        overflow: "hidden", zIndex: 5000,
      }),
      canvasInner: {
        minWidth: 350, maxWidth: 700, margin: "0 auto", padding: "4%"
      }
    }
  },
})
