
RC = {}

RC.Mixins = {
  // @@@@@
  // Theme Mixins
  Theme: {
    splitThemes(){
      return h.strToArray(this.props.theme) || []
    },
    getTheme(t,addClass){
      var classList = []
      var self = this
      var themeList = h.strToArray( t || this.props.theme || this.themeDefault || "regular" )

      if (_.isString(this.themeGroup))
        classList.push(this.themeGroup)

      if (_.isArray(this.themes) || t) {
        _.map( _.intersection(self.themes, themeList), function(t){
          classList.push( self.themeGroup
            ? self.themeGroup+"-"+t
            : t
        )})
      }

      if (_.isString(this.props.className) && (addClass || _.isUndefined(addClass)))
        classList.push(this.props.className)

      return classList.join(" ")
    },
  },
  // @@@@@
  // Convert Ionic Names
  IonicConvert: {
    getColor(){
      let color = this.props.bgColor
      if (!color) return ""

      let ionicCSS = ["light","stable","dark","brand","brand1","brand2","brand3"]
      return " "+(_.contains(ionicCSS,color) ? "bar-"+color : "bg-"+color)
    },
  },
  // @@@@@
  // Premade Mixins
  Premade: {
    makeAvatarItem(props){

      if (_.isUndefined(props)) props = this.props
      let keys = _.keys(props)

      if (_.intersection(keys, ["title","subtitle","avatar","uiClass"]).length) {
        let uiKeys = ["uiClass","uiSize","uiBrand","uiColor"]

        if (props.avatar)
          var avatar = <img src={props.avatar} />
        else if (_.intersection(keys, uiKeys).length) {
          let uiProps = h.pickProps(props, uiKeys)
          var avatar = <RC.uiIcon {...uiProps} />
        }

        return <RC.Item theme={props.avatar || props.uiClass ? "avatar" : null}>
          {avatar}
          {props.title ? <h2>{props.title}</h2> : null}
          {props.subtitle ? <p>{props.subtitle}</p> : null}
        </RC.Item>
      }
      return null
    },
  }
}

RC.NotFound = React.createClass({
  render() {
    return <div className="table bg-brand-light">
      <div className="inside center">
        <h4>Component Not Found</h4>
      </div>
    </div>
  }
})

/**
 * Avatar is Deprecated
 * Remove this component after the ChatBubble Avatars are replaced.
 */
RC.Avatar = React.createClass({
  render() {
    if (!this.props.src && !this.props.uiClass) return null

    return <figure className={"avatar background round overflow"+(this.props.src ? "" : " none")} style={this.props.src ? {backgroundImage: "url("+this.props.src+")"} : {}}>
        {!this.props.src ? <RC.uiIcon theme={this.props.theme} uiClass={this.props.uiClass} uiColor={this.props.uiColor} uiSize={this.props.uiSize} /> : null}
      </figure>
  }
})

RC.uiIcon = React.createClass({
  propTypes: {
    uiClass: React.PropTypes.string,
    // uiSize: THIS IS FLEXIBLE
    // uiBrand: THIS IS FLEXIBLE
    uiColor: React.PropTypes.string,
  },
  render() {
    if (!this.props.uiClass) return null

    // Round to closest 5 decimals
    // let uiOpacity = !this.props.uiOpacity ? 75 : Number(this.props.uiOpacity)*100
    // uiOpacity = 5 * Math.round(uiOpacity/5)

    var styles = {}
    var brandNum = _.isNumber(this.props.uiBrand) ? this.props.uiBrand : (this.props.uiBrand || -1)
    let sizeList = ["", "fa-lg", "fa-2x", "fa-3x", "fa-4x", "fa-5x"]
    let brandList = ["bg-brand","bg-brand2","bg-brand3"]

    // Brand
    if (_.isString(brandNum) && _.contains(["brand","brand1","brand2","brand3"], brandNum))
      brandNum = {
        brand: 0,
        brand1: 0,
        brand2: 1,
        brand3: 2,
      }[brandNum]

    let classList = [
      "fa",
      "fa-"+this.props.uiClass.trim(),
      (this.props.className || "")
    ]

    // Color
    if (h.checkColorClass(this.props.uiColor))
      classList.push(this.props.uiColor)
    else if (this.props.uiColor)
      styles.color = this.props.uiColor

    // Size
    if (_.isNumber(this.props.uiSize) && this.props.uiSize%1==0)
      classList.push( sizeList[this.props.uiSize] || sizeList[1] )
    else if (_.contains(sizeList, this.props.uiSize))
      classList.push(this.props.uiSize)
    else if (this.props.uiSize)
      styles.fontSize = this.props.uiSize

    let ui = <i {... this.props} className={classList.join(" ")} style={styles} />
    return brandNum>=0 ? <span className={"fa-wrap "+(brandList[brandNum] || brandList[0])}>{ui}</span> : ui
  }
})

