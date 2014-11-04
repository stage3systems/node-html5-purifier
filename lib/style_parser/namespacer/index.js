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
      prefixer.prepend(styles, prefix, cb);
    },
    // postfix styles
    function(prefixedStyles, cb) {
      postfixer.append(prefixedStyles, postfix, cb);
    }
  ], cb);
}


exports.namespace = namespace;
