'use strict';
var async = require('async');
var htmlParser = require('./html_parser');
var styleParser = require('./style_parser');

/**
 * HTML Purifier Library.
 */

/**
 * Removes unwhitelisted tags and attributes from the provided htmlInput. In
 * addition, id and class attributes are namespaced with the provided prefix and
 * postfix.
 *
 * @cb err, string
 * @pattern facade
 */
function purify(htmlInput, prefix, postfix, cb) {
  async.parallel([
    // purify style tag contents
    function(cb) {
      styleParser.parse(htmlInput, prefix, '.' + postfix, cb);
    },
    // purify html body contents
    function(cb) {
      htmlParser.parse(htmlInput, prefix, postfix, cb);
    },
  ], function(err, results) {
    if (err) return cb(err);

    cb(null, results.join(''));
  });
}


exports.purify = purify;
