/**
 * @author bmcclure
 */

module.exports = {
  name: 'git-diff',
  tag: 'deployment',
  init: function () {

  },
  deploy: require('./lib/deploy'),
  deployFiles: require('./lib/deploy-files'),
  dirEmpty: require('./lib/dir-empty'),
  getDirs: require('./lib/get-dirs'),
  getFiles: require('./lib/get-files')
};
