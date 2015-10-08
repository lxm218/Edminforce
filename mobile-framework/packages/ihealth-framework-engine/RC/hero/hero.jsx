
RC.Hero = React.createClass({
  mixins: [RC.Mixins.PureRender,RC.Mixins.CSS],
  displayName: "Hero",

  propTypes: {
    title: React.PropTypes.string,
    subtitle: React.PropTypes.string,
    avatar: React.PropTypes.string,
    uiClass: React.PropTypes.string,

    color: React.PropTypes.string,
    bgColor: React.PropTypes.string,

    theme: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.array,
    ]),

    id: React.PropTypes.string,
    className: React.PropTypes.string,
    style: React.PropTypes.object,
  },
  /**
   * @@@
   * State Control
   * @@@
   */
  getInitialState(){
    return { isActive: false }
  },
  toggleActive(){
    let active = !this.state.isActive
    this.setState({ isActive: active })
  },
  setInactive(){
    this.setState({ isActive: false })
  },
  setActive(){
    this.setState({ isActive: true })
  },
  /**
   * @@@
   * Render
   * @@@
   */
  renderHero(){

    let styles = this.css.styles
    let actionUrl = _.isString(this.props.action) ? this.props.action : null
    let actionFunc = _.isFunction(this.props.action) ? this.props.action : null

    return <div style={styles.item}>
      {
      !this.props.avatar && !this.props.uiClass ? null :
      <div style={styles.avatarContainer} href={actionUrl} onClick={actionFunc}>
        {this.props.avatar ? <figure style={styles.avatar}/> : null}
        {this.props.uiClass ? <RC.uiIcon uiSize={24} uiClass={this.props.uiClass} uiColor={this.props.uiColor || "white"} uiBgColor={this.props.uiBgColor || "dark"} canvasStyle={styles.avatarIconCanvas} itemStyle={styles.avatarIcon}/> : null}
      </div>
      }
      {this.props.title ? <strong style={styles.title}>{this.props.title}</strong> : null}
      {this.props.subtitle ? <div style={styles.subtitle}>{this.props.subtitle}</div> : null}
    </div>
  },
  render(){

    let styles = this.css.styles

    return <div style={styles.canvas}>
      {this.props.backgroundImage ? <div style={styles.canvasInner}/> : null}
      {this.renderHero()}
      {this.props.children}
    </div>
  },
  // @@@@
  // @@@@
  // Styles Start
  // @@@@
  // @@@@
  defBgColor: "dark",
  watchProps: ["avatar","backgroundImage"],
  baseStyles(np,ns) {

    let hasAction = !!np.uiClass
    let avatarSize = 58

    // Start Styles
    return {
      // Canvas
      canvas: {
        position: "relative", zIndex: 2,
        backgroundColor: this.color.hex, backgroundImage: "url("+np.backgroundImage+")", backgroundSize: "cover", backgroundPosition: "center",
        margin: 0, padding: 0, overflow: "hidden",
        backgroundColor: this.color.hex, color: this.color.textColor,
      },
      // Canvas Inner
      canvasInner: h.assignClone( RC.cssMixins.absFull, {
        zIndex: 1,
        backgroundColor: "rgba(0,0,0,.5)",
      }),
      // Item
      item: {
        position: "relative", zIndex: 3,
        textAlign: "center",
        maxWidth: 580, minHeight: 70, padding: "10% 0 7%", margin: "0 auto"
      },
      // Avatar Container
      avatarContainer: {
        position: "relative",
        width: avatarSize*1.7, height: avatarSize, margin: "0 auto 10px"
      },
      // Avatar
      avatar: h.assignClone( RC.cssMixins.avatar, {
        position: "absolute", top: 0, left: hasAction ? 0 : "50%", right: "auto", zIndex: 2,
        backgroundImage: "url("+np.avatar+")",
        width: avatarSize, height: avatarSize, margin: "0 0 0 "+(hasAction ? 0 : avatarSize/-2)+"px"
      }),
      // Avatar Icon Canvas
      avatarIconCanvas: h.assignClone( RC.cssMixins.avatar, {
        position: "absolute", top: 0, left: np.avatar ? "auto" : "50%", right: np.avatar ? 0 : "auto", zIndex: 1,
        width: avatarSize, height: avatarSize, margin: "0 0 0 "+(np.avatar ? 0 : avatarSize/-2)+"px"
      }),
      // Avatar Icon
      avatarIcon: {
        marginLeft: 7,
      },
      // Title
      title: {
        display: "block",
        fontSize: RC.Theme.font.size*1.15, color: this.color.textColor,
      },
      // Subtitle
      subtitle: {
        padding: 5, margin: 0,
        fontSize: RC.Theme.font.size*.85,
        opacity: .58
      }
    }
  },
})
