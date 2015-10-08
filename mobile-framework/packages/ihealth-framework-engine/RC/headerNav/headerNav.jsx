
let themes = ["regular","opacity","flat"]
RC.HeaderNav = React.createClass({
  mixins: [RC.Mixins.PureRender,RC.Mixins.CSS],
  displayName: "HeaderNav",

  propTypes: {
    id: React.PropTypes.string,

    theme: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.array,
    ]),

    title: React.PropTypes.string,
    logoUrl: React.PropTypes.string,
    nav: React.PropTypes.array,
  },
  clickHandler(home) {
    if (home) {
      FlowRouter.BackButton = true
      FlowRouter.go("/")
    } else if (FlowRouter.LastRoute.length) {
      FlowRouter.BackButton = true
      FlowRouter.go(FlowRouter.LastRoute[FlowRouter.LastRoute.length-1])
    }
  },
  getInitialState() {
    return {openNav: false}
  },
  componentWillMount() {
    document.addEventListener("click", this.hideMore)
  },
  componentWillUnmount() {
    document.removeEventListener("click", this.hideMore)
  },
  hideMore(e) {
    if (!e.target || !this.refs.moreButton || e.target!=this.refs.moreButton.getDOMNode())
      this.setState({openNav: false})
  },
  openMore() {
    this.setState({openNav: true})
  },
  timeout: null,
  renderBackButton() {
    let styles = this.css.styles
    if (FlowRouter && FlowRouter.LastRoute.length) {
      let backStyles = h.assignClone(styles.back, {padding: "0 0 0 10px"})
      return <p style={backStyles} onClick={this.clickHandler.bind(null,false)}>
        <span style={styles.arrowTop}/>
        <span style={styles.arrowBottom}/>
        Back
      </p>
    }

    return FlowRouter && FlowRouter.current().path!="/" && !this.props.hideHome
    ? <span style={styles.back} onMouseDown={this.clickHandler.bind(null,true)} onTouchStart={this.clickHandler.bind(null,true)}>Home</span>
    : null
  },
  renderNav() {
    if (!this.props.nav || !this.props.nav.length) return null

    let styles = this.css.styles
    return <div>
      <p style={styles.moreButton} onClick={this.openMore} ref="moreButton">
        <span style={styles.dot1} />
        <span style={styles.dot2} />
        <span style={styles.dot3} />
      </p>
      <RC.Animate transitionName="corner-right">
      {
      !this.state.openNav ? null :
      <div style={styles.moreNav} ref="moreNav">
        {
        this.props.nav.map(function(item,n){
          return <RC.URL {... _.omit(item, ["text"])} key={n} style={styles.moreLink}>{item.text}</RC.URL>
        })
        }
      </div>
      }
      </RC.Animate>
    </div>
  },
  render() {

    let styles = this.css.styles

    return <div style={{paddingTop: RC.Theme.size.headerNavHeight}}>
      <nav style={styles.canvas}>
        {this.renderBackButton()}
        <figure style={styles.title}>
          {
          this.props.logoUrl ? <img src={this.props.logoUrl} style={styles.logo} />
          : (this.props.title ? this.props.title : null)
          }
        </figure>
        {this.renderNav()}
      </nav>
    </div>
  },
  // @@@@
  // @@@@
  // Styles
  // @@@@
  // @@@@
  watchProps: ["uiBgColorActive"],
  watchStates: ["checked"],
  baseStyles(np,ns) {

    let textColor = !np.bgColor && !np.color
      ? RC.Theme.color.brand2
      : this.color.textColor
    let dot = {
      position: "absolute", top: "50%", right: 18,
      width: 4, height: 4,
      background: textColor,
      borderRadius: "50%"
    }

    return {
      canvas: {
        fontSize: RC.Theme.font.size-1,
        display: "flex", alignItems: "center", padding: "5px 10px",
        height: RC.Theme.size.headerNavHeight,
        backgroundColor: this.color.hex, color: textColor,
        boxShadow: "0 1px rgba(0,0,0,.1)",
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 4005,
      },
      // Title
      title: h.assignClone( [RC.cssMixins.font("bold"),RC.cssMixins.ellipsis], {
        fontSize: RC.Theme.font.size+2,
        color: textColor,
        textAlign: "center",
        minWidth: 150, maxWidth: "75%", margin: "0 auto", padding: "0 10px",
      }),
      logo: {
        display: "block", margin: "0 auto",
      },
      // Back
      back: {
        position: "absolute", top: "50%", left: 15,
        margin: (-RC.Theme.font.size/2)+"px 0 0", padding: 0
      },
      arrowTop: {
        position: "absolute", top: 10, left: -4,
        background: textColor,
        width: 6, height: 2, margin: 0,
        transform: "rotate(45deg)",
      },
      arrowBottom: {
        position: "absolute", top: 4, left: -2,
        background: textColor,
        width: 2, height: 6, margin: 0,
        transform: "rotate(45deg)",
      },
      // More
      moreNav: {
        position: "fixed", top: 10, right: 10, zIndex: 1000,
        padding: "15px 0", lineHeight: 2.25,
        boxShadow: "0 0 7px rgba(0,0,0,.2)",
        background: RC.Theme.color.white,
      },
      moreLink: {
        display: "block", padding: "0 15px", color: RC.Theme.color.text,
      },
      moreButton: {
        position: "absolute", top: 0, bottom: 0, right: 0,
        width: 40,
        margin: (-RC.Theme.font.size/2)+"px 0 0", padding: 0
      },
      dot1: h.assignClone(dot,{ margin: "3px 0 0 0" }),
      dot2: h.assignClone(dot,{ margin: "-3px 0 0 0" }),
      dot3: h.assignClone(dot,{ margin: "9px 0 0 0" }),
    }
  },
  themeStyles(np,ns) {
    return {

    }
  }
})
