
RC.Card = React.createClass({
  getTheme(name){
    let theme = _.contains(["regular","side","colored"], name)
      ? name : "regular"
    return theme+" "+(this.props.className || "")
  },
  render(){

    return <div className={"boxed card "+this.getTheme(this.props.theme)} id={this.props.id}>
      {
        !this.props.title && !this.props.subtitle && !this.props.avatar && !this.props.uiClass ? null :
        <div className="title clear">
          <RC.Avatar src={this.props.avatar} uiClass={this.props.uiClass} size="regular" />
          {this.props.title ? <h4 className="first ellipsis">{this.props.title}</h4> : null }
          {this.props.subtitle ? <p className="second light ellipsis">{this.props.subtitle}</p> : null }
        </div>
      }
      <div className="inner">
        {this.props.children}
      </div>
    </div>
  },
})
