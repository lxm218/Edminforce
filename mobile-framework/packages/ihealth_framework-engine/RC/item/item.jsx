
let themes = ["icon-left item-text-wrap","text-wrap","body","divider","avatar","image","tabs","icon-left", "icon-right","thumbnail-left","thumbnail-right"]
RC.Item = React.createClass({
  mixins: [RC.Mixins.Theme],
  themeGroup: "item",
  themes: themes,

  propTypes: {
    uiClass: React.PropTypes.string,
    uiColor: React.PropTypes.string,
    uiBrand: React.PropTypes.number,
    // uiSize: IS FLEXIBLE

    avatar: React.PropTypes.string,
    title: React.PropTypes.string,
    subtitle: React.PropTypes.string,
    iconAlign: React.PropTypes.string,
    note: React.PropTypes.string,

    theme: React.PropTypes.string,
    id: React.PropTypes.string,
    className: React.PropTypes.string,
    style: React.PropTypes.object,
  },
  render(){

    let self = this
    let uiKeys = ["uiClass","uiSize","uiColor"]
    let themeList = h.strToArray(this.props.theme)

    if (_.contains(themeList, "tabs")) {
      let list = _.isArray(this.props.list) ? this.props.list : []
      let iconAlign = _.contains(["left","right"], this.props.iconAlign) ? this.props.iconAlign : "left"

      // @@@@@
      // Tabs @@
      return <div className={"item tabs tabs-icon-"+iconAlign}>
        {list.map( function(t,n){
          let aProps = fw.omitProps(t, uiKeys)
          var ui = null

          if (_.intersection(_.keys(t), uiKeys).length) {
            if (_.isUndefined(t.uiSize)) t.uiSize = "1.75em"
            let uiProps = _.pick(t, uiKeys)
            ui = <RC.uiIcon {...uiProps} />
          }

          return <RC.URL {...aProps} className="tab-item" key={n}>
            {ui && iconAlign=="left" ? ui : null}
            {t.label}
            {ui && iconAlign=="right" ? ui : null}
          </RC.URL>
        })}
        </div>
    }

    // @@@@@
    // Default @
    var avatar = []
    var title = null
    var subtitle = null
    var custTheme = null

    let keys = _.keys(this.props)
    let uiKeysAvatar = ["uiClass","uiSize","uiBrand","uiColor"]

    let aProps = _.omit(this.props, uiKeys.concat(["label","uiBrand"]))

    if (_.intersection(["avatar","icon-left","icon-right","thumbnail-left","thumbnail-right"], themeList).length) {

      if (_.intersection(["avatar","thumbnail-left","thumbnail-right"], themeList).length) {
        // @@@@@
        // Avatar & Thumbnail
        // @@@@@
        if (_.intersection(keys, ["title","subtitle","avatar","uiClass"]).length) {
          if (this.props.avatar) {
            avatar.push(<img src={this.props.avatar} />)
            if (this.props.uiClass) {
              custTheme = this.props.theme+" icon-right"
              avatar.push(<RC.uiIcon {... fw.pickProps(this.props, uiKeys)} />)
            }
          } else if (this.props.uiClass) {
            var uiProps = fw.pickProps(this.props, uiKeys.concat("uiBrand"))
            if (_.isUndefined(uiProps.uiBrand))
              uiProps.uiBrand = 0
            avatar.push(<RC.uiIcon {... uiProps} />)
          }

          if (this.props.title) title = <h2>{this.props.title}</h2>
          if (this.props.subtitle) subtitle = <p>{this.props.subtitle}</p>
        }
      } else {
        // @@@@@
        // Icon Left, Right or Both
        // @@@@@
        if (_.intersection(_.keys(this.props), uiKeys).length) {
          uiKeys.push("tagName")
          let uiLoop = _.object( uiKeys, _.map( uiKeys, function(u){
            if (_.isString(self.props[u]))
              return self.props[u].split(",")
            else
              return []
          }))

          _.map( uiLoop.uiClass, function(thisClass,n){
            avatar.push(<RC.uiIcon {... {
              uiClass: thisClass.trim(),
              uiSize: _.isUndefined(uiLoop.uiSize[n]) ? "1.75em" : uiLoop.uiSize[n],
              uiColor: uiLoop.uiColor[n] || "",
              tagName: uiLoop.tagName[n] || "div",
            }} />)
          })
        }

        title = this.props.label || ""
      }
    }

    if (avatar[1])
      var trail = avatar[1]
    else if (this.props.note)
      var trail = <span className="item-note">{this.props.note}</span>
    else
      var trail = null

    return <RC.URL {... aProps} tagName={aProps.tagName || "div"} className={this.getTheme(custTheme)}>
      {avatar[0]}
      {title || subtitle ? <div>{title}{subtitle}</div> : null}
      {this.props.children}
      {trail}
    </RC.URL>

  },
})

if (!h.nk(Meteor.settings, "public.dev"))
  RC.Item.Help = {
    Type: "Item",
    Themes: themes,
    PropTypes: {
      theme: "String",
      uiClass: "String",
      uiSize: "Flexible",
      uiColor: "String",

      avatar: "String (Used to auto-create Avatar Head Design)",
      title: "String (Used to auto-create Avatar Head Design)",
      subtitle: "String (Used to auto-create Avatar Head Design)",

      iconAlign: "String (Used for \"tabs\" theme only)",
      note: "String (Small text to the right)",
    },
    Description: "Use this component inside RC.Card or RC.List. This is a very versatile inner component with many themes and options.",
    Example: "http://localhost:3000/examples/Cards"
  }
