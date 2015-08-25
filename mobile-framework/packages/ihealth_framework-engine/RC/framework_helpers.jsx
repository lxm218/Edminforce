
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
  filterChildren(unfilteredChildren) {
    if (!unfilteredChildren) return []
    let children = !unfilteredChildren.map ? [unfilteredChildren] : unfilteredChildren

    children = children.map( function(c) {
      if (c.type!="div" && _.isString(c))
        c = <div>{c}</div>
      return c
    })

    return _.filter(children.map( function(c,n){
      if (c.type=="div") {
        return c
      } else if (c.type!="div") {
        console.warn("Child was rejected because it was not a <div>.")
        return undefined
      }
    }), function(c){
      return !_.isUndefined(c)
    })
  },
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
