"use strict"

RC.GlobalNav = class extends RC.CSS {
  constructor(p) {
    super(p)
    this.watchProps = ["location","isVisible","startTab"]
    this.watchStates = ["selected"]

    const location = _.contains(["auto","top","bottom"], p.location) ? p.location : "auto"
    this.state = {
      obj: Immutable.Map({
        selected: _.isNumber(this.props.startTab) ? this.props.startTab : null,
        isTop: location=="top" || (location=="auto" && h.getPlatform("android"))
      })
    }
  }

  checkNavLocation(loc){
    const location = _.contains(["auto","top","bottom"], loc) ? loc : "auto"
    return location=="top" || (location=="auto" && h.getPlatform("android")) // This will match Web too
  }

  componentWillReceiveProps(np){
    let newState = {};

    if (typeof np.selected !== "undefined" && np.selected !== this.props.selected)
      newState.selected = np.selected
    if (typeof np.location !== "undefined" && np.location !== this.props.location)
      newState.isTop = this.checkNavLocation(np.location)

    this.setStateObj(newState)
  }

  clickHandler(n, onClick){
    if (_.isUndefined(this.props.enableClick) || this.props.enableClick)
      this.setStateObj({selected: n})

    if (_.isFunction(onClick))
      onClick()
  }

  render(){
    let self = this
    let styles = this.css.get("styles")
    let curState = this.state.obj.get("selected")
    let curPath = FlowRouter.current().path

    _.every(this.props.list, function(link){
      let test = link.href==curPath
      if (test)
        curState = null
      return !test
    })

    return <div {... _.omit(this.props,["list"])} style={styles.break}>
      <div style={styles.area}>
        <nav style={styles.areaInner}>
        {
        (this.props.list || []).map(function(item,n){

          const isCur = n==curState || item.href==curPath
          const uiProps = {
            uiClass: isCur && item.uiClassCur ? item.uiClassCur : (item.uiClass || self.color.get("textColor")),
            uiColor: isCur && item.uiColorCur ? item.uiColorCur : (item.uiColor || self.color.get("textColor")),
            uiSize: item.uiSize || 15,
            theme: "inline-block",
            itemStyle: { margin: "0 0 3px" }
          }
          const props = Object.assign({}, item, uiProps)
          return <RC.URL {... props} style={styles.item} onClick={self.clickHandler.bind(self, n, item.onClick)} key={n}>
            {item.label ? <span style={{display: "block"}}>{item.label}</span> : null}
          </RC.URL>
        })
        }
        </nav>
      </div>
    </div>
  }

  baseStyles(np,ns){
    const gnHeight = 50
    const speed = .2
    const isTop = this.state.obj.get("isTop");
    return {
      // Canvas Outer
      area: {
        transition: `all ${speed}s ease`,
        height: np.isVisible ? gnHeight : 0,
        position: "fixed", left: 0, right: 0, zIndex: 1000,
        top: isTop ? RC.Theme.size.headerNavHeight() : "auto", bottom: isTop ? "auto" : 0,
        overflow: "hidden",
      },
      areaInner: {
        display: "flex", width: "100%", height: gnHeight,
        padding: 7,
        backgroundColor: this.color.get("hex"), color: this.color.get("textColor"),
      },
      break: {
        transition: `all ${speed}s ease`,
        height: 0, paddingTop: isTop && np.isVisible ? gnHeight : 0,
      },
      item: {
        display: "block", width: `${100/(np.list || []).length}%`, position: "relative",
        padding: "3px 4px",
        textAlign: "center", fontSize: 11,
      }
    }
  }
}

RC.GlobalNav.displayName = "RC.GlobalNav"
RC.GlobalNav.propTypes = Object.assign({}, RC.GlobalNav.propTypes, {
  location: React.PropTypes.string,
  isVisible: React.PropTypes.bool,
  startTab: React.PropTypes.number,
  list: React.PropTypes.array,
})
