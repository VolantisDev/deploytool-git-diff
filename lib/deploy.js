/**
 * Created by Ben on 6/24/2016.
 */

var fs = require("fs");
var deploytool = require('deploytool');
var getFiles = require('./get-files');
var getDirs = require('./get-dirs');

module.exports = function (environment, commit, callback) {
  environment = deploytool.environment.init(environment, {
    type: 'git-diff',
    deployedCommit: '',
    deployedFile: __dirname + '/.deployed'
  });

  var config = environment.config;
  var currentRef = commit || config.branch;
  var deployed = new deploytool.deployed(config);

  deployed.get(function (error, deployedRef) {
    if (error) {
      console.error('Could not determine previously-deployed commit');
      callback(error);
      return;
    }
    
    getFiles(currentRef, deployedRef, function (error, files) {
      if (error) {
        console.error('Error retrieving diff of files from Git');
        callback(error);
        return;
      }
      
      getDirs(files, function (error, dirs) {
        if (error) {
          console.error('Error retrieving list of modified directories');
        } else {
          files.dirs = dirs;
        }
        
        callback(error, files);
      });
    });
  });
};
