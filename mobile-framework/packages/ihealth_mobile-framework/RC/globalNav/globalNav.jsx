
RC.GlobalNav = React.createClass({
  getInitialState(){
    return {
      selected: null,
    }
  },
  getTheme(name){
    let enableClick = _.isUndefined(this.props.enableClick) ? true : this.props.enableClick
    let theme = _.contains(["regular","opacity","flat"], name)
      ? name : "regular"
    return theme
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

    let location = _.contains(["auto","top","bottom"], this.props.location) ? this.props.location : "auto"
    let isTop = location=="top" || (location=="auto" && !h.getPlatform("android")) // This will match Web too

    var classList = [
      "global-nav", "center", "list-length-"+Math.min(this.props.list.length, 5),
      isTop ? "gnav-top" : "gnav-bottom",
      this.props.animate ? "animate" : "",
      this.props.isVisible ? "isVisible" : "isHidden",
      this.props.allowLongLabels ? "" : "even",
      this.getTheme(this.props.theme),
      this.props.className || "",
    ]

    return <div className={"gnav-spacer "+(isTop && this.props.isVisible ? "on" : "off")}>
      <nav className={classList.join(" ")} id={this.props.id}>
      {
      this.props.list.map(function(item,n){

        var itemClasses = ["transition","inline-block","cursor","item"]
        if (n==curState || item.href==curPath) itemClasses.push("cur")
        if (item.uiClass) itemClasses.push("with-icon")
        if (item.label) itemClasses.push("with-label")

        return <p className={itemClasses.join(" ")} onClick={self.clickHandler.bind(null, n, item.onClick)} key={n}>
          <a href={item.href}>
          {item.uiClass ? <RC.uiIcon uiClass={item.uiClass} uiColor={item.uiColor} uiSize={item.uiSize} /> : null}
          {item.label ? <span className="fn-label ellipsis">{item.label}</span> : null}
          </a>
        </p>
      })
      }
      </nav>
    </div>
  }
})
