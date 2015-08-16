
framework = {
  getDateFromProps(date, format, defaultFormat) {
    if (!_.isDate(date)) return date

    let dateFormat = format || defaultFormat || "MM/DD/YY"

    if (_.isDate(date)) {
      date = moment(date)
      date = dateFormat=="ago" ? date.fromNow(true) : date.format(dateFormat)
    }

    return date
  }
}