RC.VerticalAlign = React.createClass({
  render() {
    if (!this.props.children) return null
    let style = this.props.height ? {height: this.props.height} : {}

    return <div className="table">
      <div className={"inside "+(this.props.className || "")+(this.props.center ? " center" : "")} style={style}>
        {this.props.children}
      </div>
    </div>
  }
})

let loadingThemes = ["circle","tiny","short"]
RC.Loading = React.createClass({
  mixins: [RC.Mixins.Theme],
  themeGroup: "loading",
  themeDefault: "circle",
  themes: loadingThemes,

  propTypes: {
    loadingStyles: React.PropTypes.object,
    loadingClasses: React.PropTypes.string,
  },
  doLoading() {
    return <div className={this.getTheme(null, false)+" "+this.props.loadingClasses} style={this.props.loadingStyles}>
      <span className="abs-center wheel" />
    </div>
  },
  render() {
    let props = {... _.omit(this.props,["loadingStyles","loadingClasses","isReady","children"])}
    let children = _.isArray(this.props.children) || props.length
      ? <div {... props}>{this.props.children}</div>
      : this.props.children

    return this.props.isReady || (_.isUndefined(this.props.isReady) && this.props.children)
      ? children : this.doLoading()
  }
})

if (h.nk(Meteor.settings, "public.env")!="live")
  RC.Loading.Help = {
    Type: "Utility",
    Themes: loadingThemes,
    PropTypes: {
      theme: "String",
      isReady: "Boolean (Pass subs.ready() to this prop)",
      loadingStyles: "Object (Set of CSS styles for the loading wheel only.)",
      loadingClasses: "String (CSS class for the loading wheel only.)"
    },
    Note: "If isReady prop is undefined, it simply waits until there is content.",
    Description: "Displays a loading wheel until the subscription or content is ready."
  }

RC.URL = React.createClass({
  displayName: "URL",
  render() {

    let props = _.omit(this.props, ["tagName"])

    if (props.href)
      return <a {... props}>{props.children}</a>
    else {
      let keys = _.keys(props)
      if (_.intersection(keys, ["onClick","onTouchTap","onTouch"]).length)
        props.className = (props.className || "")+" cursor"

      if (_.isString(this.props.tagName))
        return React.createElement(this.props.tagName, props, props.children)

      return <span {... props}>{props.children}</span>
    }
  }
})

RC.Animate = React.addons.CSSTransitionGroup

RC.Disconnected = React.createClass({
  mixins: [RC.Mixins.Theme, ReactMeteorData],
  getMeteorData() {
    let connected = Meteor.status().connected ? true : false
    return {
      connected: connected
    }
  },
  render() {
    let displayStyle = this.data.connected ? {display: "none"} : {};
    return <div className="connectionLost" style={displayStyle}>
      <span className="icon ion-load-a"></span>
      <div className="title-connectionLost">Connection to server lost, reconnecting...</div>
    </div>
  }
})
