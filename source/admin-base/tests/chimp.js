var path = require('path');

module.exports = {
  watchTags: '@focus',
  path: path.resolve('./'),
  domainSteps: path.resolve('./step_definitions/domain'),
  // criticalSteps: path.resolve('./step_definitions/critical'),
  e2eSteps:path.resolve('./step_definitions/e2e'),
  serverHost: 'localhost',
  serverPort:8000,

};
