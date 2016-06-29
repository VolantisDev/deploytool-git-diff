/**
 * Created by Ben on 6/25/2016.
 */

var dirEmpty = require('./dir-empty');
var async = require("async");

function getDir(file) {
  return file.substring(0, file.lastIndexOf('/'));
}

module.exports = function (files, callback) {
  var dirs = {
    needed: [],
    notNeeded: []
  };

  var dir = '';
  files.modified.forEach(function (file) {
    var thisDir = getDir(file);

    if (thisDir && thisDir != '/' && dir != thisDir) {
      dir = thisDir;

      if (cleanupDirs.needed.indexOf(dir) == -1) {
        cleanupDirs.needed.push(dir);
      }
    }
  });

  async.each(files, function (file, callback) {
    var dir = getDir(file);

    if (dir && dir != '/' && cleanupDirs.needed.indexOf(dir) == -1 && cleanupDirs.notNeeded.indexOf(dir) == -1) {
      dirEmpty(dir, function (error, empty) {
        if (error) {
          callback(error);
        }

        if (empty && cleanupDirs.notNeeded.indexOf(dir) == -1) {
          cleanupDirs.notNeeded.push(dir);
        }
      });
    }
  }, function (err) {
    if (err) {
      console.error('Could not determine list of needed and not needed directories');
    }

    callback(err, cleanupDirs);
  });
};
