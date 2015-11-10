
RC.MobileContentArea = React.createClass({
  mixins: [RC.Mixins.PureRender,RC.Mixins.CSS],
  displayName: "MobileContentArea",

  propTypes: {

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
  },
  render() {
    var styles = this.css.styles

    return <div {... this.props} style={styles.area}>
      {this.props.children}
    </div>
  },
  // @@@@
  // @@@@
  // Styles
  // @@@@
  // @@@@
  baseStyles(np,ns) {
    return {
      area: {
        backgroundColor: this.color.hex,
        overflowY: "auto", overflowX: "hidden",
        paddingBottom: np.createGlobalNavSpace ? 50 : 0,
        position: "absolute", left: 0, right: 0, bottom: 0,
        top: np.noHeader ? 0 : RC.Theme.size.headerNavHeight,
      }
    }
  },
})
