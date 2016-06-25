/**
 * Created by Ben on 6/25/2016.
 */

module.exports = function (dir, callback) {
  exec('git ls-files --directory --no-empty-directory ' + dir, { cwd: __dirname}, function (error, stdout) {
    var empty = (!error && stdout.trim());

    callback(error, empty);
  });
};
