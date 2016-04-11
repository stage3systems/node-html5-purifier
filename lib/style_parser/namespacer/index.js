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

function stripNamespace(styles, prefix, postfix, cb) {
  async.waterfall([
    // strip styles
    function(cb) {
      if (prefix) {
        async.whilst(function() {
          return (styles.indexOf(prefix) > -1);
        }, function(cb) {
          prefixer.strip(styles, prefix, function(err, reverted) {
            styles = reverted;
            cb();
          });
        }, function(err) {
          if (err) return cb(err);
          return cb(null, styles);
        });
      } else {
        cb(null, styles);
      }
    },
    // strip styles
    function(prefixedStyles, cb) {
      if (postfix) {
        async.whilst(function() {
          return (styles.indexOf(postfix) > -1);
        }, function(cb) {
          postfixer.strip(styles, postfix, function(err, reverted) {
            styles = reverted;
            cb();
          });
        }, function(err) {
          if (err) return cb(err);
          return cb(null, styles);
        });
      } else {
        cb(null, prefixedStyles);
      }
    }
  ], cb);
}




exports.namespace = namespace;
exports.stripNamespace = stripNamespace;
