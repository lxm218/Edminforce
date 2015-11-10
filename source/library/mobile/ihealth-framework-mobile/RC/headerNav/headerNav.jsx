
let sbHeight = 20 // Statusbar Height

RC.HeaderNav = React.createClass({
  mixins: [RC.Mixins.PureRender,RC.Mixins.CSS],
  displayName: "HeaderNav",

  propTypes: {
    id: React.PropTypes.string,

    theme: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.array,
    ]),

    // title: React.PropTypes.string, // React elements are allowed too now
    logoUrl: React.PropTypes.string,
    nav: React.PropTypes.array,
  },
  timeout: null,
  // @@@@
  // @@@@
  // Prep
  // @@@@
  // @@@@
  getInitialState() {
    return {
      moreNav: false,
      fullNav: false,
    }
  },
  componentWillMount() {
    document.addEventListener("click", this.hideMore)
  },
  componentWillUnmount() {
    document.removeEventListener("click", this.hideMore)
  },
  // @@@@
  // @@@@
  // Utility
  // @@@@
  // @@@@
  hideMore(e) {
    if (!e.target || !this.refs.moreButton || e.target!=ReactDOM.findDOMNode(this.refs.moreButton))
      this.setState({openNav: false})
  },
  openMore() {
    this.setState({openNav: true})
  },
  toggleFull() {
    this.setState({fullNav: !this.state.fullNav})
  },
  goBack(home) {
    if (home) {
      FlowRouter.BackButton = true
      FlowRouter.go("/")
    } else if (FlowRouter.LastRoute.length) {
      FlowRouter.BackButton = true
      FlowRouter.go(FlowRouter.LastRoute[FlowRouter.LastRoute.length-1])
    }
  },
  // @@@@
  // @@@@
  // Render
  // @@@@
  // @@@@
  renderBackButton() {
    if (!this.props.hideBackButton) {
      let styles = this.css.styles
      if (FlowRouter && FlowRouter.LastRoute.length) {
        let backStyles = h.assignClone(styles.back, {padding: "0 0 0 21px"})

        return <p style={backStyles} onClick={this.goBack.bind(null,false)}>
          <span style={styles.arrowTop}/>
          <span style={styles.arrowBottom}/>
          <span style={styles.backText}>Back</span>
        </p>
      }

      return FlowRouter && FlowRouter.current().path!="/" && !this.props.hideHome
      ? <span style={styles.back} onClick={this.goBack.bind(null,true)}>Home</span>
      : null
    }
  },
  renderMoreNav() {
    let styles = this.css.styles
    if (this.props.useMiniNav || !this.props.children) {
      // Mini Nav
      if (!this.props.nav || !this.props.nav.length) return null
      return <div>
        <p style={styles.moreButton} onClick={this.openMore} ref="moreButton">
          <span style={styles.dot1} />
          <span style={styles.dot2} />
          <span style={styles.dot3} />
        </p>
        <RC.Animate transitionName="corner-right" transitionEnterTimeout={400} transitionLeaveTimeout={400}>
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
    }
  },
  renderFullNav() {
    let self = this
    let styles = this.css.styles
    if (!this.props.useMiniNav && this.props.children) {

      let renderChildren = function(c,n){
        if (React.isValidElement(c)) {
          let props = { key: n }
          if (h.nk(c, "type.displayName")==="URL") {
            props.style = c.props.style ? h.assignClone(c.props.style, styles.fullNavItem) : styles.fullNavItem
            props.onClick = function(e){
              self.toggleFull()
              if (_.isFunction(c.props.onClick)) c.props.onClick(e)
            }
          }
          return React.cloneElement(c, props)
        }
        return <span key={n}>{c}</span>
      }

      // Full Nav
      return <div>
        <a onClick={this.toggleFull} style={styles.xContain}>
          <span style={styles.xTop}/>
          <span style={styles.xMid}/>
          <span style={styles.xBot}/>
        </a>
        <RC.Animate transitionName={this.props.transitionName || "from-right-slower"} transitionEnterTimeout={300} transitionLeaveTimeout={300}>
          {
          this.state.fullNav && !!this.props.children
          ?
          <div style={styles.fullNav}>
            <div style={styles.fullNavInner}>
            {
            React.isValidElement(this.props.children) || typeof this.props.children==="string"
            ? this.props.children
            : (this.props.children || []).map( renderChildren )
            }
            </div>
          </div>
          :
          null
          }
        </RC.Animate>
      </div>
    }
  },
  render() {
    let styles = this.css.styles
    let ht = RC.Theme.statusBar ? RC.Theme.size.headerNavHeight+sbHeight : RC.Theme.size.headerNavHeight
    return <div style={this.props.absolute ? {} : {paddingTop: ht, position: "relative"}}>
      <nav style={styles.area}>
        {this.renderBackButton()}
        <figure style={styles.title}>
          {
          this.props.logoUrl ? <img src={this.props.logoUrl} style={styles.logo} />
          : (this.props.title ? this.props.title : null)
          }
        </figure>
        {this.renderMoreNav()}
      </nav>
      {this.renderFullNav()}
    </div>
  },
  // @@@@
  // @@@@
  // Styles
  // @@@@
  // @@@@
  watchProps: ["uiBgColorActive","createHeaderSpace","fullNavColor","fullNavBgColor","xColor","absolute"],
  watchStates: ["checked","fullNav"],
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

    if (typeof this.fullNavBgColor==="undefined" || np.fullNavBgColor!=this.props.fullNavBgColor)
      this.fullNavBgColor = np.fullNavBgColor
        ? h.getRealColor(np.fullNavBgColor, "brand1", null, true)
        : RC.Theme.color.brand1

    if (typeof this.fullNavColor==="undefined" || np.fullNavColor!=this.props.fullNavColor)
      this.fullNavColor = np.fullNavColor
        ? h.getRealColor(np.fullNavColor, "onBrand1", null, true)
        : RC.Theme.color.onBrand1

    if (typeof this.xColor==="undefined" || np.xColor!=this.props.xColor)
      this.xColor = np.xColor
        ? h.getRealColor(np.xColor, "onBrand1", null, true)
        : RC.Theme.color.onBrand1

    let xLine = {
      height: 2, width: ns.fullNav ? 22 : 16,
      position: "absolute", top: "50%", left: "50%",
      background: ns.fullNav ? this.xColor : textColor,
      transition: "all .2s ease"
    }

    let testMQ = window.matchMedia(`(min-width: ${RC.Theme.resolution.small})`).matches

    return {
      area: {
        fontSize: RC.Theme.font.size-2,
        display: "flex", alignItems: "center", padding: 5,
        borderTop: RC.Theme.statusBar ? `solid ${sbHeight}px rgba(0,0,0,.1)` : "none",
        height: RC.Theme.size.headerNavHeight+(RC.Theme.statusBar ? sbHeight : 0),
        backgroundColor: this.color.hex, color: textColor,
        boxShadow: this.color.hex=="transparent" ? "none" : "0 1px rgba(0,0,0,.1)",
        position: np.absolute ? "absolute" : "fixed", top: 0, left: 0, right: 0, zIndex: 5000,
      },
      // Title
      title: h.assignClone( [RC.cssMixins.font("bold"),RC.cssMixins.ellipsis], {
        fontSize: RC.Theme.font.size+1,
        color: textColor,
        textAlign: np.hideBackButton ? "left" : "center",
        margin: np.hideBackButton ? 0 : "0 auto",
        minWidth: 180, maxWidth: "75%", padding: "0 6px",
      }),
      logo: {
        display: "block", margin: "0 auto",
      },
      // Back
      back: {
        position: "absolute", top: 0, bottom: 0, left: 0,
        display: "flex", alignItems: "center",
        margin: 0, padding: "0 0 0 7px", minWidth: 50
      },
      backText: testMQ ? {} : {display:"none"},
      arrowTop: {
        position: "absolute", top: "50%", left: 10,
        background: textColor,
        width: 2, height: 8, margin: "-6px 0 0",
        transform: "rotate(45deg)",
      },
      arrowBottom: {
        position: "absolute", top: "50%", left: 7,
        background: textColor,
        width: 8, height: 2, margin: "2px 0 0",
        transform: "rotate(45deg)",
      },
      // More Nav
      moreNav: {
        position: "fixed", top: 15, right: 10, zIndex: 1000,
        padding: "15px 0",
        fontSize: RC.Theme.font.size-1, lineHeight: 2.25,
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
      dot1: h.assignClone(dot,{ margin: "3px -5px 0 0" }),
      dot2: h.assignClone(dot,{ margin: "-3px -5px 0 0" }),
      dot3: h.assignClone(dot,{ margin: "9px -5px 0 0" }),
      // Full Nav X
      xContain: {
        position: "fixed", zIndex: 5010,
        top: (RC.Theme.statusBar ? sbHeight : 0)+(ns.fullNav ? 10 : 0), right: ns.fullNav ? 10 : 0,
        width: 50, height: RC.Theme.size.headerNavHeight,
        transition: "all .4s ease"
      },
      xTop: h.assignClone( xLine, {
        margin: ns.fullNav ? "-1px 0 0 -3px" : "-6px 0 0 0",
        transform: ns.fullNav ? "rotate(45deg)" : "rotate(0)",
      }),
      xMid: h.assignClone( xLine, {
        margin: ns.fullNav ? "-1px 0 0 -3px" : "-1px 0 0 0",
        opacity: ns.fullNav ? 0 : 1,
      }),
      xBot: h.assignClone( xLine, {
        margin: ns.fullNav ? "-1px 0 0 -3px" : "4px 0 0 0",
        transform: ns.fullNav ? "rotate(-45deg)" : "rotate(0)",
      }),
      // Full Nav Area
      fullNav: h.assignClone([RC.cssMixins.fixedFull, RC.cssMixins.verticalAlignOuter], {
        zIndex: 5000,
        backgroundColor: this.fullNavBgColor, color: this.fullNavColor,
        overflowY: "auto", overflowX: "hidden"
      }),
      fullNavInner: h.assignClone(RC.cssMixins.verticalAlignInner, {
        padding: "12% 24px"
      }),
      fullNavItem: h.assignClone(RC.cssMixins.font("light"),{
        fontSize: RC.Theme.font.size*1.9, lineHeight: 2, color: this.fullNavColor,
        display: "block",
      })
    }
  },
})
