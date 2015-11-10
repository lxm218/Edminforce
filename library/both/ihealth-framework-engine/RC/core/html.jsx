
RC.Body = React.createClass({
  mixins: [RC.Mixins.PureRender,RC.Mixins.CSS],
  displayName: "Body",
  // @@@@
  // @@@@
  // Prep
  // @@@@
  // @@@@
  componentWillMount() {
    if (!RC.cssMixins.hasOwnProperty("stylesheet")) return null

    const pureProps = ["line-height","font-weight"]
    const stylesheet = autoprefix(RC.cssMixins.stylesheet())
    const keys = Object.keys(stylesheet)

    const cssProperty = function(property){
      property = property.split(/(?=[A-Z])/).map(function(p){
        p = p.replace("Webkit","-webkit").replace("Moz","-moz")
        if (p=="ms") p = "-ms"
        if (p=="o") p = "-o"
        return p.toLowerCase()
      })
      return property.join("-")
    }

    const stylesComputed = keys.map(function(k){
      let css = stylesheet[k]
      let cssInner = Object.keys(css).map(function(ck){
        let cssProp = cssProperty(ck)
        let cssVal = !isNaN(css[ck]) && !_.contains(pureProps, cssProp) ? css[ck]+"px" : css[ck]
        return [cssProp+":", cssVal+";"].join("")
      }).join("")

      return [k,"{"+cssInner+"}"].join("")
    }).join("")

    this.stylesheet = <style dangerouslySetInnerHTML={{__html: stylesComputed}} />
    this.mediaQuery()
  },
  mediaQuery() {
    let keys = _.keys(RC.Theme.resolution)
    let width = window.innerWidth
    let height = window.innerHeight
    let device = keys[0]

    _.every( _.values(RC.Theme.resolution), function(r,n){
      let test = window.matchMedia(`(min-width: ${r})`).matches
      if (test) device = keys[n]
      return test
    })

    RC.MQ = {
      width: width,
      height: height,
      device: device,
    }
  },
  // @@@@
  // @@@@
  // Render
  // @@@@
  // @@@@
  render() {
    let styles = this.css.styles
    return <div {... this.props} style={styles.area}>
      {this.stylesheet}
      {this.props.children}
    </div>
  },
  // @@@@
  // @@@@
  // Styles
  // @@@@
  // @@@@
  watchProps: ["bgColor","color"],
  baseStyles(){
    return {
      area: h.assignClone( RC.cssMixins.main(), {
        backgroundColor: this.color.realHex, color: this.color.textColor,
      })
    }
  },
})

RC.Div = React.createClass({
  mixins: [RC.Mixins.PureRender,RC.Mixins.CSS],
  displayName: "Div",

  render() {
    var styles = this.css.styles

    // TODO
    // Deprecate this part
    if (this.props.createGlobalNavSpace)
      styles.area.paddingBottom = 50

    return <div {... this.props} style={styles.area}>
      {this.props.children}
    </div>
  },
  // @@@@
  // @@@@
  // Styles
  // @@@@
  // @@@@
  watchProps: ["bgColor","color","autoFix","relative"],
  baseStyles(np,ns) {
    let autoFix = _.isUndefined(np.autoFix) || np.autoFix
    let areaStyle = {
      backgroundColor: this.color.realHex, color: this.color.realText,
      overflowY: this.color.realHex!="transparent" && autoFix ? "auto" : "visible"
    }

    if (np.relative)
      areaStyle.position = "relative"

    return {
      area: areaStyle
    }
  },
  themeStyles(){
    return h.assignClone( RC.ThemeHelpers.core(), {
      // Center Background
      background: {
        area: {
          backgroundSize: "cover", backgroundPosition: "50%",
        }
      },
      // Mobile Canvas
      // DEPRECATED
      // DEPRECATED
      // DEPRECATED
      "mobile-area": {
        area: {
          paddingTop: RC.Theme.size.headerNavHeight,
          position: "absolute", top: 0, left: 0, right: 0, bottom: 0,
        }
      },
      // Abs Full
      "abs-full": {
        area: RC.cssMixins.absFull
      },
      // Full
      full: {
        area: RC.cssMixins.fullHeight(),
      },
      // Content Area
      content: {
        area: {
          maxWidth: RC.Theme.size.contentArea
        },
      },
      // Center Divs
      autoMargin: {
        area: {
          margin: "0 auto"
        },
      },
    })
  },
})

RC.Subtitle = React.createClass({
  mixins: [RC.Mixins.PureRender,RC.Mixins.CSS],
  displayName: "Subtitle",

  propTypes: {
    id: React.PropTypes.string,
    style: React.PropTypes.object,
    color: React.PropTypes.string,
    bgColor: React.PropTypes.string,

    theme: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.array,
    ]),

    tagName: React.PropTypes.string,
  },

  render() {
    let tagName = this.props.tagName || "h4"

    let props = _.omit(this.props,"tagName")
    props.style = this.css.styles.area

    return React.createElement(tagName, props, this.props.children)
  },
  // @@@@
  // @@@@
  // Styles
  // @@@@
  // @@@@
  baseStyles() {
    let PAD = RC.Theme.size.paddingPx
    return {
      area: h.assignClone( RC.cssMixins.font("heavy"),{
        fontSize: RC.Theme.font.size - 2, color: this.color.textColor,
        padding: `${PAD*2.25}px 0 10px`, margin: `0 0 ${PAD*1.25}px`,
        opacity: .25
      })
    }
  },
  themeStyles() {
    return {
      line: {
        area: {
          borderBottom: `solid 1px ${this.color.textColor}`
        }
      },
      uppercase: {
        area: {
          textTransform: "uppercase", letterSpacing: ".075em",
        }
      }
    }
  },
})
