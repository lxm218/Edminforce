
// @@@@@
// Timeline Canvas
// @@@@@

RC.Timeline = React.createClass({
  mixins: [RC.Mixins.PureRender,RC.Mixins.CSS],
  displayName: "Timeline",

  propTypes: {
    id: React.PropTypes.string,
    className: React.PropTypes.string,

    theme: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.array,
    ]),

    lineColor: React.PropTypes.string,
  },

  render() {
    let defaultFormat = this.props.dateFormat || "MMM Do, YYYY"
    let count = 0
    let styles = this.css.styles

    return <ul {... this.props} style={styles.canvas}>
      {this.props.children}
    </ul>
  },
  // @@@@
  // Styles
  // @@@@
  watchProps: ["lineColor"],
  baseStyles(np,ns) {

    if (typeof this.lineColor === "undefined" || this.props.lineColor!=np.lineColor)
      this.lineColor = this.props.lineColor
        ? h.getRealColor(this.props.lineColor, "edgesLighter", null, true)
        : RC.Theme.color.edgesLighter

    return {
      canvas: {
        position: "relative", listStyleType: "none",
        backgroundColor: this.color.hex, textColor: this.color.textColor,
        borderLeft: "solid 1px "+this.lineColor,
        paddingTop: 20, paddingBottom: 20, paddingLeft: 25, paddingRight: 0,
        marginTop: 0, marginBottom: 0, marginLeft: 15, marginRight: 0,
      },
    }
  },
})

// @@@@@
// Journal Item
// @@@@@

RC.Journal = React.createClass({
  mixins: [RC.Mixins.PureRender,RC.Mixins.CSS],
  displayName: "Journal",

  propTypes: {
    id: React.PropTypes.string,
    className: React.PropTypes.string,

    theme: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.array,
    ]),

    title: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.object,
    ]),

    dateFormat: React.PropTypes.string,
  },
  renderChildren() {

    let self = this
    let styles = this.css.styles

    // Format Setups
    let dateFormat = this.props.dateFormat || "MMM Do, YYYY"

    // Declarations
    var content
    var title = (_.isDate(this.props.title) ? h.getDateFromProps(this.props.title, dateFormat) : this.props.title) || null
    if (title) title = <strong style={styles.title}>{title}</strong>

    if (_.contains(this.css.themeNames, "heading") && this.props.uiClass) {
      var uiObject = _.pick(this.props, RC.uiKeys)
      uiObject.uiBgColor = this.props.uiBgColor || "dark"
      uiObject.uiSize = this.props.uiSize || 11
      uiObject.style = { top: 8, left: -36, width: 26, height: 26 }

      var ui = <RC.uiIcon {... uiObject} />
      content = title ? <span>{ui}{title}</span> : ui
    } else
      content = title

    return <div style={styles.canvasInner}>
      {content}
      {h.checkIfString(this.props.children) ? <p>{this.props.children}</p> : this.props.children}
    </div>
  },
  render() {
    let styles = this.css.styles
    return <li {... this.props} style={styles.canvas}>
      <span style={styles.arrow} />
      {this.renderChildren()}
    </li>
  },
  // @@@@
  // Styles
  // @@@@
  watchProps: ["arrowColor"],
  baseStyles(np,ns) {

    if (typeof this.arrowColor === "undefined" || this.props.arrowColor!=np.arrowColor)
      this.arrowColor = this.props.arrowColor
        ? h.getRealColor(this.props.arrowColor, "edges", null, true)
        : RC.Theme.color.edges

    return {
      canvas: {
        position: "relative",
        padding: "10px 23px 10px 0",
      },
      canvasInner: {
        fontSize: RC.Theme.font.size-1
      },
      title: {
        display: "block",
        color: RC.Theme.color.gray,
        padding: 0, marginBottom: "-10px"
      },
      arrow: {
      	width: 0, height: 0,
      	borderTop: "7px solid transparent", borderBottom: "7px solid transparent",
      	borderLeft: "7px solid "+this.arrowColor,
        position: "absolute", top: 12, left: -26,
      },
    }
  },
  themeStyles() {
    return {
      heading: {
        canvas: {
          padding: "10px 23px 0 0",
          marginTop: 10,
        },
        canvasInner: {
          fontSize: RC.Theme.font.size+1
        },
        title: {
          color: RC.Theme.color.brand1
        },
        arrow: {
          top: 15,
        }
      }
    }
  },
})
