/**
 * @author bmcclure
 */

module.exports = {
  deploy: require('./lib/deploy'),
  deployFiles: require('./lib/deploy-files'),
  dirEmpty: require('./lib/dir-empty'),
  getDirs: require('./lib/get-dirs'),
  getFiles: require('./lib/get-files')
};
