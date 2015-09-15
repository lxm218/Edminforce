
RC.GlobalLayout = React.createClass({

  propTypes: {
    id: React.PropTypes.string,
    className: React.PropTypes.string,
    theme: React.PropTypes.string,

    animate: React.PropTypes.bool,
    isVisible: React.PropTypes.bool,
    allowLongLabels: React.PropTypes.bool,
    list: React.PropTypes.array,
  },
  go(num) {
    this.refs.swiper.slideTo(num)
  },
  goLeft() {
    this.refs.swiper.swipe.prev()
  },
  goRight() {
    this.refs.swiper.swipe.next()
  },
  swipeCallback() {
    this.refs.gnav.setState({
      selected: this.refs.swiper.getPos()
    })
  },
  render() {
    var self = this

    // Global Nav
    let children = this.props.children.map ? this.props.children : [this.props.children]
    let globalNavProps = {
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
          onClick: self.go.bind(null,n),
        }
        listProps.uiColor = c.props.globalNavUIColor || self.props.globalNavUIColor
        listProps.uiColorCur = c.props.globalNavUIColorCur || self.props.globalNavUIColorCur
        return listProps
      })
    }

    // Swipe
    let swipeProps = _.omit(this.props, ["globalNavStartTab","globalNavLocation","globalNavIsVisible","globalNavAnimate","globalNavLongLabels","globalNavUIColor","globalNavUIColorCur","children"])
    if (_.isUndefined(swipeProps.createNavHeight)) swipeProps.createNavHeight = true

    swipeProps.className = (swipeProps.className || "")+" nav-bottom"
    if (((_.isUndefined(swipeProps.globalNavLocation) || swipeProps.globalNavLocation=="auto") && h.getPlatform("android")) || swipeProps.globalNavLocation=="top")
      swipeProps.className += " nav-margin"
      // swipeProps.className = (swipeProps.className || "") + " nav-margin"

    return <div>
      <RC.GlobalNav {... globalNavProps} ref="gnav" />
      <RC.Swipe {... swipeProps} callback={this.swipeCallback} ref="swiper">
        {children}
      </RC.Swipe>
    </div>
  }
})

if (h.nk(Meteor.settings, "public.env")!="live")
  RC.GlobalLayout.Help = {
    Type: "Unique/Canvas",
    Themes: null,
    PropTypes: {
      globalNavStartTab: "Integer (Tab number to start at)",
      globalNavLocation: "[\"auto\",\"top\",\"bottom\"] - Location of Global Nav (Defaults to \"auto\")",
      globalNavIsVisible: "Boolean - Shows/Hides the Global Nav.",
      globalNavAnimate: "Boolean - Animate the Global Nav when it hides/shows.",
      globalNavLongLabels: "Boolean - Allow long labels in Global Nav",
      globalNavUiColor: "String - Flexible (HEX, String, CSS Classes)",
      globalNavUiColorCur: "String - Flexible (HEX, String, CSS Classes)",
    },
    Description: "Creates a card component. Similar to cards found in many Social Networking apps such as Facebook, Instagram, Twitter, or Pinterest, etc."
  }
