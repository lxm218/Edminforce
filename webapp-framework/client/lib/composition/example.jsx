
App.Example = function(Component) {
  const Composition = React.createClass({
    mixins: [RC.Mixins.PureRender,RC.Mixins.CSS],

    openCode() {
      Session.set("code", this.props.example)
    },
    // @@@@
    // @@@@
    // Render
    // @@@@
    // @@@@
    renderTitle() {
      if (this.props.title)
        return <span style={this.css.styles.title}>{this.props.title}</span>
    },
    renderLink() {
      let styles = this.css.styles
      if (typeof this.props.snippet==="undefined")
        return <RC.URL tagName="div" style={styles.link} onClick={this.openCode}>See Code</RC.URL>
    },
    render() {
      return this.props.code
        ? <Component {... this.props}>
          {this.props.children}
        </Component>
        : <div style={this.css.styles.area}>
          {this.renderTitle()}
          {this.renderLink()}
          <Component {... this.props}>
            {this.props.children}
          </Component>
        </div>
    },
    watchProps: ["maxWidth","snippet"],
    baseStyles(np,ns) {
      return {
        area: {
          position: "relative",
          borderTop: `solid 10px rgba(0,0,0,.12)`, borderBottom: `solid 10px rgba(0,0,0,.12)`,
          background: this.color.hex,
          color: _.isUndefined(np.snippet) ? RC.Theme.color.text : "#57686d",
          maxWidth: np.maxWidth || "100%", padding: 15, margin: "40px 0 15px"
        },
        title: Object.assign({},RC.cssMixins.font("regular"),{
          position: "absolute", top: -28, left: 1,
          fontSize: 13, color: "rgba(0,0,0,.35)",
        }),
        link: Object.assign({},RC.cssMixins.font("heavy"),{
          position: "absolute", top: -27, right: 0,
          display: "inline-block", padding: "7px 6px 6px",
          textTransform: "uppercase",
          fontSize: 14, lineHeight: "14px", color: "white",
          backgroundColor: np.platform=="mobile" ? RC.Theme.color.brand2 : RC.Theme.color.brand1
        }),
      }
    },
    themeStyles(np,ns) {
      return {
        full: {
          area: {
            padding: 0,
            border: "none",
            boxShadow: "0 0 10px rgba(0,0,0,.12)"
          },
          title: {
            top: -18
          },
          link: {
            top: -17, zIndex: 100,
          },
        }
      }
    }
  })
  return Composition
}
