
cssBuilder = function (props,args) {
  // Update on Init
  this.args = {
    bgColor: props.bgColor,
    color: props.color,
  }
  this.basicStyles = args.css
  this.themeStyles = this.styles = {}
  this.themeNames = []

  // Prepare SCU
  let self = this
  this.allowedProps = this.propStyles = Object.keys(args.styles).map(function(k){ return k+"Style" })
  this.allowedProps = this.allowedProps.concat(["style","theme","color","bgColor","uiClass","uiColor","uiBgColor","uiSize"])
  this.propStyles = this.propStyles.concat("style")

  if (args.watchProps)
    this.allowedProps = this.allowedProps.concat(args.watchProps)

  if (args.watchStates)
    this.allowedStates = args.watchStates

  // Define SCU
  this.shouldCSSUpdate = function(p,s){
    let lastStates = self.lastStates || {}
    let lastProps = self.lastProps || {}
    let pickedProps = p ? _.pick(p, self.allowedProps) : {}
    let pickedStates = s ? _.pick(s, self.allowedStates) : {}

    var test = !_.isEqual(lastStates, pickedStates) || !_.isEqual(lastProps, pickedProps)

    if (test) {
      self.lastProps = pickedProps
      self.lastStates = pickedStates
    }
    return test
  }

  this.update(props,args)
}

cssBuilder.prototype = {
  /**
   * Extend Theme
   */
  extendTheme(name) {
    let theme = this.themeStyles[name]
    let self = this

    if (theme)
      Object.keys(theme).map( function(t){
        if (self.styles[t])
          Object.assign( self.styles[t], theme[t] )
        else
          self.styles[t] = theme[t]
      })
  },
  getBasicStyles(bgVal, bgDef, textVal) {
    if (!this.args.bgDefault)
      this.args.bgDefault = bgDef

    if (bgVal!=this.args.bgColor || textVal!=this.args.color || bgDef!=this.args.bgDefault) {
      this.basicStyles = h.getBasicStyles(bgVal,bgDef,textVal)
      this.args.bgColor = bgVal
      this.args.color = textVal
      this.args.bgDefault = bgDef
    }
    return this.basicStyles
  },
  /**
   * Update()
   * args, props
   * @styles : Object : Base Styles
   * @themeStyles : Object : Theme Styles
   * @css : Object : BG/Color Hex data and more
   */
  update(props,args) {

    let self = this
    var reCompute = false

    // Check Base Styles
    if (args.styles && !_.isEqual(args.styles,this.args.styles)) {
      this.args.styles = args.styles
      // this.styles = autoprefix(args.styles)
      this.styles = args.styles
      reCompute = true
    }
    // Check Theme Styles
    if (args.themeStyles && !_.isEqual(args.themeStyles,this.args.themeStyles)) {
      this.args.themeStyles = args.themeStyles
      // this.themeStyles = autoprefix(args.themeStyles)
      this.themeStyles = args.themeStyles
      reCompute = true
    }
    // Check Chosen Themes
    if (props.theme && props.theme!=this.args.themeNames) {
      this.args.themeNames = props.theme || []
      this.themeNames = (_.isArray(props.theme) ? props.theme : [props.theme]) || []
      reCompute = true
    }

    if (this.themeNames && reCompute)
      this.themeNames.map( function(name){
        self.extendTheme(name)
      })

    this.propStyles.map( function(key){
      if (_.isObject(props[key])) {
        let realKey = key=="style"
          ? (self.styles.hasOwnProperty("canvas") ? "canvas" : "item")
          : key.substr(0,key.length-5)

        if (self.styles[realKey])
          Object.assign(self.styles[realKey], props[key])
          // Object.assign(self.styles[realKey], autoprefix(props[key]))
      }
    })
    this.styles = autoprefix(this.styles)
  },
}
