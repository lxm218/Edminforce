
RC.Loading = React.createClass({
  mixins: [RC.Mixins.PureRender,RC.Mixins.CSS],
  displayName: "Loading",

  doLoading() {
    let styles = this.css.styles
    return <div style={styles.loading} ref={this.props.ref}>
      <span style={styles.progress} />
    </div>
  },
  render() {
    let styles = this.css.styles
    let props = {... _.omit(this.props,["isReady","children"])}
    let children = _.isArray(this.props.children) || typeof this.props.children==="string"
      ? <div {... props} style={styles.canvas}>{this.props.children}</div>
      : this.props.children

    return this.props.isReady || (_.isUndefined(this.props.isReady) && this.props.children)
      ? children : this.doLoading()
  },
  // @@@@
  // @@@@
  // Styles
  // @@@@
  // @@@@
  baseStyles(np,ns) {

    return {
      canvas: {},
      loading: {
        minHeight: 100, position: "relative",
      },
      progress: h.assignClone( RC.cssMixins.absCenter(50), {
        width: 50, margin: "-25px 0 0 -25px", left: "50%",
        borderRadius: "50%",
        border: "solid 2px "+RC.Theme.color.edgesLighter,
        borderLeftColor: "#888",
        WebkitAnimation: "spin-inifinite-animate .52s linear infinite"
      }),
    }
  },
  themeStyles(np,ns) {
    return {
      tiny: {
        canvas: {
          minHeight: 24
        },
        progress: h.assignClone( RC.cssMixins.absCenter(24), {
          width: 24, margin: "-12px 0 0 -12px",
        }),
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
  hoverStart() {
    this.setState({
      isHover: true
    })
  },
  hoverEnd() {
    this.setState({
      isHover: false
    })
  },
  render() {

    var props = _.omit(this.props, ["tagName"])
    props.style = this.css.styles.canvas
    props.onMouseOver = props.onTouchStart = this.hoverStart
    props.onMouseOut = props.onTouchEnd = this.hoverEnd

    if (props.href)
      return <a {... props}>{props.children}</a>

    if (typeof this.props.tagName==="string")
      return React.createElement(this.props.tagName, props, props.children)
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
      canvas: {
        cursor: isURL ? "pointer" : "auto",
        color: ns.isHover ? this.colorHover : textColor
      }
    }
  },
})
