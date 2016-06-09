
BigButtons = React.createClass({
  render() {
    return <div id="BigButtons" className="clearfix">
      <div id="BigButtonLeft" className="clearfix bigButtonActive bigButton">
        <div className="flex aligncenter">
          <img id="ScanIcon" src={iGluco.assetPath("img/QR3.png")} className="image" style={{maxWidth: '10%'}} />
          <p id="LeftButtonLabel" className="buttonLabel"> Scan </p>
        </div>
        <p id="LeftButtonText" className="buttonText ">
          a new bottle of strips
        </p>
      </div>
      <div id="BigButtonRight" className="clearfix bigButtonActive bigButton">
        <div className="flex aligncenter" >
          <img id="UploadIcon" src={iGluco.assetPath("img/Cloud3.png")} className="image" style={{maxWidth: '10%'}} />
          <p id="RightButtonLabel" className="buttonLabel"> Upload </p>
        </div>
        <div id="UploadCount" className="clearfix">
          <p id="UploadCountText">
          4
          </p>
        </div>
        <p id="RightButtonText" className="buttonText ">
          offline measurements
        </p>
      </div>
    </div>
  }
});
