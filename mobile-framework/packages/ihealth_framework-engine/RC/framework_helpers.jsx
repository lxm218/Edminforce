
fw = {
  getDateFromProps(date, format, defaultFormat) {
    if (!_.isDate(date)) return date

    let dateFormat = format || defaultFormat || "MM/DD/YY"

    if (_.isDate(date)) {
      date = moment(date)
      date = dateFormat=="ago" ? date.fromNow(true) : date.format(dateFormat)
    }

    return date
  },
  uniformChildren(unfilteredChildren, filter) {
    if (!unfilteredChildren) return []
    let children = !unfilteredChildren.map ? [unfilteredChildren] : unfilteredChildren

    children = children.map( function(c) {
      if (c.type!="div" && _.isString(c))
        c = <div>{c}</div>
      return c
    })

    return _.filter(children.map( function(c,n){
      // if (_.isString(c.type=="div") {
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
  },
  uiKeys: ["uiClass","uiSize","uiColor"],
  uiKeysCircle: ["uiClass","uiSize","uiColor","uiBrand"],
  omitProps(props, filterList) {
    if (!_.isArray(filterList) || !filterList.length)
      return props
    return _.omit( props, filterList)
  },
  pickProps(props, filterList) {
    if (!_.isArray(filterList) || !filterList.length)
      return props
    return _.pick( props, filterList)
  }
}
