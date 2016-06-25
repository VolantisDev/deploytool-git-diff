/**
 * Created by Ben on 6/25/2016.
 */
var deploytool = require('deploytool');
var deploy = require('./deploy');

module.exports = function (environment, commit, callback) {
  environment = deploytool.environment.initialize(environment, {
    type: 'git-deploy-files',
    remotePath: ''
  });

  var config = environment.config;

  if (!config.remotePath) {
    callback(new Error('remotePath must be specified'));

    return;
  }

  console.log('Starting ' + config.type + ' deployment in ' + config.name + ' environment');

  deploy(environment, commit, function (error, files) {
    if (error) {
      console.error('Error retrieving diff of files to deploy', error);

      callback(error);
      return;
    }

    callback(error, files);
  });
};
