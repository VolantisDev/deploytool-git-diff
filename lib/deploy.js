/**
 * Created by Ben on 6/24/2016.
 */

var fs = require("fs");
var deploytool = require('deploytool');
var getFiles = require('./get-files');
var getDirsForCleanup = require('./get-dirs');

function deployToDestination(files, config) {
  // TODO: Deploy here via vinyl

  if (config.cleanupCallback.isFunction) {
    // TODO: Call cleanup callback and wait for its callback to complete
  }

  if (config.completeCallback.isFunction) {
    // TODO: Call completeCallback
  }
}

/**
 * @param {{config:{commit:string}}}environment
 * @param callback
 */
module.exports = function (environment, callback) {
  environment = deploytool.environment.init(environment, {
    type: 'git-diff',
    destination: '',
    cleanupCallback: null,
    completeCallback: null
  });

  if (!environment.config.destination) {
    callback(new Error('Destination must be specified'));

    return;
  }

  var currentRef = environment.config.commit || environment.config.branch;

  deploytool.previousCommit(environment.config, function (error, lastRef) {
    if (error) {
      console.error('Could not determine previous reference to compare against', error);
    } else {
      console.log('Getting a file diff between ' + lastRef + ' and ' + currentRef);

      getFiles(currentRef, lastRef, function (error, files) {
        if (error) {
          console.error('Error retrieving list of files from git diff', error);
          callback(error);
        } else {
          getDirsForCleanup(files, function (error, dirs) {
            if (error) {
              console.error('Error retrieving list of directories for cleanup', error);
            } else {
              files.cleanupDirs = dirs;
            }

            callback(error, files);
          });
        }
      });
    }
  });
};
