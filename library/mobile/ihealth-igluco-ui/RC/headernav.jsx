
HeaderNav = React.createClass({
  render() {
    return <div id="HeaderNav" className="clearfix">
      <img id="Cancel" src={iGluco.assetPath("img/Cancel.png")} className="image" />
      <p id="Title">
        Measure
      </p>
      <img id="DiabetesLogo" src={iGluco.assetPath("img/diabetes3.png")} className="image" style={{maxHeight: '35%'}}/>
    </div>
  }
});
