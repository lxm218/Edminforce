
// TODO
// Add a if web/mobile option

RC = {
  uiKeys: ["uiClass","uiSize","uiBgColor","uiColor"],
  Animate: React.addons.CSSTransitionGroup,
  Mixins: {
    // @@@@@@
    // @@@@@@
    // @@@@@@
    // @@@@@@
    // @@@@@@
    // DEPRECATED, MUST DELETE THIS MIXIN
    // DEPRECATED, MUST DELETE THIS MIXIN
    // DEPRECATED, MUST DELETE THIS MIXIN
    // DEPRECATED, MUST DELETE THIS MIXIN
    // @@@@@@
    // @@@@@@
    // @@@@@@
    // @@@@@@
    // @@@@@@
    Theme: {
      splitThemes(){
        return h.strToArray(this.props.theme) || []
      },
      getTheme(t,addClass){
        var classList = []
        var self = this
        var themeList = h.strToArray( t || this.props.theme || this.themeDefault || "regular" )

        if (_.isString(this.themeGroup))
          classList.push(this.themeGroup)

        if (_.isArray(this.themes) || t) {
          _.map( _.intersection(self.themes, themeList), function(t){
            classList.push( self.themeGroup
              ? self.themeGroup+"-"+t
              : t
          )})
        }

        if (_.isString(this.props.className) && (addClass || _.isUndefined(addClass)))
          classList.push(this.props.className)

        return classList.join(" ")
      },
    },
    PureRender: React.addons.PureRender,
    CSS: {
      /**
       * ####
       * This Mixin requires the following properties to be available:
       * this.color
       * this.css
       * ####
       * This Mixin relies on the following properties:
       * @ this.baseStyles
       * @ this.themeStyles
       * @ this.defBgColor
       * @ this.watchProps
       * @ this.watchStates
       * @ this.useUiKeys
       */
      componentWillMount(){
        this.style()
      },
      componentWillUpdate(np,ns){
        if (this.css.shouldCSSUpdate(np,ns))
          this.style(np,ns)
      },
      style(props,states) {
        if (typeof props==="undefined") props = this.props
        if (typeof states==="undefined") states = this.state

        let defBgColor = _.isFunction(this.defBgColor) ? this.defBgColor(props,states) : (this.defBgColor || "white")
        let colorKeys = this.useUiKeys ? ["uiBgColor","uiColor"] : ["bgColor","color"]

        let msg = props && props.message
        this.color =
          (this.css && this.css.getBasicStyles( props[colorKeys[0]], defBgColor, props[colorKeys[1]], msg))
          || h.getBasicStyles( props[colorKeys[0]], defBgColor, props[colorKeys[1]])

        let args = {
          styles: _.isFunction(this.baseStyles) ? this.baseStyles(props,states) : (typeof this.baseStyles==="object" ? this.baseStyles : {}),
          themeStyles: _.isFunction(this.themeStyles) ? this.themeStyles(props,states) : (typeof this.themeStyles==="object" ? this.themeStyles : {}),
          css: this.color
        }

        if (!this.css) {
          if (this.watchProps) args.watchProps = this.watchProps
          if (this.watchStates) args.watchStates = this.watchStates
          this.css = new cssBuilder(props,args, msg)
        } else
          this.css.update(props,args)
      },
    }
  },
  extendTheme( themeObj, mixinObj ) {

    let themeFunc = function(obj, extendObj){
      if (typeof extendObj === "object") {
        let keys = Object.keys(obj)

        _.intersection(keys,Object.keys(extendObj)).map(function(k){
          if ((_.isObject(extendObj[k]) && _.isObject(obj[k])) || (_.isFunction(extendObj[k]) && _.isFunction(obj[k])))
            Object.assign(obj[k], extendObj[k])
          else
            console.warn("extendTheme() failed for property "+k+" because the variable type did not match.")
        })

        let omittedObj = _.omit( extendObj, keys)
        Object.assign( obj, omittedObj )
      }
    }

    if (themeObj) themeFunc(RC.Theme, themeObj)
    if (mixinObj) themeFunc(RC.cssMixins, mixinObj)
  },
}

RC.Theme = {
  color: {
    brand1: "#0082ec",
    brand2: "#ff7928",
    brand3: "#36d317",
    onBrand1: "#fff",
    onBrand2: "#fff",
    onBrand3: "#fff",

    navPrimary: "#fff",
    navSecondary: "#fff",
    onNavPrimary: "#ed1c24",
    onNavSecondary: "#ed1c24",

    white: "#fff",
    light: "#f3f3f3",
    fog: "#e7e7e7",
    gray: "#aaa",
    silver: "#999",
    dark: "#444",

    green: "#2e9b3d",
    red: "#ed3c3c",
    blue: "#0077aa",
    cyan: "#00978e",
    yellow: "#fff247",

    bodyBg: "#fff",
    backdrop: "rgba(0,0,0,.64)",

    text: "rgba(0,0,0,.84)",
    textLight: "rgba(0,0,0,.45)",
    textDim: "rgba(255,255,255,.5)",
    textOnLight: "#fff",

    link: "rgba(0,0,0,.84)",
    linkHover: "#0082ec",

    edges: "rgba(0,0,0,.15)",
    edgesDarker: "rgba(0,0,0,.2)",
    edgesLighter: "rgba(0,0,0,.1)",
  },

  font: {
    size: 15, lineHeight: 1.35,
    heavy: "Helvetica Neue, Roboto, sans-serif",
    bold: "Helvetica Neue, Roboto, sans-serif",
    regular: "Helvetica Neue, Roboto, sans-serif",
    light: "HelveticaNeue-Light, Helvetica Neue, Roboto-Light, Roboto, sans-serif-light, sans-serif",
    heavyWeight: "700",
    boldWeight: "500",
    regularWeight: "normal",
    lightWeight: "300",
  },

  fontAlt: {
    size: 15, lineHeight: 1.35,
    heavy: "Helvetica Neue, Roboto, sans-serif",
    bold: "Helvetica Neue, Roboto, sans-serif",
    regular: "Helvetica Neue, Roboto, sans-serif",
    light: "HelveticaNeue-Light, Helvetica Neue, Roboto-Light, Roboto, sans-serif-light, sans-serif",
    heavyWeight: "700",
    boldWeight: "500",
    regularWeight: "normal",
    lightWeight: "300",
  },

  size: {
    padding: "4%",
    paddingPx: 15,
  },

  // $width_desktop_wide: 1350px;
  // $width_desktop: 1100px;
  // $width_mobile: 900px;
  // $width_phone: 550px;
  // $width_phone_small: 375px;
  // $width_nav: 230px;
  // $height_nav: 50px;
}

