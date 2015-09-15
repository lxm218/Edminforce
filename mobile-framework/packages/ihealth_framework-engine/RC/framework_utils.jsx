
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
    if (_.isString(c.type)) {
      return c
    } else if (c.type.displayName) {
      if (filter && filter!=c.type.displayName) {
        console.warn("Child was rejected because it did not pass the name filter ("+filter+").")
        return undefined
      } else
        return c
    }
  }), function(c){
    return !_.isUndefined(c)
  })
}

h.uiKeys = ["uiClass","uiSize","uiColor"]
h.uiKeysCircle = ["uiClass","uiSize","uiColor","uiBrand"]

/**
 * Deprecated
 * Do not use this Function
 */
h.omitProps = function(props, filterList) {
  if (!_.isArray(filterList) || !filterList.length)
    return props
  return _.omit( props, filterList)
}

/**
 * Deprecated
 * Do not use this Function
 */
h.pickProps = function(props, filterList) {
  if (!_.isArray(filterList) || !filterList.length)
    return props
  return _.pick( props, filterList)
}
