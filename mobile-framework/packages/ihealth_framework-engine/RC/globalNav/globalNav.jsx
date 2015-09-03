
let themes = ["regular", "opacity", "flat"]
RC.GlobalNav = React.createClass({
  mixins: [RC.Mixins.Theme],
  themeGroup: "",
  themes: themes,

  propTypes: {
    id: React.PropTypes.string,
    className: React.PropTypes.string,
    theme: React.PropTypes.string,

    animate: React.PropTypes.bool,
    isVisible: React.PropTypes.bool,
    allowLongLabels: React.PropTypes.bool,
    list: React.PropTypes.array,
  },

  getInitialState(){
    return {
      selected: null,
    }
  },
  clickHandler(n, onClick){
    if (_.isUndefined(this.props.enableClick) || this.props.enableClick)
      this.setState({selected: n})

    if (_.isFunction(onClick))
      onClick()
  },
  render() {
    if (!_.isArray(this.props.list) || !this.props.list.length) return null

    let self = this
    let curState = this.state.selected
    let curPath = FlowRouter.current().path

    _.every(this.props.list, function(link){
      let test = link.href==curPath
      if (test)
        curState = null
      return !test
    })

    let location = _.contains(["auto","top","bottom"], this.props.location) ? this.props.location : "auto"
    let isTop = location=="top" || (location=="auto" && h.getPlatform("android")) // This will match Web too

    var classList = [
      "global-nav", "center", "list-length-"+Math.min(this.props.list.length, 5),
      isTop ? "gnav-top" : "gnav-bottom",
      this.props.animate ? "animate" : "",
      this.props.isVisible ? "isVisible" : "isHidden",
      this.props.allowLongLabels ? "" : "even",
      this.getTheme(),
      this.props.className || "",
    ]

    return <div className={"gnav-spacer "+(isTop && this.props.isVisible ? "on" : "off")}>
      <nav className={classList.join(" ")} id={this.props.id}>
      {
      this.props.list.map(function(item,n){

        let isCur = n==curState || item.href==curPath
        var itemClasses = ["transition","inline-block","cursor","menuItem"]

        if (isCur) itemClasses.push("cur")
        if (item.uiClass) itemClasses.push("with-icon")
        if (item.label) itemClasses.push("with-label")

        return <RC.URL {... _.omit(item,["className","onClick"])} className={itemClasses.join(" ")} onClick={self.clickHandler.bind(null, n, item.onClick)} key={n}>
          {item.uiClass ? <RC.uiIcon uiClass={isCur && item.uiClassCur ? item.uiClassCur : item.uiClass} uiColor={isCur && item.uiColorCur ? item.uiColorCur : item.uiColor} uiSize={item.uiSize} /> : null}
          {item.label ? <span className="fn-label ellipsis">{item.label}</span> : null}
        </RC.URL>
      })
      }
      </nav>
    </div>
  }
})

if (h.nk(Meteor.settings, "public.env")!="live")
  RC.GlobalNav.Help = {
    Type: "Unique/Canvas",
    Themes: themes,
    PropTypes: {
      animate: "Boolean",
      isVisible: "Boolean",
      allowLongLabels: "Boolean",
      list: "Array",
    },
    Description: "Automatic navigation based on the device type (IOS or Android). Top for Android and bottom for IOS."
  }
