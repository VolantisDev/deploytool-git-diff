/**
 * Created by Ben on 6/24/2016.
 */

var deploytool = require('deploytool')

module.exports = function (currentRef, previousRef) {
  return new Promise(function (resolve, reject) {
    deploytool.cmd
      .execute('git diff --name-status ' + previousRef + ' ' + currentRef)
      .then(function (stdout) {
        var files = {
          modified: [],
          deleted: []
        };

        var lines = stdout.split('\n')

        lines.forEach(function (line) {
          var parts = line.split(/\s+/)
          var operation = parts[0].trim()
          var file = parts[1].trim()

          if (operation == 'D') {
            files.deleted.push(file)
          } else {
            files.modified.push(file)
          }
        })

        resolve(files)
      })
      .catch(reject)
  })
}
