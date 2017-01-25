'use strict';
var css = require('css');
/**
 * Style Namespacer Postfixer.
 *
 * @impl postfix
 */

/**
 * Postfixes the given styles.
 *
 * @cb err, string
 */
function append(styles, postfix, cb) {
  var obj = css.parse(styles);
  var sheet = obj.stylesheet;
  sheet.rules.forEach(function(rule, ruleIndex) {
    if (rule.type === 'rule') {
      rule.selectors.forEach(function(selector, selectorIndex) {
        if (selector.indexOf(':') > -1) {
          var selectorHash = selector.split(":");
          obj.stylesheet.rules[ruleIndex].selectors[selectorIndex] = selectorHash[0] + postfix + ':' + selectorHash[1];
        } else {
          obj.stylesheet.rules[ruleIndex].selectors[selectorIndex] = selector + postfix;
        }
      });
    }
  });
  cb(null, css.stringify(obj));
}

function strip(styles, postfix, cb) {
  var obj = css.parse(styles);
  var sheet = obj.stylesheet;
  var isReverted = false;
  sheet.rules.forEach(function(rule, ruleIndex) {
    if (rule.type === 'rule') {
      rule.selectors.forEach(function(selector, selectorIndex) {
        if (selector.indexOf(postfix) > -1) {
          obj.stylesheet.rules[ruleIndex].selectors[selectorIndex] = selector.replace(postfix, '').trim();
          isReverted = true;
        }
      });
    }
  });

  cb(null, css.stringify(obj), isReverted);
}



exports.append = append;
exports.strip = strip;
