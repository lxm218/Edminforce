"use strict";

RC.HeaderNav = class extends RC.CSS {
  constructor(props) {
    super(props);

    this.timeout = null;
    this.watchProps = ["uiBgColorActive","createHeaderSpace","fullNavColor","fullNavBgColor","absolute"]

    this.state = {
      obj: Immutable.Map({
        //moreNav: false,
        openNav: false,
        fullNav: false,
      })
    }
  }
  // @@@@
  // @@@@
  // Prep
  // @@@@
  // @@@@
  componentWillMount() {
    super.componentWillMount()
    document.addEventListener("click", this._hideMore.bind(this))
  }
  componentWillUnmount() {
    super.componentWillUnmount()
    document.removeEventListener("click", this._hideMore.bind(this))
  }
  // @@@@
  // @@@@
  // Utility
  // @@@@
  // @@@@
  _hideMore(e) {
    if (this._isMounted && (!e.target || !this.refs.moreButton || e.target!=ReactDOM.findDOMNode(this.refs.moreButton)))
      this.setState( ({obj}) => ({
        obj: obj.set("openNav", false)
      }))
  }
  _openMore() {
    this.setState( ({obj}) => ({
      obj: obj.set("openNav", true)
    }))
  }
  _toggleFull() {
    this.setState( ({obj}) => ({
      obj: obj.update("fullNav", value => !value)
    }))
  }
  goBack(home) {
    if (home) {
      FlowRouter.BackButton = true
      FlowRouter.go("/")
    } else if (FlowRouter.LastRoute.length) {
      FlowRouter.BackButton = true
      FlowRouter.go(FlowRouter.LastRoute[FlowRouter.LastRoute.length-1])
    }
  }
  // @@@@
  // @@@@
  // Render
  // @@@@
  // @@@@
  renderBackButton() {
    if (!this.props.hideBackButton) {
      const styles = this.css.get("styles")
      if (FlowRouter && FlowRouter.LastRoute.length) {
        const backStyles = Object.assign({},styles.back, {padding: "0 0 0 21px"})

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
  }
  renderMoreNav() {
    const styles = this.css.get("styles")
    const state = this.state.obj
    if (this.props.useMiniNav || !this.props.children) {
      // Mini Nav
      if (!this.props.nav || !this.props.nav.length) return null
      return <div>
        <p style={styles.moreButton} onClick={this._openMore.bind(this)} ref="moreButton">
          <span style={styles.dot1} />
          <span style={styles.dot2} />
          <span style={styles.dot3} />
        </p>
        <RC.Animate transitionName="corner-right" transitionEnterTimeout={400} transitionLeaveTimeout={400}>
        {
        !state.get("openNav") ? null :
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
  }
  renderChildren(){
    let self = this
    const styles = this.css.get("styles")
    const renderChildren = (c,n) => {
      if (React.isValidElement(c)) {
        let props = { key: n }
        if (h.nk(c, "type.displayName")==="RC.URL") {
          props.style = c.props.style ? Object.assign({},c.props.style, styles.fullNavItem) : styles.fullNavItem
          props.onClick = function(e){
            self._toggleFull.call(self)
            if (_.isFunction(c.props.onClick)) c.props.onClick(e)
          }
        }
        return React.cloneElement(c, props)
      }
      return <span key={n}>{c}</span>
    }

    return React.isValidElement(this.props.children) || typeof this.props.children==="string"
      ? this.props.children
      : (this.props.children || []).map( renderChildren )
  }
  renderFullNav() {
    let self = this
    const styles = this.css.get("styles")
    const state = this.state.obj
    if (!this.props.useMiniNav && this.props.children) {

      // Full Nav
      return <div>
        <a onClick={this._toggleFull.bind(this)} style={h.assignPseudos(styles.xContain, state.get("fullNav"))}>
          <span style={h.assignPseudos(styles.xTop, state.get("fullNav"))}/>
          <span style={h.assignPseudos(styles.xMid, state.get("fullNav"))}/>
          <span style={h.assignPseudos(styles.xBot, state.get("fullNav"))}/>
        </a>
        <RC.Animate transitionName={this.props.transitionName || "from-right"} transitionEnterTimeout={300} transitionLeaveTimeout={300}>
          {
          state.get("fullNav") && !!this.props.children
          ?
          <div style={styles.fullNav}>
            <div style={styles.fullNavInner}>
            { this.renderChildren() }
            </div>
          </div>
          :
          null
          }
        </RC.Animate>
      </div>
    }
  }
  render() {
    let styles = this.css.get("styles")
    let ht = RC.Theme.size.headerNavHeight()
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
  }
  // @@@@
  // @@@@
  // Styles
  // @@@@
  // @@@@
  baseStyles(np,ns) {
    const state = ns.obj
    const textColor = !np.bgColor && !np.color
      ? RC.Theme.color.brand2
      : this.color.get("textColor")
    const dot = {
      position: "absolute", top: "50%", right: 18,
      width: 4, height: 4,
      backgroundColor: textColor,
      borderRadius: "50%"
    }

    if (typeof this.fullNav==="undefined" || np.fullNavBgColor!=this.props.fullNavBgColor)
      this.fullNav = h.getBasicColor(np.fullNavBgColor, "brand1", np.fullNavColor)

    const xLine = {
      height: 2,
      position: "absolute", top: "50%", left: "50%",
      backgroundColor: textColor,
      transition: "all .2s ease"
    }

    const testMQ = window.matchMedia(`(min-width: ${RC.Theme.resolution.small})`).matches

    return {
      area: {
        fontSize: RC.Theme.font.size-2,
        display: "flex", alignItems: "center", padding: 5,
        borderTop: RC.Theme.statusBar ? `solid 20px rgba(0,0,0,.1)` : "none",
        height: RC.Theme.size.headerNavHeight(),
        backgroundColor: this.color.get("hex"), color: textColor,
        boxShadow: this.color.get("hex")=="transparent" ? "none" : "0 1px rgba(0,0,0,.1)",
        position: np.absolute ? "absolute" : "fixed", top: 0, left: 0, right: 0, zIndex: 5000,
      },
      // Title
      title: Object.assign({},RC.cssMixins.font("bold"),RC.cssMixins.ellipsis, {
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
        backgroundColor: textColor,
        width: 2, height: 8, margin: "-6px 0 0",
        transform: "rotate(45deg)",
      },
      arrowBottom: {
        position: "absolute", top: "50%", left: 7,
        backgroundColor: textColor,
        width: 8, height: 2, margin: "2px 0 0",
        transform: "rotate(45deg)",
      },
      // More Nav
      moreNav: {
        position: "fixed", top: 15, right: 10, zIndex: 1000,
        padding: "15px 0",
        fontSize: RC.Theme.font.size-1, lineHeight: 2.25,
        boxShadow: "0 0 7px rgba(0,0,0,.2)",
        backgroundColor: RC.Theme.color.white,
      },
      moreLink: {
        display: "block", padding: "0 15px", color: RC.Theme.color.text,
      },
      moreButton: {
        position: "absolute", top: 0, bottom: 0, right: 0,
        width: 40,
        margin: (-RC.Theme.font.size/2)+"px 0 0", padding: 0
      },
      dot1: Object.assign({},dot,{ margin: "3px -5px 0 0" }),
      dot2: Object.assign({},dot,{ margin: "-3px -5px 0 0" }),
      dot3: Object.assign({},dot,{ margin: "9px -5px 0 0" }),
      // Full Nav X
      xContain: {
        position: "fixed", zIndex: 5010,
        top: RC.Theme.statusBar ? 20 : 0, right: 0,
        width: 50, height: RC.Theme.size.headerNavHeight(true),
        transition: "all .4s ease",
        ":on": {
          top: (RC.Theme.statusBar ? 20 : 0)+10, right: 5
        }
      },
      xTop: Object.assign({}, xLine, {
        width: 16, margin: "-6px 0 0 0", transform: "rotate(0)",
        ":on": {
          backgroundColor: this.fullNav.textColor,
          width: 20, margin: "-1px 0 0 -3px", transform: "rotate(45deg)"
        }
      }),
      xMid: Object.assign({}, xLine, {
        width: 16, margin: "-1px 0 0 0", opacity: 1,
        ":on": {
          opacity: 0
        }
      }),
      xBot: Object.assign({}, xLine, {
        width: 16, margin: "4px 0 0 0", transform: "rotate(0)",
        ":on": {
          backgroundColor: this.fullNav.textColor,
          width: 20, margin: "-1px 0 0 -3px", transform: "rotate(-45deg)"
        }
      }),
      // Full Nav Area
      fullNav: Object.assign({},RC.cssMixins.fixedFull, RC.cssMixins.verticalAlignOuter, {
        zIndex: 5000,
        backgroundColor: this.fullNav.hex, color: this.fullNav.textColor,
        overflowY: "auto", overflowX: "hidden"
      }),
      fullNavInner: Object.assign({},RC.cssMixins.verticalAlignInner, {
        padding: "12% 24px"
      }),
      fullNavItem: Object.assign({},RC.cssMixins.font("light"),{
        fontSize: RC.Theme.font.size*1.9, lineHeight: 2, color: this.fullNav.textColor,
        display: "block",
      })
    }
  }
}

RC.HeaderNav.displayName = "RC.HeaderNav"

RC.HeaderNav.propTypes = Object.assign({}, RC.HeaderNav.propTypes, {
  // title: React.PropTypes.string, // React elements are allowed too now
  logoUrl: React.PropTypes.string,
  nav: React.PropTypes.array,
  fullNavBgColor: React.PropTypes.string,
  fullNavColor: React.PropTypes.string
})
