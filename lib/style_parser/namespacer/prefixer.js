'use strict';
var css = require('css');
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

function strip(styles, prefix, cb) {
  var obj = css.parse(styles);
  var sheet = obj.stylesheet;
  var outputCache = [];
  var selectors = [];
  var rules = [];
  var isReverted = false;
  sheet.rules.forEach(function(rule) {
    rule.selectors.forEach(function(selector) {
      if (selector.indexOf(prefix) > -1) {
        selectors.push(selector.replace(prefix, '').trim());
        isReverted = true;
      } else {
        selectors.push(selector);
      }
    });
    outputCache.push(selectors.join(', '));
    outputCache.push(' { ');
    rule.declarations.forEach(function(declaration) {
      rules.push(declaration.property + ':' + declaration.value + '; ');
    });
    outputCache.push(rules.join('\n'));
    outputCache.push('}');
  });
  cb(null, outputCache.join(''), isReverted);
}


exports.prepend = prepend;
exports.strip = strip;
