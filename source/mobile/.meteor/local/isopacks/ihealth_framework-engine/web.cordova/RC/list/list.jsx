/*
RC.List = React.createClass({
  getInitialState(){
    return {
      selected: null
    }
  },
  getTheme(name){
    let enableClick = _.isUndefined(this.props.enableClick) ? true : this.props.enableClick
    let theme = _.contains(["regular","nav-list","nav-list dark"], name)
      ? name : "regular"
    return theme+" "+(this.props.className || "")+(enableClick ? " click-enabled" : "")
  },
  setSelectedState(n){
    if (_.isUndefined(this.props.enableClick) || this.props.enableClick)
      this.setState({selected: n})
  },
  render() {

    if (!_.isArray(this.props.list) || !this.props.list.length) return null

    let self = this
    let curState = this.state.selected
    let enableClick = this.props.enableClick || true

    return <ul className={"rc-list "+this.getTheme(this.props.theme)}>
      {
      this.props.list.map(function(item,n){

        let itemTitle = null
        let itemSubtitle = null

        let cur = null
        let avatar = null
        let sub = null

        let date = fw.getDateFromProps(item.date, item.dateFormat)

        switch(item.type){
          case "title":
            cur = "type-listTitle sub "+(item.className || "")
            itemTitle = item.label
          break
          default:
            cur = "transition listItem"+(item.avatar || item.uiClass ? " with-icon " : " ")+(n==curState ? "cur " : "")+(item.onClick || item.href || enableClick ? "cursor " : "")+(item.className || "")
            avatar = <RC.Avatar src={item.avatar} theme="regular" uiClass={item.uiClass} uiSize={item.uiSize>=0 ? item.uiSize : 1} uiColor={item.uiColor || "white"} />

            let itemTitle = item.title ? <h4 className="textTitle ellipsis">{item.title}</h4> : null
            let itemSubtitle = item.subtitle || item.label
              ? <p className="subtitle smaller ellipsis">{item.label ? <strong className="label inline-block">{item.label}</strong> : null}{item.subtitle}</p>
              : null

            sub = item.date ? <strong className="date sub">{date}</strong> : null
        }

        return <li className={cur} key={n} onClick={item.onClick}>
          {
            item.href
            ? <a href={item.href} onClick={self.setSelectedState.bind(null, n)}>{sub}{avatar}{itemTitle}{itemSubtitle}</a>
            : <span onClick={self.setSelectedState.bind(null, n)}>{sub}{avatar}{itemTitle}{itemSubtitle}</span>
          }
        </li>
      })
      }
    </ul>
  }
})
*/
// @@@@@@@
// @@@@@@@
// @@@@@@@
// @@@@@@@
// @@@@@@@
// @@@@@@@
// @@@@@@@
// @@@@@@@
// @@@@@@@
// @@@@@@@
// @@@@@@@
// @@@@@@@
// @@@@@@@
// @@@@@@@
// @@@@@@@
// @@@@@@@

let themes = ["inset"]

RC.List = React.createClass({
  mixins: [RC.Mixins.Theme],
  themeGroup: "list",
  themes: themes,
  propTypes: {
    list: React.PropTypes.array,

    theme: React.PropTypes.string,
    id: React.PropTypes.string,
    className: React.PropTypes.string,
    style: React.PropTypes.object,
  },
  getInitialState(){
    return {
      selected: null
    }
  },
  setSelectedState(n){
    if (_.isUndefined(this.props.enableClick) || this.props.enableClick)
      this.setState({selected: n})
  },
  render() {

    let list = !_.isArray(this.props.list) || !this.props.list.length
      ? [] : this.props.list
    let self = this
    let curState = this.state.selected
    let enableClick = this.props.enableClick || true

    return <ul className={this.getTheme()}>
      {
      list.map(function(item,n){
        let listProps = _.omit(item, ["value"])
        return <RC.Item {... listProps} tagName={listProps.tagName || "li"} key={n}>
          {item.value}
        </RC.Item>
      })
      }
      {this.props.children}
    </ul>
  }
})

if (h.nk(Meteor.settings, "public.env")!="live")
  RC.List.Help = {
    Type: "Canvas",
    Themes: themes,
    PropTypes: {
      list: "Array"
    },
    Description: "Similar to RC.Card, this is another flexible canvas component.",
    Example: "/List/Index"
  }


/*
        return <li className={cur} key={n} onClick={item.onClick}>
          {
            item.href
            ? <a href={item.href} onClick={self.setSelectedState.bind(null, n)}>{sub}{avatar}{itemTitle}{itemSubtitle}</a>
            : <span onClick={self.setSelectedState.bind(null, n)}>{sub}{avatar}{itemTitle}{itemSubtitle}</span>
          }
        </li>
*/
