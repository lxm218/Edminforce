// This section sets up some basic app metadata,
// the entire section is optional.
App.info({
  id: 'com.ihealth.mobileframework',
  name: 'Mobile Framework',
  description: 'Mobile Framework',
  author: 'iHealth',
  email: 'jason.lee@ihealthlabs.com',
  website: 'http://ihealthlabs.com'
})

App.setPreference('StatusBarOverlaysWebView', 'false');
App.setPreference('StatusBarBackgroundColor', '#fff');
App.setPreference('orientation', 'portrait');

App.accessRule('*')
