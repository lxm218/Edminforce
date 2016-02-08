
App.Stress_Test_2 = React.createClass({
  getInitialState() {
    return {
      hoverKey: null
    }
  },
  stressTest() {

    let albums = [{
      src: "/assets/examples/album1.jpg",
      title: "Downward Spiral",
      subtitle: "Nine Inch Nails"
    },{
      src: "/assets/examples/album2.jpg",
      title: "The Slip",
      subtitle: "Nine Inch Nails"
    },{
      src: "/assets/examples/album3.jpg",
      title: "Gone Girl",
      subtitle: "Trent Reznor & Atticus Ross"
    },{
      src: "/assets/examples/album4.jpg",
      title: "Daft Punk",
      subtitle: "Random Access Memories"
    },{
      src: "/assets/examples/album5.jpg",
      title: "Sia",
      subtitle: "1000 Forms of Fear"
    },{
      src: "/assets/examples/album6.jpg",
      title: "Hesitation Marks",
      subtitle: "Nine Inch Nails"
    },{
      src: "/assets/examples/album7.jpg",
      title: "Old World Underground",
      subtitle: "Metric"
    }]

    let self = this
    var loop = []

    for (let i=0; i < 200; i++) {
      loop = loop.concat(
        albums.map(function(a,n){

          let key = String(i)+n

          a.uiClass = "chevron-right"
          a.uiColor = "gray"
          a.onMouseOver = function(){
            self.setState({
              hoverKey: key
            })
          }

          a.className = key===self.state.hoverKey ? "trigger" : ""
          a.uiColor = key===self.state.hoverKey ? "brand1" : null

          return <App.StressTestItem {... a} key={key} />
        })
      )
    }

    return loop
  },
  render() {

    let stylesheet = `
      .stCanvas {
        position:relative;z-index:2;font-size:14px;padding-top:15px;padding-left:15px;padding-bottom:15px;padding-right:15px;margin:-1px;background-color:#fff;color:#373737;border-style:solid;border-width:1px;border-color:rgba(0,0,0,.1);
      }
      .stCanvasInner {
        font-size: 16px; min-height: 88px; padding: 0px 0px 0px 104px; display: block; text-overflow: ellipsis; overflow: hidden; white-space: nowrap;
      }
      .trigger .stCanvasInner {
        font-size: 16px; min-height: 88px; padding: 0px 0px 0px 200px; display: block; text-overflow: ellipsis; overflow: hidden; white-space: nowrap;
      }
      .stAvatar {
        width:92px;height:92px;background-size:cover;background-position:50%;border-radius:0;position:absolute;top:13px;left:15px;background-image:url(/assets/examples/album2.jpg);background-color:#fff;
      }
      .stTitle {
        font-family:Helvetica Neue, Roboto, sans-serif;font-weight:500;display:block;text-overflow:ellipsis;overflow:hidden;white-space:nowrap;font-size:16px;color:#373737;padding:15px 15px 0 0;margin:0;
      }
      .stSubtitle {
        display:block;text-overflow:ellipsis;overflow:hidden;white-space:nowrap;font-size:14px;opacity:0.5;padding:0 15px 0 0;margin:0;
      }
    `

    return <RC.List>
      <style dangerouslySetInnerHTML={{__html: stylesheet}} />

      <RC.ItemBody>
        <h3>Stress Test</h3>
        <p>This is a stress test. It's created for testing the performance of React, framework and the CSS in Javascript foundations.</p>
        <p>
          <strong>Details:</strong><br />
          a) 7*200 thumbnail list items looped.<br />
          b) On mouseover, state is changed causing all 1400 list items to re-render.<br />
          c) When list item re-renders, it updates with new CSS ClassNames and its inner uiIcon component refreshed.
        </p>
      </RC.ItemBody>

      <RC.ItemDivider>Stress Test Begin</RC.ItemDivider>
      {this.stressTest()}

    </RC.List>
  }
})


// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@


App.StressTestItem = React.createClass({
  mixins: [RC.Mixins.PureRender],
  displayName: "App.StreetestItem",

  propTypes: {
    uiColor: React.PropTypes.string,
    uiBgColor: React.PropTypes.string,
    uiSize: React.PropTypes.number,

    color: React.PropTypes.string,
    bgColor: React.PropTypes.string,

    src: React.PropTypes.string,
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
    let switchName = this.props.theme

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
            media.push(<figure className="stAvatar" style={{backgroundImage: "url("+this.props.avatar+")"}} key={0}/>)
          if (this.props.uiClass) {
            let iconProps = h.splitProps(this.props, RC.uiKeys, "uiClass", 2-media.length)
            var realLen = media.length
            media = media.concat( _.map(iconProps, function(p,n){
              let isRight = (realLen+n)>=1
              if (!p.uiBgColor && !isRight)
                p.uiBgColor = "silver"
              let itemSize = p.uiSize || (isRight ? 24 : 16)

              var itemStyle = null
              if (switchName=="thumbnail") {
                itemStyle = { top: "50%", marginTop: itemSize/-2 }
              } else if (isRight) {
                itemStyle = { top: 25 }
              }

              return <RC.uiIcon {... p} theme={isRight ? "right" : null} uiSize={itemSize} itemStyle={itemStyle} key={n+1} />
            }))
          }

          return <div className="stCanvasInner" key={key}>
            {media[0]}
            {this.props.title ? <h3 className="stTitle">{this.props.title}</h3> : null}
            {this.props.subtitle ? <p className="stSubtitle">{this.props.subtitle}</p> : null}
            {media[1]}
          </div>
        }
      break
      case "icons":
        if (this.props.uiClass) {
          let iconProps = h.splitProps(this.props, RC.uiKeys, "uiClass", 2)
          let media = _.map(iconProps, function(p,n){
            return <RC.uiIcon {... p} theme={(realLen+n)>=1 ? "right" : null} uiSize={Number(p.uiSize) || 24} key={n} />
          })
          return media
        }
      break
      default:
        if (this.props.title || this.props.subtitle)
          return <div key={key}>
            {this.props.title ? <h3 className="stTitle">{this.props.title}</h3> : null}
            {this.props.subtitle ? <p className="stSubtitle">{this.props.subtitle}</p> : null}
          </div>
    }
  },
  renderChildren(){

    let styles = {}

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
        if (_.isString(c)) return <p className="stCanvasInner" key={n}>{c}</p>
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

    let areaProps = _.omit(this.props, ["href"])
    let itemRender = <div {... areaProps} className={"stCanvas "+(this.props.className || "")}>
      {this.renderAuto()}
      {this.renderChildren()}
    </div>

    return this.props.href
    ? <a href={this.props.href} style={{display:"block"}}>{itemRender}</a>
    : itemRender
  },
})
