var path = require('path');

module.exports = {
  browser:'phantomjs', //phantomjs chrome
  watchTags: '@focus',
  path: path.resolve('./'),
  domainSteps: path.resolve('./step_definitions/domain'),
  e2eSteps:path.resolve('./step_definitions/e2e'),
  serverHost: 'localhost',
  serverPort:8000,

};