RC.Theme.color.heading = RC.Theme.color.brand1

RC.Theme.color.brand1Darker = tinycolor(RC.Theme.color.brand1).darken(7).toHexString()
RC.Theme.color.brand2Darker = tinycolor(RC.Theme.color.brand2).darken(7).toHexString()
RC.Theme.color.brand3Darker = tinycolor(RC.Theme.color.brand3).darken(7).toHexString()

RC.Theme.color.brand1Light = tinycolor(RC.Theme.color.brand1).lighten(47).toHexString()
RC.Theme.color.brand2Light = tinycolor(RC.Theme.color.brand2).lighten(47).toHexString()
RC.Theme.color.brand3Light = tinycolor(RC.Theme.color.brand3).lighten(47).toHexString()

/**
 * @@@@
 * Common CSS attributes (aka CSS classes)
 * @@@@
 */

RC.cssMixins = {
  main() {
    return {
      padding: 0, margin: 0,
      fontSize: RC.Theme.font.size, lineHeight: RC.Theme.font.lineHeight, color: RC.Theme.color.text,
      fontFamily: RC.Theme.font.regular,
      fontWeight: RC.Theme.font.regularWeight,
    }
  },
  // Item Template
  item(){
    return {
      display: "block", position: "relative", zIndex: 2,
      margin: -1,
      paddingTop: RC.Theme.size.paddingPx, paddingLeft: RC.Theme.size.paddingPx, paddingBottom: RC.Theme.size.paddingPx, paddingRight: RC.Theme.size.paddingPx,
    }
  },
  // Strip default webkit values -- useful for invisible form elements
  clean() {
    return {
      display: "block", padding: 0, margin: 0,
      fontFamily: RC.Theme.font.regular, fontWeight: RC.Theme.font.regularWeight,
      fontSize: RC.Theme.font.size, color: RC.Theme.color.text,
      WebkitFontSmoothing: "antialiased", // This needs to be re-applied for form elements
      border: "none",
    }
  },
  // Vertical Align Template
  verticalAlignOuter: {
    display: "table", width: "100%", height: "100%", verticalAlign: "middle"
  },
  verticalAlignInner: {
    display: "table-cell", verticalAlign: "middle", overflowX: "hidden"
  },
  // Full Height Template
  fullHeight() {
    return {
      minHeight: "calc(100vh - "+RC.Theme.size.headerNavHeight+"px)"
    }
  },
  // Button Template
  button: {
    position: "relative", cursor: "pointer", verticalAlign: "top",
    display: "inline-block", textOverflow: "ellipsis",
    fontSize: "16px", lineHeight: "42px",
    margin: 0, padding: "0 12px",
    minWidth: "52px", minHeight: "47px",
    borderStyle: "solid", borderWidth: "1px", borderColor: "rgba(0,0,0,.15)",
    borderRadius: "2px",
  },
  // Avatar Template
  avatar: {
    width: 42, height: 42,
    backgroundSize: "cover", backgroundPosition: "50%",
    borderRadius: "50%"
  },
  // Headings Template
  font(weight) {
    let allowed = ["heavy","bold","regular","light"]
    if (!_.contains(allowed,weight)) {
      console.warn("Font style \""+weight+"\" was not valid.")
      return {}
    }
    return {
      fontFamily: RC.Theme.font[weight], fontWeight: RC.Theme.font[weight+"Weight"]
    }
  },
  // Headings Template
  fontAlt(weight) {
    let allowed = ["heavy","bold","regular","light"]
    if (!_.contains(allowed,weight)) {
      console.warn("Font style \""+weight+"\" was not valid.")
      return {}
    }
    return {
      fontFamily: RC.Theme.fontAlt[weight], fontWeight: RC.Theme.fontAlt[weight+"Weight"]
    }
  },
  // Ellipsis Template
  ellipsis: {
    display: "block", textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap",
  },
  // Absolute Full
  absFull: {
    position: "absolute", top: 0, left: 0, right: 0, bottom: 0
  },
  fixedFull: {
    position: "fixed", top: 0, left: 0, right: 0, bottom: 0
  },
  absCenter(ht) {
    return {
      position: "absolute", left: 0, right: 0, top: "50%", bottom: "auto",
      height: ht, margin: (ht/-2)+"px 0 0"
    }
  }
}
