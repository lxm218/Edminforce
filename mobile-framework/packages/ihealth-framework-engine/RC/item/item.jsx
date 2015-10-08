
// let themes = [
//   "body", // Done
//   "divider", // Done
//   "avatar", // Done
//   "image", // Done
//   "icons", // Done
//   "no-borders", // Done
//   "thumbnail" // Done
// ]

RC.Item = React.createClass({
  mixins: [RC.Mixins.PureRender,RC.Mixins.CSS],
  displayName: "Item",

  propTypes: {
    uiClass: React.PropTypes.string,
    uiColor: React.PropTypes.string,
    uiBgColor: React.PropTypes.string,
    uiSize: React.PropTypes.number,

    color: React.PropTypes.string,
    bgColor: React.PropTypes.string,

    avatar: React.PropTypes.string,
    title: React.PropTypes.string,
    subtitle: React.PropTypes.string,
    note: React.PropTypes.string,

    theme: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.array,
    ]),

    id: React.PropTypes.string,
    style: React.PropTypes.object,
  },
  renderHeader(){
    let item = []
    if (this.props.title) item.push(<h2>{this.props.title}</h2>)
    if (this.props.subtitle) item.push(<p>{this.props.subtitle}</p>)

    if (item.length)
      return <div>{item}</div>
  },
  renderAuto(loopedName, key){

    let self = this
    let styles = this.css.styles
    var switchName

    if (_.isString(loopedName))
      switchName = loopedName
    else
      return this.css.themeNames.map(function(name, index){
        return self.renderAuto(name, index)
      })

    // @@@@
    // Start Switch
    switch (switchName) {

      case "image":
        if (this.props.src)
          return <img src={this.props.src} key={key} />
      break

      case "thumbnail":
      case "avatar":
        if (this.props.avatar || this.props.img || this.props.uiClass || this.props.title || this.props.subtitle) {
          var media = []
          if (this.props.avatar || this.props.img)
            media.push(<figure style={styles.avatar} key={0}/>)
          if (this.props.uiClass) {
            let iconProps = h.splitProps(this.props, RC.uiKeys, "uiClass", 2-media.length)
            var realLen = media.length
            media = media.concat( _.map(iconProps, function(p,n){
              let isRight = (realLen+n)>=1
              if (!p.uiBgColor && !isRight)
                p.uiBgColor = "silver"
              let itemSize = p.uiSize || (isRight ? 24 : 16)

              return <RC.uiIcon {... p} theme={isRight ? "right" : null} uiSize={itemSize} key={n+1} />
            }))
          }

          return <div style={styles.canvasInner} key={key}>
            {media[0]}
            {this.props.title ? <h3 style={styles.title}>{this.props.title}</h3> : null}
            {this.props.subtitle ? <p style={styles.subtitle}>{this.props.subtitle}</p> : null}
            {media[1]}
          </div>
        }
      break
      case "icons":
        if (this.props.uiClass) {
          let iconProps = h.splitProps(this.props, RC.uiKeys, "uiClass", 2)
          let media = _.map(iconProps, function(p,n){
            return <RC.uiIcon {... p} theme={n>=1 ? "right" : null} uiSize={Number(p.uiSize) || 24} key={n} />
          })
          return media
        }
      break
      default:
        if (this.props.title || this.props.subtitle)
          return <div key={key}>
            {this.props.title ? <h3 style={styles.title}>{this.props.title}</h3> : null}
            {this.props.subtitle ? <p style={styles.subtitle}>{this.props.subtitle}</p> : null}
          </div>
    }
  },
  renderChildren(){

    let styles = this.css.styles.canvasInner

    if (this.props.theme!="body")
      Object.assign(styles,RC.cssMixins.ellipsis)
    if (!this.props.children)
      return null

    var children

    if (h.checkIfString(this.props.children))
      children = <p style={styles}>{this.props.children}</p>
    else if (this.props.children) {
      children = !_.isArray(this.props.children) ? [this.props.children] : this.props.children
      children = children.map( function(c,n){
        if (_.isString(c)) return <p styles={styles} key={n}>{c}</p>
        return c
      })
    }

    return children
  },
  render(){

    // if (avatar[1])
    //   var trail = avatar[1]
    // else if (this.props.note)
    //   var trail = <span className="item-note">{this.props.note}</span>
    // else
    //   var trail = null

    let canvasProps = _.omit(this.props, ["href"])
    let itemRender = <div {... canvasProps} style={this.css.styles.canvas}>
      {this.renderAuto()}
      {this.renderChildren()}
    </div>

    return this.props.href
      ? <a href={this.props.href} style={{display:"block"}}>{itemRender}</a>
      : itemRender
  },
  // @@@@
  // @@@@
  // Styles Start
  // @@@@
  // @@@@
  isDivider(np,ns) {
    return _.contains(
        (this.css && this.css.themeNames)
        || (_.isArray(np.theme) ? np.theme : [np.theme])
    , "divider")
  },
  defBgColor(np,ns) {
    return this.isDivider(np,ns) ? "light" : "white"
  },
  watchProps: ["avatar","img"],
  baseStyles(np,ns) {
    if (!this.defaultBorderColor) this.defaultBorderColor = this.color.isDark ? RC.Theme.color.edges : RC.Theme.color.edgesLighter

    let PAD = RC.Theme.size.paddingPx
    let isURL = h.isURL(np)

    return {
      // Canvas Outer
      canvas: h.assignClone( RC.cssMixins.item(), {
        fontSize: RC.Theme.font.size-1,
        cursor: isURL ? "pointer" : "auto",
        backgroundColor: this.color.hex, color: this.color.textColor,
        borderStyle: "solid", borderWidth: 1 , borderColor: this.defaultBorderColor,
      }),
      canvasInner: {
        fontSize: RC.Theme.font.size+1,
      },
      title: h.assignClone( [RC.cssMixins.font("bold"), RC.cssMixins.ellipsis], {
        fontSize: RC.Theme.font.size+1, color: this.color.textColor,
        padding: "0 "+PAD+"px 0 0", margin: 0
      }),
      subtitle: h.assignClone( RC.cssMixins.ellipsis, {
        fontSize: RC.Theme.font.size-1, opacity: .5,
        padding: "0 "+PAD+"px 0 0", margin: 0,
      })
    }
  },
  themeStyles(np,ns) {
    let PAD = RC.Theme.size.paddingPx

    return {
      // Divider Theme
      divider: {
        canvas: {
          paddingTop: PAD-5, paddingLeft: PAD, paddingBottom: PAD-4, paddingRight: PAD,
          zIndex: 5
        },
        canvasInner: h.assignClone(RC.cssMixins.font("bold"), {padding: 0}),
      },
      // Short Theme
      short: {
        canvas: { paddingTop: 5, paddingBottom: 6 },
        canvasInner: { fontSize: RC.Theme.font.size-1 },
        title: { fontSize: RC.Theme.font.size-1 }
      },
      // Image Theme
      image: {
        canvas: { paddingTop: 0, paddingLeft: 0, paddingBottom: 0, paddingRight: 0 }
      },
      // Avatar Theme
      avatar: {
        canvas: { minHeight: 70, zIndex: 3, },
        canvasInner: {
          padding: "0 0 0 52px",
        },
        avatar: h.assignClone(RC.cssMixins.avatar, {
          position: "absolute", top: 13, left: 15,
          backgroundImage: "url("+(np.avatar || np.img)+")",
          backgroundColor: this.color.hex
        }),
      },
      // Big Avatar Theme
      thumbnail: {
        canvasInner: {
          minHeight: 88,  padding: "0 0 0 104px",
        },
        avatar: h.assignClone(RC.cssMixins.avatar, {
          position: "absolute", top: 13, left: 15,
          width: 92, height: 92, borderRadius: 0,
          backgroundImage: "url("+(np.avatar || np.img)+")",
          backgroundColor: this.color.hex
        }),
        title: {
          padding: "15px 15px 0 0"
        }
      },
      // Icons Theme
      icons: {
        canvas: { paddingLeft: 46, },
        canvasInner: { padding: 0 }
      },
      // Body Theme
      body: {
        canvas: {
          borderWidth: "1px 0",
          paddingTop: PAD, paddingLeft: 2, paddingBottom: PAD+10, paddingRight: 2,
          margin: "-1px 13px"
        }
      },
      // No Borders Theme
      "no-borders": {
        canvas: {
          borderWidth: 0, margin: 0,
        }
      }
    }
  },
})
