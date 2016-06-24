/**
 * Created by Ben on 6/24/2016.
 */

var fs = require("fs");
var deploytool = require('deploytool');
var getFiles = require('./get-files');

module.exports = function (environment, commit, callback) {
  if (typeof environment === 'string') {
    environment = deploytool.environment.load(environment);
  }

  environment.applyDefaults({
    type: 'git-diff',
    deployedCommit: '',
    deployedFile: __dirname + '/.deployed'
  });

  var config = environment.config;

  var currentRef = commit || config.branch;

  deploytool.previousCommit(config, function (error, lastRef) {
    if (error) {
      console.error('Could not determine previous reference to compare against', error);
    } else {
      console.log('Getting a file diff between ' + lastRef + ' and ' + currentRef);

      getFiles(currentRef, lastRef, function (error, files) {
        if (error) {
          console.error('Error retrieving list of files from git diff', error);
        } else {
          console.log('Successfully retrieved list of files from git diff');
        }

        callback(error, files);
      });
    }
  });
};
