// <!DOCTYPE html>
// <html>
//
//     <head>
// 	<link rel="stylesheet" href="boilerplate.css">
// 	<link rel="stylesheet" href="meteron.css">
// 	<meta charset="utf-8">
// 	<meta name="viewport" content="initial-scale = 1.0,maximum-scale = 1.0">
//     </head>
//     <body>

iGluco.MeasureOn = React.createClass({
  render() {
    let icons = [
      {src: iGluco.assetPath("img/IconBluetoothIcon3.png"), isActive: true},
      {src: iGluco.assetPath("img/IconStripIcon3.png"), isActive: false},
      {src: iGluco.assetPath("img/IconSampleIcon3.png"), isActive: false},
    ];
          // <div style={{'backgroundColor': 'red', width:'25%', height: 2}}></div>
          // <div style={{'backgroundColor': 'orange', width:'100%', paddingTop: 50, borderRadius: 25}}></div>
          // <p>
          //   experiment
          // </p>
    return <div id="primaryContainer" className="primaryContainer clearfix">
      <div id="PhoneContainer" className="">
        <HeaderNav />
        <iGluco.Icons icons={icons}/>
        <div style={{'fontSize':'2em', color: 'blue', zIndex: 100, backgroundColor: 'aqua'}} >
        </div>

        <HelpPanel />
        <FooterButton />
      </div>
    </div>
  }
})
