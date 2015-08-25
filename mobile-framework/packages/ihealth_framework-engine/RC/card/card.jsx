
/*
 * Note
 * Tabs theme is special. It has its own custom handler.
 */
let childThemes = ["ellipsis","text-wrap","body","divider","avatar","image","tabs","list"]

RC.Card = React.createClass({
  propTypes: {
    title: React.PropTypes.string,
    subtitle: React.PropTypes.string,
    avatar: React.PropTypes.string,
    uiClass: React.PropTypes.string,

    theme: React.PropTypes.string,
    id: React.PropTypes.string,
    className: React.PropTypes.string,
    style: React.PropTypes.object,
  },
  // getTheme(name){
  //   let theme = _.contains(["regular","side","invisible"], name)
  //     ? name : "regular"
  //   return theme+" "+(this.props.className || "")
  // },
  getChildTheme(child){
    var classList = ["item"]

    if (_.contains(childThemes, child.props.theme))
      classList.push("item-"+child.props.theme)

    if (_.isString(child.props.className))
      classList.push(child.props.className)

    return classList.join(" ")
  },
  render(){
    // Prep
    let self = this
    let keys = _.keys(this.props)

    // Defaults
    var header = null
    if (_.intersection(keys, ["title","subtitle","avatar","uiClass"]).length) {
      let uiKeys = ["uiClass","uiSize","uiBrand","uiColor"]
      if (this.props.avatar) {
        var avatar = <img src={this.props.avatar} />
      } else if (_.intersection(keys, uiKeys).length) {
        let uiProps = fw.pickProps(this.props, uiKeys)
        var avatar = <RC.uiIcon {...uiProps} />
      }
      header = <div className={"item "+(this.props.avatar || this.props.uiClass ? "item-avatar" : "")}>
        {avatar}
        {this.props.title ? <h2>{this.props.title}</h2> : null}
        {this.props.subtitle ? <p>{this.props.subtitle}</p> : null}
      </div>
    }

    let children = fw.filterChildren(this.props.children)
    if (!children.length && !header) return null

    return <div className="card">
      {header}
      {
      children.map( function(c,n){
        if (_.contains(["tabs","list"], c.props.theme)) {
          let list = _.isArray(c.props.list) ? c.props.list : []
          let uiKeys = ["uiClass","uiSize","uiColor"]
          let iconAlign = _.contains(["left","right"], c.props.iconAlign) ? c.props.iconAlign : "left"

          if (c.props.theme=="tabs") {
            // @@@@@
            // Tabs @@
            return <div className={"item tabs tabs-icon-"+iconAlign} key={n}>
              {list.map( function(t,nn){
                let aProps = fw.omitProps(t, uiKeys)
                var ui = null

                if (_.intersection(_.keys(t), uiKeys).length) {
                  if (_.isUndefined(t.uiSize)) t.uiSize = "1.75em"
                  let uiProps = fw.pickProps(t, uiKeys)
                  ui = <RC.uiIcon {...uiProps} />
                }

                return <RC.URL {...aProps} className="tab-item" key={nn}>
                  {ui && iconAlign=="left" ? ui : null}
                  {t.label}
                  {ui && iconAlign=="right" ? ui : null}
                </RC.URL>
              })}
              </div>
            } else {
              // @@@@@
              // List   @@
              return <div key={n}>
                {list.map( function(t,nn){
                  let aProps = fw.omitProps(t, uiKeys)
                  var ui = null

                  if (_.intersection(_.keys(t), uiKeys).length) {
                    if (_.isUndefined(t.uiSize)) t.uiSize = "1.75em"
                    let uiProps = fw.pickProps(t, uiKeys)
                    ui = <RC.uiIcon {...uiProps} />
                  }

                  return <RC.URL {...aProps} className={"item item-icon-"+iconAlign} key={nn}>
                    {ui}
                    {t.label}
                  </RC.URL>
                })}
              </div>
            }
        } else
          return <div {...c.props} className={self.getChildTheme(c)} key={n}>
            {c.props.children}
          </div>
      })
      }
    </div>
  },
})

if (h.nk(Meteor.settings, "public.dev"))
  RC.Card.Help = {
    Main_Themes: null,
    Child_Themes: childThemes,
    Description: "Use this component to create cards, lists and various text/media content. Wrap text in <P> tag to make the text smaller. Children only accepts id, className and theme."
  }
