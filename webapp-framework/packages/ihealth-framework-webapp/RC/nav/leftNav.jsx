
RC.LeftNav = React.createClass({
  mixins: [RC.Mixins.PureRender,RC.Mixins.CSS],
  displayName: "LeftNav",

  propTypes: {
    color: React.PropTypes.string,
    bgColor: React.PropTypes.string,

    theme: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.array,
    ]),

    nav: React.PropTypes.array,
    logo: React.PropTypes.string,
    logoHref: React.PropTypes.string,
    logoBgColor: React.PropTypes.string,
    createSpaceForTopNav: React.PropTypes.bool
  },
  renderLogo() {
    let styles = this.css.styles
    if (this.props.logo) {
      let logo = <img src={this.props.logo} style={styles.logo}/>
      return this.props.logoHref
        ? <a href={this.props.logoHref} style={styles.logoArea}>{logo}</a>
        : <p styles={this.css.styles.logo}>{logo}</p>
    }
    return null
  },
  renderNav() {
    if (!this.props.nav || !this.props.nav.length)
      return null

    let styles = this.css.styles
    let textColor = this.color.textColor

    return this.props.nav.map(function(c,n){
      c.key = n
      c.color = c.color || textColor
      c.colorHover = c.colorHover || textColor

      if (c.isTitle) {
        if (c.theme) {
          if (!_.isArray(c.theme)) c.theme = [c.theme]
          c.theme.push("line")
        } else
          c.theme = "line"
        return <RC.Subtitle {... c}>{c.children}</RC.Subtitle>
      }
      c.style = h.assignClone(styles.url, c.style)
      if (c.uiClass && !c.uiSize)
        c.uiSize = styles.url.fontSize

      return <RC.URL {... c}>{c.children}</RC.URL>
    })
  },
  render() {
    let styles = this.css.styles
    return <div style={styles.area}>
      {this.renderLogo()}
      {this.renderNav()}
      {this.props.children}
    </div>
  },
  // @@@@
  // @@@@
  // Styles
  // @@@@
  // @@@@
  watchProps: ["createSpaceForTopNav","logo","logoBgColor"],
  baseStyles(np,ns) {
    let PAD = 15
    if (typeof this.logoBgColor==="undefined" || np.logoBgColor!=this.props.logoBgColor)
      this.logoBgColor = h.getRealColor(np.logoBgColor, np.bgColor, "white", true)

    return {
      area: {
        position: "fixed", bottom: 0, left: 0,
        top: np.createSpaceForTopNav ? RC.Theme.size.topNavHeight : 0,
        overflowY: "auto",
        backgroundColor: this.color.hex, color: this.color.textColor,
        width: RC.Theme.size.leftNavWidth,
        paddingTop: np.logo ? RC.Theme.size.topNavHeight+PAD : PAD,
        paddingBottom: 15, paddingLeft: 15, paddingRight: 15,
      },
      logoArea: {
        height: RC.Theme.size.topNavHeight,
        backgroundColor: this.logoBgColor,
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 2,
        display: "block", padding: PAD,
      },
      logo: {
        height: RC.Theme.size.topNavHeight-PAD*2, width: "auto", margin: 0,
      },
      url: {
        fontSize: RC.Theme.font.size,
        display: "block", padding: "5px 0",
      }
    }
  },
})
