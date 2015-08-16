// This section sets up some basic app metadata,
// the entire section is optional.
App.info({
  id: 'com.ihealth.mobileframework',
  name: 'iHealth Mobile Framework',
  description: 'iHealth Mobile Framework',
  author: 'iHealth',
  email: 'jason.lee@ihealthlabs.com',
  website: 'http://ihealthlabs.com'
})

App.configurePlugin('com.ihealth.plugin.bpmanagercordova', {
  APP_ID: '2015042801',
  API_KEY: 'supersecretapikey',
  APP_NAME: 'BpManagerCordova'
})

App.setPreference('StatusBarOverlaysWebView', 'false');
App.setPreference('StatusBarBackgroundColor', '#ffffff');
App.setPreference('Orientation', 'portrait');
