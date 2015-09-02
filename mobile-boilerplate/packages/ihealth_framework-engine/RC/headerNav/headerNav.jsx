
RC.HeaderNav = React.createClass({
  getTheme(name){
    let theme = _.contains(["regular","opacity","flat"], name)
      ? name : "regular"
    return theme
  },
  clickHandler(home) {
    if (home) {
      FlowRouter.BackButton = true
      FlowRouter.go("/")
    } else if (FlowRouter.LastRoute.length) {
      FlowRouter.BackButton = true
      FlowRouter.go(FlowRouter.LastRoute[FlowRouter.LastRoute.length-1])
    }
  },
  getInitialState() {
    return {moreNav: false, init: _.isUndefined(this.props.init) ? true : this.props.init}
  },
  componentWillMount() {
    var self = this
    var allowThreshold = true

    document.addEventListener("click",function(e){

      Meteor.clearTimeout(self.timeout)
      // Strange IOS JS error. keep the .length ?/: check in here
      let pStop = e.target.className.length ? e.target.className.indexOf("stopPropagate") : -1
      let pExit = e.target.className.length ? e.target.className.indexOf("exitPropagate") : -1
      let moreNavDom = React.findDOMNode(self.refs.moreNav)

      if (e.target.tagName=="HTML") return // This is an old-device fix, leave it alone. :: By Jason

      if (pStop < 0 && pExit < 0 && self.state.moreNav) {
        // Do Animation
        self.setState({moreNav: false, init: false})
        self.timeout = Meteor.setTimeout(function(){
          self.setState({moreNav: false, init: true})
        }, 300)
      } else if (pExit>=0)
        self.setState({moreNav: false, init: true})
      else
        self.setState({init: true})
    })
  },
  openMore() {
    this.setState({moreNav: true, init: false})
  },
  timeout: null,
  render() {

    let logoRight = !(_.isArray(this.props.nav) && !_.isEmpty(this.props.nav))

    if (FlowRouter.LastRoute.length)
      var backButton = <span className="normal back" onClick={this.clickHandler.bind(null,false)}>Back</span>
    else
      var backButton = FlowRouter.current().path!="/" && !this.props.hideHome
      ? <span className="normal back" onClick={this.clickHandler.bind(null,true)}>Home</span>
      : null

    let classList = [
      "bg-nav",
      "nav-height transition",
      this.getTheme(this.props.theme),
      this.props.title && this.props.title.length>=9 ? "long" : "short",
    ]

    return <nav className={classList.join(" ")} id="mobile-header">
      {backButton}
      <figure className={(logoRight && backButton ? "right" : "")+" logo nav-height boxed transition-medium"}>
        {this.props.title ? <h1 className="ellipsis">{this.props.title}</h1> : <img src="/assets/logo.png" className="transition-medium" data-x="auto" ref="logo" />}
      </figure>
      {
      logoRight ? null
      : <p className="more-button stopPropagate" onClick={this.openMore}><span className="stopPropagate"/></p>
      }
      {
      logoRight ? null
      : <div className={"stopPropagate more-nav "+(this.state.moreNav ? "corner-in" : "corner-out")} style={this.state.init ? {display: "none"} : {}} ref="moreNav">
        {
        this.props.nav.map(function(item,n){
          return <a href={item.href} key={n} className="exitPropagate">{item.text}</a>
        })
        }
        </div>
      }
    </nav>
  }
})
