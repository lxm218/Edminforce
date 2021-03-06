
RC = {}

RC.NotFound = React.createClass({
  render() {
    return <div className="table">
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
  render() {
    if (!this.props.uiClass) return null

    // Round to closest 5 decimals
    // let uiOpacity = !this.props.uiOpacity ? 75 : Number(this.props.uiOpacity)*100
    // uiOpacity = 5 * Math.round(uiOpacity/5)

    let sizeList = [" ", "fa-lg", "fa-2x", "fa-3x", "fa-4x", "fa-5x"]
    let classList = [
      "fa",
      "fa-"+this.props.uiClass,
      _.isNumber(this.props.uiSize) && sizeList[this.props.uiSize]
        ? sizeList[this.props.uiSize]
        : (_.contains(sizeList, this.props.uiSize) ? this.props.uiSize : sizeList[1])
      // uiOpacity!=100 || !_.isNumber(uiOpacity) ? " invis-"+uiOpacity : ""
    ]

    return <i className={classList.join(" ")} style={this.props.uiColor ? {color: this.props.uiColor} : {}} />
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
