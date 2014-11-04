'use strict';
/**
 * Style Namespacer Prefixer.
 *
 * @impl prefix
 */

/**
 * Prefixes the given styles.
 *
 * @cb err, string
 */
function prepend(styles, prefix, cb) {
  // clean classes
  // /(\.|#)  find any period or hash symbol (css id or class symbol)
  // (-?[_a-z]+[_a-z0-9\-]*)  any valid class or id name
  // (?=[^}]+\{)/             get everything inside the style block { }
  // $1 = # or .
  // $2 = the class name we need to prefix
  var prefixed = styles.replace(/(\.|#)(-?[_a-z]+[_a-z0-9\-]*)(?=[^}]+\{)/ig, '$1' + prefix + '$2');

  cb(null, prefixed);
}


exports.prepend = prepend;
