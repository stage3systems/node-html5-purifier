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
 * @param String htmlInput
 * @param Object options
 * @cb err, string
 */
function purify(htmlInput, options, cb) {
  if (typeof htmlInput === 'undefined') {
    return cb(null, '');
  }

  var prefix = options.prefix;
  var postfix = options.postfix;
  async.parallel([
    // purify style tag contents
    function(cb) {
      const stylePostfix = options.postfix === undefined ? undefined : '.' + options.postfix;
      styleParser.parse(htmlInput, prefix, stylePostfix, cb);
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

/**
 * Strips provided prefix and postfix from id and class attributes
 *
 * @param String htmlInput
 * @param Object options
 * @cb err, string
 */
function revertNamespace(htmlInput, options, cb) {
  if (typeof htmlInput === 'undefined') {
    return cb(null, '');
  }

  var prefix = options.prefix;
  var postfix = options.postfix;
  async.parallel([
    // purify style tag contents
    function(cb) {
      styleParser.parsePurified(htmlInput, prefix, '.' + postfix, cb);
    },
    // purify html body contents
    function(cb) {
      htmlParser.parsePurified(htmlInput, prefix, postfix, cb);
    },
  ], function(err, results) {
    if (err) return cb(err);

    cb(null, results.join(''));
  });
}


exports.purify = purify;
exports.revertNamespace = revertNamespace;
