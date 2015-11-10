
RC.Loading = React.createClass({
  mixins: [RC.Mixins.PureRender,RC.Mixins.CSS],
  displayName: "Loading",
  // @@@@
  // @@@@
  // Prep
  // @@@@
  // @@@@
  getInitialState() {
    return {
      isReady: this.props.isReady
    }
  },
  componentWillReceiveProps(np,ns) {
    if (!np.loadOnce || (np.isReady && !ns.isReady))
      this.setState({ isReady: np.isReady })
  },
  // @@@@
  // @@@@
  // Render
  // @@@@
  // @@@@
  doLoading() {
    let styles = this.css.styles
    // return <div style={styles.loading} ref={this.props.ref}> // Not sure if this is needed, but I removed the ref, I'm not sure why it was there.
    return <div>
      <span style={styles.progress} />
      {this.props.loadingText ? <span style={styles.loadingText}>{this.props.loadingText}</span> : null}
    </div>
  },
  render() {
    let styles = this.css.styles
    let props = {... _.omit(this.props,["isReady","children", "style"])}
    let isReady = this.state.isReady || (_.isUndefined(this.props.isReady) && this.props.children)

    return <div {... props} style={isReady ? styles.area : styles.loading}>
      {isReady ? this.props.children : this.doLoading()}
    </div>
  },
  // @@@@
  // @@@@
  // Styles
  // @@@@
  // @@@@
  baseStyles(np,ns) {
    return {
      area: {},
      loading: {
        width: "100%", minHeight: 100, position: "relative", zIndex: 10,
      },
      progress: h.assignClone( RC.cssMixins.absCenter(50), {
        width: 50, margin: "-25px 0 0 -25px", left: "50%",
        borderRadius: "50%",
        border: "solid 2px "+RC.Theme.color.edges,
        borderLeftColor: "rgba(255,255,255,.78)",
        WebkitAnimation: "spin-inifinite-animate .52s linear infinite"
      }),
      loadingText: {
        position: "absolute", width: 150, margin: "35px 0 0 -75px", top: "50%", left: "50%",
        textAlign: "center", fontSize: RC.Theme.font.size-2,
        opacity: .55,
      }
    }
  },
  themeStyles(np,ns) {
    return {
      tiny: {
        area: {
          minHeight: 24
        },
        progress: h.assignClone( RC.cssMixins.absCenter(24), {
          width: 24, margin: "-12px 0 0 -12px",
        }),
      },
      "abs-full": {
        loading: RC.cssMixins.absFull
      }
    }
  }
})

RC.URL = React.createClass({
  mixins: [RC.Mixins.PureRender,RC.Mixins.CSS],
  displayName: "URL",

  getInitialState() {
    return {
      isHover: false
    }
  },
  hoverStart(func) {
    this.setState({
      isHover: true
    })
    if (_.isFunction(func))
      func()
  },
  hoverEnd(func) {
    this.setState({
      isHover: false
    })
    if (_.isFunction(func))
      func()
  },
  render() {

    let uiIcon = null
    let props = _.omit(this.props, ["tagName","uiStyle","uiItemStyle","uiTheme"].concat(RC.uiKeys))
    let uiProps = _.pick(this.props, RC.uiKeys)
    let tagName = this.props.tagName

    props.style = this.css.styles.area
    props.onMouseOver = this.hoverStart.bind(null,this.props.onMouseOver)
    props.onTouchStart = this.hoverStart.bind(null,this.props.onTouchStart)
    props.onMouseOut = this.hoverEnd.bind(null,this.props.onMouseOut)
    props.onTouchEnd = this.hoverEnd.bind(null,this.props.onTouchEnd)

    if (uiProps.uiClass) {
      if (!uiProps.uiColor)
        uiProps.uiColor = this.color.textColor
      if (this.props.uiItemStyle)
        uiProps.itemStyle = this.props.uiItemStyle
      if (this.props.uiStyle)
        uiProps.style = this.props.uiStyle
      uiIcon = <RC.uiIcon {... uiProps} theme={this.props.uiTheme || "inline-block-left"} />
    }

    if (uiIcon) {
      if (props.href)
        return <a {... props}>{uiIcon}{props.children}</a>
      else if (tagName)
        return React.createElement(tagName, props, [uiIcon, props.children])
      else
        return <span {... props}>{uiIcon}{props.children}</span>
    } else if (props.href)
      return <a {... props}>{props.children}</a>
    else if (tagName)
      return React.createElement(tagName, props, props.children)
    else
      return <span {... props}>{props.children}</span>
  },
  // @@@@
  // @@@@
  // Styles
  // @@@@
  // @@@@
  watchStates: ["isHover"],
  watchProps: ["colorHover"],
  baseStyles(np,ns) {

    let isURL = h.isURL(np)
    let textColor = np.color ? this.color.textColor : "inherit"

    if (np.noHover)
      this.colorHover = textColor
    else if (typeof this.colorHover === "undefined" || np.colorHover!=this.props.colorHover)
      this.colorHover = np.colorHover
        ? h.getRealColor(np.colorHover, "linkHover", null, true)
        : RC.Theme.color.linkHover

    return {
      area: {
        cursor: isURL ? "pointer" : "auto",
        color: ns.isHover ? this.colorHover : textColor,
        textDecoration: "none"
      }
    }
  },
})
