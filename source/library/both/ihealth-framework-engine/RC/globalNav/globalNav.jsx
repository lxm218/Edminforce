
RC.GlobalNav = React.createClass({
  mixins: [RC.Mixins.PureRender,RC.Mixins.CSS],
  displayName: "GlobalNav",
  propTypes: {
    id: React.PropTypes.string,

    theme: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.array,
    ]),

    isVisible: React.PropTypes.bool,
    startTab: React.PropTypes.number,
    list: React.PropTypes.array,
  },
  navLocationCheck(loc){
    let location = _.contains(["auto","top","bottom"], loc) ? loc : "auto"
    this.isTop = location=="top" || (location=="auto" && h.getPlatform("android")) // This will match Web too
  },
  componentWillMount(){
    this.navLocationCheck(this.props.location)
  },
  componentWillUpdate(np,ns){
    if (this.css.shouldCSSUpdate(np,ns))
      this.navLocationCheck(np.location)
  },
  getInitialState(){
    return {
      selected: _.isNumber(this.props.startTab) ? this.props.startTab : null,
    }
  },
  clickHandler(n, onClick){
    if (_.isUndefined(this.props.enableClick) || this.props.enableClick)
      this.setState({selected: n})

    if (_.isFunction(onClick))
      onClick()
  },
  render(){

    let self = this
    let styles = this.css.styles
    let curState = this.state.selected
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

          let isCur = n==curState || item.href==curPath
          let uiProps = {
            uiClass: isCur && item.uiClassCur ? item.uiClassCur : (item.uiClass || self.color.textColor),
            uiColor: isCur && item.uiColorCur ? item.uiColorCur : (item.uiColor || self.color.textColor),
            uiSize: item.uiSize || 15,
            theme: "inline-block",
            itemStyle: { margin: "0 0 3px" }
          }

          return <RC.URL {... _.omit(item,RC.uiKeys)} style={styles.item} onClick={self.clickHandler.bind(null, n, item.onClick)} key={n}>
            {item.uiClass ? <RC.uiIcon {... uiProps} /> : null}
            {item.label ? <span style={{display: "block"}}>{item.label}</span> : null}
          </RC.URL>
        })
        }
        </nav>
      </div>
    </div>
  },
  // @@@@
  // @@@@
  // Styles Start
  // @@@@
  // @@@@
  watchProps: ["location","isVisible","startTab"],
  watchStates: ["selected"],
  baseStyles(np,ns){

    let gnHeight = 50
    let speed = .2

    return {
      // Canvas Outer
      area: {
        transition: `all ${speed}s ease`,
        height: np.isVisible ? gnHeight : 0,
        position: "fixed", left: 0, right: 0, zIndex: 1000,
        boxShadow: `0 ${this.isTop ? 1 : -1}px rgba(0,0,0,.1)`,
        top: this.isTop ? RC.Theme.size.headerNavHeight : "auto", bottom: this.isTop ? "auto" : 0,
        overflow: "hidden",
      },
      areaInner: {
        display: "flex", width: "100%", height: gnHeight,
        padding: 7,
        backgroundColor: this.color.hex, color: this.color.textColor,
      },
      break: {
        transition: `all ${speed}s ease`,
        height: 0, paddingTop: this.isTop && np.isVisible ? gnHeight : 0,
      },
      item: {
        display: "block", width: "100%", position: "relative",
        padding: "3px 4px",
        textAlign: "center", fontSize: 11,
      }
    }
  }
})
