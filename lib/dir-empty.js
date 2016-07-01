/**
 * Created by Ben on 6/25/2016.
 */

var deploytool = require('deploytool')

module.exports = function (dir) {
  return new Promise(function (resolve, reject) {
    deploytool.cmd
      .execute('git ls-files --directory --no-empty-directory ' + dir)
      .then(function (stdout) {
        resolve((stdout.trim()))
      })
      .catch(reject)
  })
}
