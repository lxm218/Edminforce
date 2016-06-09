
iGluco.Icon = React.createClass({
  render() {
    let outerClass  = classNames('clearfix', {'iconRing': !this.props.isActive,'iconRingActive': this.props.isActive })
    let innerClass = classNames('content' )
    let imgStyle = R.merge(this.props.imgStyle, {WebkitFilter: `grayscale(${(this.props.isActive) ? 0 : 1})`, maxWidth: '30%'});
    return <div className={outerClass} >
      <div className={innerClass}>
        <img src={this.props.src} className="image" style={imgStyle} />
      </div>
    </div>
  }
});

iGluco.Icons = React.createClass({
      // <Icon src="img/IconPowerIcon.png" isActive={true} imgStyle={{marginBottom: '8%'}}/>
  render() {
    return <div id="Icons" className="">
      {
        this.props.icons.map((icon, i)=>
          <iGluco.Icon src={icon.src} isActive={icon.isActive} key={i} />
        )
      }
    </div>
  }
});
