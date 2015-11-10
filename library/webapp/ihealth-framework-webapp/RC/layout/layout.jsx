
RC.Layout = React.createClass({
  mixins: [RC.Mixins.PureRender,RC.Mixins.CSS],
  displayName: "Layout",

  propTypes: {
    color: React.PropTypes.string,
    bgColor: React.PropTypes.string,

    theme: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.array,
    ]),
  },

  render() {
    let styles = this.css.styles
    return <div style={styles.area}>
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
        position: "relative", minHeight: "100vh",
        backgroundColor: this.color.hex, color: this.color.textColor,
        paddingTop: 0, paddingBottom: 0, paddingLeft: 0, paddingRight: 0,
      }
    }
  },
  themeStyles(np,ns) {
    return {
      leftNav: {
        area: {
          paddingLeft: RC.Theme.size.leftNavWidth
        }
      },
      topNav: {
        area: {
          paddingTop: RC.Theme.size.topNavHeight
        }
      }
    }
  },
})
