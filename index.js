/**
 * @author bmcclure
 */

module.exports = {
  requirements: {
    source: "git"
  },
  deploy: require('./lib/deploy'),
  dirEmpty: require('./lib/dir-empty'),
  getDirs: require('./lib/get-dirs'),
  getFiles: require('./lib/get-files')
};
