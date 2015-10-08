
if (!h) h = {}

h.isURL = function(props){
  return _.intersection(Object.keys(props), ["onClick","onTouchTap","onTouch","href"]).length
}

h.getDateFromProps = function(date, format, defaultFormat) {
  if (!_.isDate(date)) return date

  let dateFormat = format || defaultFormat || "MM/DD/YY"

  if (_.isDate(date)) {
    date = moment(date)
    date = dateFormat=="ago" ? date.fromNow(true) : date.format(dateFormat)
  }

  return date
}

h.uniformChildren = function(unfilteredChildren, filter) {
  if (!unfilteredChildren) return []
  let children = !unfilteredChildren.map ? [unfilteredChildren] : unfilteredChildren

  children = children.map( function(c) {
    if (_.isString(c))
      return <div>{c}</div>
    return c
  })

  return _.filter(children.map( function(c,n){
    if (_.isObject(c)) {
      if (_.isString(c.type)) {
        return c
      } else if (c.type.displayName) {
        if (filter && filter!=c.type.displayName) {
          console.warn("Child was rejected because it did not pass the name filter ("+filter+").")
          return undefined
        }
      }
      return c
    }
  }), function(c){
    return !_.isUndefined(c)
  })
}

/**
 * Take the necessary props and split it into an array
 */
h.splitProps = function(props, allowedKeys, requiredKey, maxLen) {
  var pickedProps = _.pick(props, allowedKeys)
  if (!pickedProps.uiClass) return []

  let propKeys = _.keys(pickedProps)

  // Map the classes
  _.map( propKeys, function(ui){
    pickedProps[ui] = _.filter( _.map( String(pickedProps[ui]).split(","), function(u){
      return u.trim()
    }), function(u){
      return u.length
    }).slice(0,maxLen)
  })

  let loopLength = pickedProps[requiredKey].length

  var uiMap = []
  for (i=0 ; i < loopLength ; i++) {
    uiMap.push(_.object(_.map(propKeys, function(key){
      return [key, (pickedProps[key][i] || _.last(pickedProps[key]))]
    })))
  }

  return uiMap
}

/**
 * Get Basic attributes from Color
 */
h.getBasicStyles = function(val, def, textVal) {
  let bg = h.getRealColor(val, def, RC.Theme.color.light)
  let isDark = bg.color.darken(5).isDark()
  let text = h.getRealColor(textVal, "on"+h.capitalize(String(val)), isDark ? RC.Theme.color.textOnLight : RC.Theme.color.text)

  return {
    hex: bg.hex,
    realHex: val ? bg.hex : "transparent",
    isDark: isDark,
    isLight: !isDark,
    textColor: text.hex,
  }
}
h.getRealColor = function(cVal, dVal, fVal, returnHexOnly) {
  var color, hex
  if (!RC.Theme.color[cVal]) {
    color = new tinycolor(cVal)

    if (!color.isValid()) {
      hex = RC.Theme.color[dVal] || fVal
      if (!returnHexOnly){ color = new tinycolor(hex) }
    } else
      hex = cVal
  } else {
    hex = RC.Theme.color[cVal]
    if (!returnHexOnly){ color = new tinycolor(hex) }
  }
  return returnHexOnly ? hex: { hex: hex, color: color }
}

/**
 * Support First/Last and Nth child styling and clicked styling
 */
h.jsToCss = function(css, n, length, state) {
  // TODO
  // Add support for Nth child

  let supportedPseudos = [":firstChild", ":lastChild", ":clicked", ":afterClicked"]
  let states = _.isArray(state) ? state : [state]
  var find = _.filter(states, function(val){
    return _.contains(supportedPseudos, val)
  })

  if (n++===0)
    find.push(":firstChild")
  if (n===length)
    find.push(":lastChild")

  var styles = _.omit(css, supportedPseudos)
  let pseudos = _.pick(css, _.uniq(find))

  _.map( _.keys(pseudos), function(key){
    _.extend( styles, pseudos[key])
  })

  return styles
  // return _.omit(css, _.difference( supportedPseudos, _.uniq(find) ))
}

/**
 * Extend theme styles and return
 */
h.getTheme = function(args) {
  let styles = args.styles
  styles.themes = _.isArray(args.themeName) ? args.themeName : [args.themeName]

  let extendTheme = function(name){
    let theme = args.themes ? args.themes[name] : false

    if (theme)
      _.map(_.keys(theme),function(t){
        if (styles[t])
          _.extend( styles[t], theme[t] )
        else
          styles[t] = theme[t]
      })
  }

  _.map(styles.themes, function(name){
    extendTheme(name)
  })

  if (args.css)
    _.extend( styles, args.css )

  // @@@@
  // TODO
  // Convert this to use this.prop
  if (args.stylesProp && styles.canvas)
    _.extend( styles.canvas, args.stylesProp)

  if (args.itemStylesProp && styles.item)
    _.extend( styles.item, args.itemStylesProp)

  if (args.innerStylesProp && styles.canvasInner)
    _.extend( styles.canvasInner, args.innerStylesProp)

  return styles
}

/**
 * Check if the children prop is a String
 */
h.checkIfString = function(children) {
  if (_.isString(children)) return true
  return _.every(children, function(c){
    return _.isString(c) || (_.isObject(c) &&
      (
      _.contains(["span","i","em","strong","b"], c.type)
      || _.contains(["uiIcon"], h.nk(c, "type.displayName"))
      ))
  })
}
