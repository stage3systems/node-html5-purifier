'use strict';
var async = require('async');
var postfixer = require('./postfixer.js');
var prefixer = require('./prefixer.js');

/**
 * Style Namespacer.
 *
 * @impl namespace
 */

/**
 * Namespaces styles with the provided prefix and postfixes.
 *
 * @cb err, string
 */
function namespace(styles, prefix, postfix, cb) {
  async.waterfall([
    // prefix styles
    function(cb) {
      if (prefix) {
        prefixer.prepend(styles, prefix, cb);
      } else {
        cb(null, styles);
      }
    },
    // postfix styles
    function(prefixedStyles, cb) {
      if (postfix) {
        postfixer.append(prefixedStyles, postfix, cb);
      } else {
        cb(null, prefixedStyles);
      }
    }
  ], cb);
}


exports.namespace = namespace;
