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

      if (dirs.needed.indexOf(dir) == -1) {
        dirs.needed.push(dir);
      }
    }
  });

  async.each(files, function (file, callback) {
    var dir = getDir(file);

    if (dir && dir != '/' && dirs.needed.indexOf(dir) == -1 && dirs.notNeeded.indexOf(dir) == -1) {
      dirEmpty(dir, function (error, empty) {
        if (error) {
          callback(error);
        }

        if (empty && dirs.notNeeded.indexOf(dir) == -1) {
          dirs.notNeeded.push(dir);
        }
      });
    }
  }, function (err) {
    if (err) {
      console.error('Could not determine list of needed and not needed directories');
    }

    callback(err, dirs);
  });
};
