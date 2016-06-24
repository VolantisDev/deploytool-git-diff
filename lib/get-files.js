/**
 * Created by Ben on 6/24/2016.
 */

var exec = require('child_process').exec;

module.exports = function (currentRef, previousRef, callback) {
  exec('git diff --name-status ' + previousRef + ' ' + currentRef, { cwd: __dirname}, function (error, stdout) {
    var files = {
      modified: [],
      deleted: []
    };

    if (!error) {
      var lines = stdout.split('\n');

      lines.forEach(function (line) {
        var parts = line.split(/\s+/);
        var operation = parts[0].trim();
        var file = parts[1].trim();

        if (operation == 'D') {
          files.deleted.push(file);
        } else {
          files.modified.push(file);
        }
      });
    }

    callback(error, files);
  });
};
