
RC.NavList = React.createClass({
  getTheme(name){
    let theme = _.contains(["regular","dark"], name)
      ? name : "regular"
    return theme+" "+(this.props.className || "")
  },
  render() {

    let self = this
    let curPath = FlowRouter.current().path
    let showCurrent = _.isUndefined(this.props.showCurrent) ? true : this.props.showCurrent
    if (!_.isArray(this.props.list) || !this.props.list.length) return null

    return <ul className={"unselect nav-list alt "+this.getTheme(this.props.theme)}>
      {
      this.props.list.map(function(item,n){

        let itemRender = null
        let cur = null
        let uiIcon = null

        switch(item.type){
          case "title":
            itemRender = <h4 className="type-listTitle sub">{item.text}</h4>
          break
          default:
            cur = "transition link"+(item.uiClass ? " with-icon" : "")+(showCurrent && item.href==curPath ? " cur" : "")
            uiIcon = <RC.uiIcon uiClass={item.uiClass} uiSize={0} />
            itemRender = item.href
              ? <a href={item.href} className="block cursor">{item.text}</a>
              : <span onClick={item.onClick} className="block cursor">{item.text}</span>
        }

        return <li className={cur} key={n}>{uiIcon}{itemRender}</li>
      })
      }
    </ul>
  },
})
