  var mkPlist = (bundleID, title) => {
    var template = `<plist version="1.0">
  <dict>
  <key>items</key>
  <array>
  <dict>
  <key>assets</key>
  <array>
  <dict>
  <key>kind</key>
  <string>software-package</string>
  <key>url</key>
  <string>${Meteor.absoluteUrl('ios-debug.ipa')}</string>
  </dict>
  </array>
  <key>metadata</key>
  <dict>
  <key>bundle-identifier</key>
  <string>${bundleID}</string>
  <key>kind</key>
  <string>software</string>
  <key>title</key>
  <string>${title}</string>
  </dict>
  </dict>
  </array>
  </dict>
  </plist>
  `
    return template;
  };

if(Meteor.isClient) {
  Download = React.createClass({
    render() {
      var plistUrl = Meteor.absoluteUrl('ios.plist');
      if(plistUrl.indexOf('https') === -1) console.error('ROOT_URL is not https. iOS install will not work. URL given: ' + plistUrl)
      return <div style={{backgroundColor: 'grey', padding: 15, position: 'absolute', top: 0, right: 0, bottom: 0, left: 0}}>
          <div style={{borderRadius: 5, backgroundColor: 'white', padding: 15, fontSize: 12, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <a href={"itms-services://?action=download-manifest&url="+plistUrl} style={{maxWidth: '50%'}}>
              <img src='/packages/ihealth_appdownload/assets/AppleAppStore.png' style={{maxWidth: '100%'}}/>
            </a>
            <a href="/android-debug.apk" style={{marginTop: '5%', maxWidth: '50%'}}>
              <img src='/packages/ihealth_appdownload/assets/GooglePlayStore.png' style={{maxWidth: '100%'}}/>
            </a>
          </div>
        </div>
    }
  })

  FlowRouter.route("/download", {
    name: "download",
    action: function(p) {
      ReactLayout.render( Download)
    }
  });
};
// FlowRouter.route("/ios.plist", {
//   action: function() {
//     var content = mkPlist('com.ihealth.plugins', 'Plugins');
//     console.log('content', content)
//     var blob = new Blob([content], {type: "text/plain;charset=utf-8"});
//     saveAs(blob, "ios.plist");
//   }
// });
if(Meteor.isServer) {
  Meteor.startup(function(){
    var fs = Npm.require('fs');
    __ROOT_APP_PATH__ = fs.realpathSync('.');
    var filePath = __ROOT_APP_PATH__.replace(/\/server$/, '/web.browser/app/ios.plist');
    console.log('filePath:', filePath)

    if(!fs.existsSync(filePath)) {
      if(!Meteor.settings.bundleID || !Meteor.settings.title) {
        console.error('bundleID && title are required in Meteor settings')
        console.warn((Meteor.settings.bundleID, Meteor.settings.title));
      } else {
        var bundleID = Meteor.settings.bundleID
        var title = Meteor.settings.title
        var content = mkPlist(bundleID, title)
        var buffer = new Buffer( content ) ;
        fs.writeFileSync( filePath, buffer ) ;
      }
    };
  });
};
