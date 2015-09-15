
let themes = ["regular","opacity","flat"]
RC.HeaderNav = React.createClass({
  propTypes: {
    id: React.PropTypes.string,
    className: React.PropTypes.string,
    theme: React.PropTypes.string,

    title: React.PropTypes.string,
    nav: React.PropTypes.array,
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
      FlowRouter.go(FlowRouter.LastRoute[FlowRouter.LastRoute.length-1])
    }
  },
  getInitialState() {
    return {openNav: false}
  },
  componentWillMount() {
    var self = this
    var allowThreshold = true

    document.addEventListener("click",function(e){

      // Strange IOS JS error. keep the .length ?/: check in here
      let pStop = e.target.className.length ? e.target.className.indexOf("stopPropagate") : -1
      let pExit = e.target.className.length ? e.target.className.indexOf("exitPropagate") : -1
      let moreNavDom = React.findDOMNode(self.refs.moreNav)

      if (e.target.tagName=="HTML") return // This is an old-device fix, leave it alone. :: By Jason

      if ((pStop < 0 && self.state.openNav) || pExit>=0)
        self.setState({openNav: false})
    })
  },
  openMore() {
    this.setState({openNav: true})
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
      logoRight ? null :
      <div>
        <p className="more-button stopPropagate" onClick={this.openMore}><span className="stopPropagate"/></p>
        <RC.Animate transitionName="corner-right">
        {
        !this.state.openNav ? null :
        <div className="stopPropagate more-nav" ref="moreNav">
          {
          this.props.nav.map(function(item,n){
            return <RC.URL {... _.omit(item, ["text"])} key={n} className="exitPropagate">{item.text}</RC.URL>
          })
          }
        </div>
        }
        </RC.Animate>
      </div>
      }
    </nav>
  }
})

if (h.nk(Meteor.settings, "public.env")!="live")
  RC.HeaderNav.Help = {
    Type: "Unique/Canvas",
    Themes: themes,
    PropTypes: {
      title: "String (Shows title in the header navigation bar)",
      nav: "Array (List of links for the menu on right)"
    },
    Description: "Created for documenting snippets of information with dates and bullet points. Use this component with the <RC.Timeline /> component."
  }
