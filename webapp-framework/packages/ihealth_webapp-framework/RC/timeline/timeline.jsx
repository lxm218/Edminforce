
RC.Timeline = React.createClass({
  getTheme(name){
    let theme = _.contains(["regular","dark","dark small","small","double"], name)
      ? name : "regular"
    return theme+" "+(this.props.className || "")
  },
  render() {

    let defaultFormat = this.props.dateFormat || "MMM Do, YYYY"
    let count = 0

    return <ul className={"timeline-list "+this.getTheme(this.props.theme)} id={this.props.id}>
      {
      this.props.list.map(function(item,n){

        var odd_or_even = "" // This is used for className, don't set it to null
        var itemLabel = null
        var itemRender = null

        let brand = ["bg-brand","bg-brand2","bg-brand3"]
        let brandClass = _.isNumber(item.brand) && brand[item.brand] ? brand[item.brand] : ""
        let uiIcon = <figure className={"round "+brandClass}>
          {
          item.type=="title"
            ? <RC.uiIcon uiClass={item.uiClass} uiSize={item.uiSize || 0} theme="tiny"/>
            : null
          }
        </figure>

        switch(item.type){
          case "title":
            itemRender = <h4 className="title sub">
              {framework.getDateFromProps(item.label, item.dateFormat, defaultFormat)}
            </h4>
          break
          case "list-item":
          default:
            odd_or_even = count++%2 ? " even" : " odd"
            itemLabel = <strong className="block label">
              {_.isDate(item.title) ? framework.getDateFromProps(item.title, item.dateFormat, defaultFormat) : item.title}
            </strong>
            item.type = "listItem"
            itemRender = item.href ? <a className="block" href={item.href}>{item.text}</a> : item.text
        }

        return <li className={"type-"+item.type+odd_or_even} key={n}>
          <div className="inner">
            {uiIcon}
            {itemLabel}
            {itemRender}
          </div>
        </li>
      })
      }
    </ul>
  },
})
