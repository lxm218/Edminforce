
RC.GlobalLayout = class extends RC.CSS {

  constructor(p) {
    super(p);
    this.state = {
      obj: Immutable.Map({
        selectedTab: p.globalNavStartTab || 0
      })
    }
  }

  go(num) {
    this.refs.swiper.slideTo(num)
  }
  goLeft() {
    this.refs.swiper.swipe.prev()
  }
  goRight() {
    this.refs.swiper.swipe.next()
  }
  swipeCallback() {
    this.setStateObj({
      selectedTab: this.refs.swiper.getPos()
    })
  }
  render() {
    let self = this

    // Global Nav
    let children = _.isArray(this.props.children) ? this.props.children : [this.props.children]
    let globalNavProps = {
      selected: this.state.obj.get("selectedTab"),
      location: this.props.globalNavLocation,
      isVisible: _.isUndefined(this.props.globalNavIsVisible) ? true : this.props.globalNavIsVisible,
      animate: this.props.globalNavAnimate,
      allowLongLabels: this.props.globalNavLongLabels,
      startTab: this.props.globalNavStartTab || 0,
      list: children.map(function(c,n){
        let listProps = {
          uiClass: c.props.globalNavIcon,
          uiClassCur: c.props.globalNavIconCur,
          label: c.props.globalNavLabel,
          onClick: self.go.bind(self,n),
        }
        listProps.uiColor = c.props.globalNavUIColor || self.props.globalNavUIColor
        listProps.uiColorCur = c.props.globalNavUIColorCur || self.props.globalNavUIColorCur
        return listProps
      })
    }

    // Swipe
    let swipeProps = _.omit(this.props, ["globalNavStartTab","globalNavLocation","globalNavIsVisible","globalNavAnimate","globalNavLongLabels","globalNavUIColor","globalNavUIColorCur","children"])
    if (_.isUndefined(swipeProps.createNavHeight)) swipeProps.createNavHeight = true

    swipeProps.gNav = ((_.isUndefined(swipeProps.globalNavLocation) || swipeProps.globalNavLocation=="auto") && h.getPlatform("android")) || swipeProps.globalNavLocation=="top"
      ? "top" : "bot"

    return <div>
      <RC.GlobalNav {... globalNavProps} ref="gnav" />
      <RC.Swipe {... swipeProps} callback={this.swipeCallback.bind(this)} ref="swiper">
        { this.renderChildren() }
      </RC.Swipe>
    </div>
  }
}

RC.GlobalLayout.propTypes = Object.assign({}, RC.GlobalLayout.propTypes, {
  animate: React.PropTypes.bool,
  isVisible: React.PropTypes.bool,
  allowLongLabels: React.PropTypes.bool,
  list: React.PropTypes.array,
})
