/**
 * Created by Ben on 6/25/2016.
 */

var Promise = require('bluebird')
var dirEmpty = require('./dir-empty')

function getDir(file) {
  return file.substring(0, file.lastIndexOf('/'))
}

function getDirsNeeded(files) {
  var dirs = []
  var dir = ''

  files.modified.forEach(function (file) {
    var thisDir = getDir(file)

    if (thisDir && thisDir != '/' && dir != thisDir) {
      dir = thisDir

      if (dirs.needed.indexOf(dir) == -1) {
        dirs.needed.push(dir)
      }
    }
  })

  return dirs
}

function getDirsNotNeeded(files, needed) {
  var dirs = {}

  return Promise
    .each(files, function (file) {
      var dir = getDir(file)

      if (dir && dir != '/' && needed.indexOf(dir) == -1 && dirs.indexOf(dir) == -1) {
        dirEmpty(dir, function (error, empty) {
          if (error) {
            callback(error)
          }

          if (empty && dirs.indexOf(dir) == -1) {
            dirs.push(dir)
          }
        })
      }
    })
    .then(function () {
      return dirs
    })
}

module.exports = function (files) {
  var dirs = {
    needed: getDirsNeeded(files)
  }

  return new Promise(function (resolve, reject) {
    getDirsNotNeeded(files, dirs.needed)
      .then(function (dirsNotNeeded) {
        dirs.notNeeded = dirsNotNeeded

        files.dirs = dirs

        resolve(files)
      })
      .catch(reject)
  })
}
