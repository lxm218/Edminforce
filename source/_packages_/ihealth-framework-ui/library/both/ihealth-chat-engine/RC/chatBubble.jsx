
RC.ChatBubble = React.createClass({
  mixins: [RC.Mixins.CSS],
  displayName: "RC.ChatBubble",

  propTypes: {
    avatar: React.PropTypes.string,
    uiClass: React.PropTypes.string,

    color: React.PropTypes.string,
    bgColor: React.PropTypes.string,

    // TODO: theme for txt/img/etc
    //theme: React.PropTypes.oneOfType([
    //  React.PropTypes.string,
    //  React.PropTypes.array,
    //]),

    id: React.PropTypes.string,
    className: React.PropTypes.string,
    style: React.PropTypes.object,

    date: React.PropTypes.object,
    type: React.PropTypes.string,
    message: React.PropTypes.string,
    showDateBreak: React.PropTypes.bool,
    firstOfGroup: React.PropTypes.bool,
    isUser: React.PropTypes.bool,
    gender: React.PropTypes.string,
    name: React.PropTypes.string,

  },

  /**
   * @@@
   * State Control
   * @@@
   */

  //

  /**
   * @@@
   * Render
   * @@@
   */
    renderDateBreak() {
    let styles = this.css.styles
    let date = _.isDate(this.props.date) ? this.props.date : false
    return this.props.showDateBreak && date
      ?
      <div style={styles.dateBreak}>
        <span style={styles.dateBreakLine}></span>
        <span style={styles.dateBreakBlock}>{moment(date).format("dddd, MMM D, YYYY")}</span>
      </div>
      :
      null
  },
  renderName() {
    let styles = this.css.styles
    let extendStyles = _.extend(_.clone(styles.avatar), {backgroundImage: `url(${this.props.avatar})`})

    return !this.props.firstOfGroup || this.props.isUser ? null
      : <div style={styles.author}>
      <figure src={this.props.avatar} style={extendStyles}
              uiClass={_.contains(["male","female"], this.props.gender) ? this.props.gender : "male"}>
      </figure>
      {this.props.name}
    </div>
  },
  renderMsg(){

    // style: h.jsToCss(styles.p, n, self.children.length, buttonState)

    let styles = this.css.styles
    switch(this.props.type){
      case "img":
        return <img src={this.props.message} style={styles.image}/>
      default:
        // "txt"
        return _.isString(this.props.message)
          ? <p>{this.props.message}</p>
          : this.props.message
    }
  },
  render() {
    let styles = this.css.styles
    let date = _.isDate(this.props.date) ? this.props.date : false
    let dataTime = date ? moment(date).format("h:mm a") : ""

    return <div {... this.props} style={styles.area}>
      { this.renderDateBreak() }
      { this.renderName() }

      <span style={styles.dataTime}>{dataTime}</span>
      <div style={styles.areaInner}>
        {this.renderMsg()}
      </div>

    </ div>
  },

  // @@@@
  // @@@@
  // Styles Start
  // @@@@
  // @@@@

  watchProps: [ "isUser" ],
  baseStyles(np,ns) {

    let isUser = np.isUser

    return {
      area: {
        padding: "4px 0 0",
        //paddingTop: np.firstOfGroup ? "20px" : "",
        paddingTop: "5px",
        position: "relative",
        textAlign: isUser ? "right" : "",
      },
      areaInner: {
        backgroundColor: this.color.hex,
        color: this.color.textColor,
        margin: isUser ? "0 0 0 58px" : "0 58px 0 0" ,
        borderRadius: isUser ? "4px 0 0 4px" : "0 4px 4px 0",

        display: "inline-block", position: "relative",
        zIndex: "2", overflow: "visible",
        minWidth: "140px", padding: "10px 9px 9px", paddingRight: isUser ? "18px" : "",
        fontWeight: "normal", fontFamily: [ "Helvetica Neue", "Roboto", "sans-serif" ],
      },
      dataTime: {
        display: "block", width: "50px", fontSize: "10px",
        color: "rgba(0,0,0,.3)", position: "absolute",
        bottom: "1px", "zIndex": "1",
        left: isUser ? "auto" : "145px",
        right: isUser ? "145px" : "auto",
        margin: isUser ? "0 5px 0 0" : "0 0 0 5px"
      },
      p: {
        ":lastChild": {
          marginBottom: "0"
        }
      },
      author: {
        fontSize: ".8em", fontWeight: "600",
        fontFamily: [ "Helvetica Neue", "Roboto", "sans-serif" ],
        color: "rgba(0,0,0,.4)",
        padding: "0 0 1px 43px"
      },
      avatar: {
        backgroundSize: "cover", backgroundPosition: "50%",
        backgroundColor: "#fff",
        width: "34px", height: "34px",
        margin: "-10px 0 0", borderRadius: "50%",
        position: "absolute", overflow: "hidden",
        top: "auto", left: "4px"
      },
      dateBreak: {
        textAlign: "center", fontSize: "12px",
        position: "relative", padding: "11px 0 16px"
      },
      dateBreakBlock: {
        position: "relative", zIndex: "2",
        padding: "0 5px", background: "#f4f4f4"
      },
      dateBreakLine: {
        display: "block", height: "1px", background: "rgba(0,0,0,.15)",
        position: "absolute", zIndex: "1",
        top: "20px", left: "10px", right: "10px"
      },
    }
  },

  themeStyles (np, ns){
    return  {
      img: {
        areaInner: {
          height: "120px", minWidth: "0",
          padding: "0", overflow: "hidden",
        },
        image: {
          margin: "0"
        }
      }
    }
  }
})
