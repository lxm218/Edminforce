
RC = {}

RC.NotFound = React.createClass({
  render() {
    return <div className="table bg-brand-light">
      <div className="inside center">
        <h4>Component Not Found</h4>
      </div>
    </div>
  }
})

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

    let ui = <i className={classList.join(" ")} style={styles} />
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

RC.URL = React.createClass({
  render: function() {

    let props = _.omit(this.props, ["tagName"])

    if (props.href)
      return <a {... props}>{props.children}</a>
    else {
      let keys = _.keys(props)
      if (_.intersection(keys, ["onClick","onTouchTap","onTouch"]).length)
        props.className = (props.className || "")+" cursor"

      if (_.isString(props.tagName))
        return React.createElement(this.props.tagName, props, props.children)

      return <span {... props}>{props.children}</span>
    }
  }
})

RC.Animate = React.addons.CSSTransitionGroup

RC.Mixins = {
  // @@@@@
  // Theme Mixins
  Theme: {
    getTheme(t){
      var classList = []
      var self = this
      var themeList = h.strToArray( t || this.props.theme || this.themeDefault || "regular" )

      if (_.isString(this.themeGroup))
        classList.push(this.themeGroup)

      if (_.isArray(this.themes) || t) {
        _.map( _.intersection(self.themes, themeList), function(t){
          classList.push( _.isString(self.themeGroup)
            ? self.themeGroup+"-"+t
            : t
        )})
      }

      if (_.isString(this.props.className))
        classList.push(this.props.className)

      return classList.join(" ")
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
          let uiProps = fw.pickProps(props, uiKeys)
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
