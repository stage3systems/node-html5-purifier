'use strict';
var fs = require('fs');

/**
 * HTML Purifier HTML Parser PCDATA Validator Component
 *
 * @impl filter
 */

/**
 * Returns a tag with square brackets replaced.
 *
 * @param tag
 * @return string
 */
function _escapeSquareBrackets(tag) {
  // escape left square brackets
  var leftEscaped = tag.replace(new RegExp('\\[', 'gi'), '\\[');
  // escape right square brackets
  var escaped = leftEscaped.replace(new RegExp('\\]', 'gi'), '\\]');

  return escaped;
}

/**
 * Removes all blacklisted pcdata (parsed character data) from the provided HTML
 * string.
 *
 * @cb err, string
 * @param html string The HTML string to process
 */
function filter(html, cb) {
  _getBlacklist(function(err, blacklist) {
    for (var i = 0; i < blacklist.length; i++) {
      var escaped = _escapeSquareBrackets(blacklist[i]);
      html = html.replace(new RegExp(escaped, 'gi'), '');
    }

    cb(null, html);
  });
}

/**
 * Reads in the tag blacklist from the configuration file.
 *
 * @cb err, [ string ]
 */
function _getBlacklist(cb) {
  fs.readFile(__dirname + '/config/blacklist.json', {
    encoding: 'utf8'
  }, function(err, data) {
    if (err)
      return cb(err);

    var parsed = JSON.parse(data);

    cb(null, parsed.blacklist);
  });
}


exports._escapeSquareBrackets = _escapeSquareBrackets; // @test
exports._getBlacklist = _getBlacklist; // @test
exports.filter = filter;
