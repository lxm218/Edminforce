
let themes = ["big","header","tabs"]
RC.Tabs = React.createClass({
  mixins: [RC.Mixins.Theme,RC.Mixins.IonicConvert],
  themeGroup: "bar",
  themes: themes,

  propTypes: {
    initialState: React.PropTypes.number,
    forceClicked: React.PropTypes.number,
    activateOnHold: React.PropTypes.bool,
    activateOnClick: React.PropTypes.bool,

    theme: React.PropTypes.string,
    id: React.PropTypes.string,
    className: React.PropTypes.string,
    style: React.PropTypes.object,
  },
  getInitialState(){
    return {
      hold: null,
      active: _.isNumber(this.props.initialState) ? this.props.initialState : null
    }
  },
  startHold(num, func){
    this.setState({ hold: num })
    if (_.isFunction(func))
      func()
  },
  stopHold(func){
    this.setState({ hold: null })
    if (_.isFunction(func))
      func()
  },
  setActive(num, func){
    this.setState({ active: num })
    if (_.isFunction(func))
      func()
  },
  render() {
    let self = this
    let children = h.uniformChildren(this.props.children, "URL")
    let allowHold = _.isUndefined(self.props.activateOnHold) || self.props.activateOnHold
    let allowClick = _.isUndefined(self.props.activateOnClick) || self.props.activateOnClick

    let bb = <nav className="button-bar">
      {
      children.map(function(c,n) {
        var classes = c.props.className || ""
        let classArray = classes.split(" ")
        classes = _.contains(classArray,"button") ? classes : classes+" button"

        if (self.state.hold==n || self.state.active==n || self.props.forceClicked==n)
          classes += " activated"

        var props = {
          key: n,
          className: classes
        }

        if (allowHold) {
          props.onMouseDown = self.startHold.bind(null, n, c.props.onMouseDown)
          props.onTouchStart = self.startHold.bind(null, n, c.props.onTouchStart)
          props.onMouseUp = self.stopHold.bind(null, c.props.onMouseUp)
          props.onTouchEnd = self.stopHold.bind(null, c.props.onTouchEnd)
        }

        if (allowClick)
          props.onClick = self.setActive.bind(null,n, c.props.onClick)

        return React.cloneElement(c, props)
      })
      }
    </nav>

    var classes = this.props.theme=="big" ? "bar-padding" : this.getTheme()
    classes += " "+this.getColor()

    return <div {... _.omit(this.props,"theme","activateOnClick","activateOnHold","initialState")} className={classes}>
      {bb}
    </div>
  },
})

if (h.nk(Meteor.settings, "public.env")!="live")
  RC.Tabs.Help = {
    Type: "Canvas",
    Themes: themes,
    PropTypes: {
      initialState: "Integer (Initially activated button/link)",
      forceClicked: "Integer (This button will stay clicked no matter what)",
      activateOnClick: "Boolean (Allow state to change when clicked)",
      activateOnHold: "Boolean (Allow state to change when held down)",
    },
    Note: "Only accepts <RC.URL/> components as children.",
    Description: "Creates a bar of button-styled links with support for state changes.",
  }
