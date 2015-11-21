let themes = ["regular", "opacity", "flat"]
RC.HeaderNav = React.createClass({
  propTypes: {
    id: React.PropTypes.string,
    className: React.PropTypes.string,
    theme: React.PropTypes.string,

    title: React.PropTypes.string,
    nav: React.PropTypes.array,

    hideBackButton:React.PropTypes.bool,
    hideLeftNavToggle:React.PropTypes.bool,
    hideShoppingCartButton:React.PropTypes.bool,

  },

  getTheme(name){
    let theme = _.contains(themes, name)
      ? name : "regular"
    return theme
  },
  clickHandler(home) {
    if (home) {
      FlowRouter.BackButton = true
      FlowRouter.go("/")
    } else if (FlowRouter.LastRoute.length) {
      FlowRouter.BackButton = true
      FlowRouter.go(FlowRouter.LastRoute[FlowRouter.LastRoute.length - 1])
    }
  },
  getInitialState() {
    return {moreNav: false, init: _.isUndefined(this.props.init) ? true : this.props.init}
  },
  componentWillMount() {
    var self = this
    var allowThreshold = true

    document.addEventListener("click", function (e) {

      Meteor.clearTimeout(self.timeout)
      // Strange IOS JS error. keep the .length ?/: check in here
      let pStop = e.target.className.length ? e.target.className.indexOf("stopPropagate") : -1
      let pExit = e.target.className.length ? e.target.className.indexOf("exitPropagate") : -1
      let moreNavDom = React.findDOMNode(self.refs.moreNav)

      if (e.target.tagName == "HTML") return // This is an old-device fix, leave it alone. :: By Jason

      if (pStop < 0 && pExit < 0 && self.state.moreNav) {
        // Do Animation
        self.setState({moreNav: false, init: false})
        self.timeout = Meteor.setTimeout(function () {
          self.setState({moreNav: false, init: true})
        }, 300)
      } else if (pExit >= 0)
        self.setState({moreNav: false, init: true})
      else
        self.setState({init: true})
    })
  },
  openMore() {
    this.setState({moreNav: true, init: false})
  },
  //////actions///////

  //d打开leftNav
  action_openLeftNav(){

    console.log('dispatch: LEFT_NAV_OPEN');
    Dispatcher.dispatch({actionType: 'LEFT_NAV_OPEN'})
  },

  timeout: null,
  render() {

    let logoRight = !(_.isArray(this.props.nav) && !_.isEmpty(this.props.nav))


    //if (FlowRouter.LastRoute.length)
    //  var backButton = <span className="normal back" onClick={this.clickHandler.bind(null,false)}>Back</span>
    //else
    //  var backButton = FlowRouter.current().path != "/" && !this.props.hideHome
    //    ? <span className="normal back" onClick={this.clickHandler.bind(null,true)}>Home</span>
    //    : null

    var backButton = null;
    if (!this.props.hideBackButton) {
      if ((FlowRouter.LastRoute.length)) {
        backButton = <span className="normal back" onClick={this.clickHandler.bind(null,false)}>
        <RC.uiIcon uiClass="chevron-left"></RC.uiIcon></span>

      }else if(FlowRouter.current().path != "/" && !this.props.hideHome){
        backButton = <span className="normal back" onClick={this.clickHandler.bind(null,true)}>
        <RC.uiIcon uiClass="chevron-left"></RC.uiIcon></span>
      }
    }

    var leftNavToggle = null;
    //if (this.props.leftNavToggle) {
    if(!this.props.hideLeftNavToggle){
      leftNavToggle = <span className="normal navToggle" onClick={this.action_openLeftNav}><RC.uiIcon
        uiClass="bars"></RC.uiIcon></span>
    }


    var shoppingCartButton= null;
    if(!this.props.hideShoppingCartButton){
      shoppingCartButton =<a className="normal shopping-cart-button" href="/classEdit/billingAndPayment" >
        {this.props.shoppingCart
          && this.props.shoppingCart.items
          && this.props.shoppingCart.items.length
        }
        <RC.uiIcon uiClass="shopping-cart"></RC.uiIcon></a>
    }

    var shoppingCartItems = ''





    //}


    //if(!backButton){
    //  var leftNavToggle = this.props.leftNavToggle
    //
    //  if(leftNavToggle) backButton= <span className="normal navToggle" onClick={this.action_openLeftNav}><RC.uiIcon uiClass="bars"></RC.uiIcon></span>
    //}


    let classList = [
      "bg-nav",
      "nav-height transition",
      this.getTheme(this.props.theme),
      this.props.title && this.props.title.length >= 9 ? "long" : "short",
    ]

    return <nav className={classList.join(" ")} id="mobile-header">


      {/* 左侧  */}
      {leftNavToggle}
      {backButton}

      {/* 中间  */}
      <figure className={(logoRight && backButton ? "" : "")+" logo nav-height boxed transition-medium"}>
        {this.props.title && !this.props.showLogo ? <h1 className="ellipsis">Calphin</h1> :
          <img src="/assets/logo.png" className="transition-medium" data-x="auto" ref="logo"/>}
      </figure>

      {/* 右侧 */}
      {
        logoRight ? {shoppingCartButton}
          : <p className="more-button stopPropagate" onClick={this.openMore}><span className="stopPropagate"/>
        </p>
      }
      {
        logoRight ? null
          : <div className={"stopPropagate more-nav "+(this.state.moreNav ? "corner-in" : "corner-out")}
                 style={this.state.init ? {display: "none"} : {}} ref="moreNav">
          {
            this.props.nav.map(function (item, n) {
              return <a href={item.href} key={n} className="exitPropagate">{item.text}</a>
            })
          }
        </div>
      }
    </nav>
  }
})

if (h.nk(Meteor.settings, "public.env") != "live")
  RC.HeaderNav.Help = {
    Type: "Unique/Canvas",
    Themes: themes,
    PropTypes: {
      title: "String (Shows title in the header navigation bar)",
      nav: "Array (List of links for the menu on right)"
    },
    Description: "Created for documenting snippets of information with dates and bullet points. Use this component with the <RC.Timeline /> component."
  }
