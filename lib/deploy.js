/**
 * Created by Ben on 6/24/2016.
 */

var Promise = require('bluebird')
var deploytool = require('deploytool')
var getFiles = require('./get-files')
var getDirs = require('./get-dirs')

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
 */
module.exports = function (environment) {
  environment = deploytool.environment.init(environment, {
    type: 'git-diff',
    destination: '',
    cleanupCallback: null,
    completeCallback: null
  })

  var version = new deploytool.version(environment.config)

  return new Promise(function (resolve, reject) {
    if (environment.config.destination) {
      var currentVersion = environment.config.commit || environment.config.branch

      version
        .readDeployed()
        .then(function (deployedVersion) {
          deploytool.notify.info('Getting a file diff between ' + deployedVersion + ' and ' + currentVersion)

          return getFiles(currentVersion, deployedVersion)
        })
        .then(getDirs)
        .then(function (files) {
          return deployToDestination(files, environment.config)
        })
        .then(resolve)
        .catch(reject)
    } else {
      reject(new Error('Destination must be specified'))
    }
  })
}
