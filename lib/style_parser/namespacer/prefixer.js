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

function strip(htmlInput, prefix, cb) {
  // /(\.|#)  find any period or hash symbol (css id or class symbol)
  // (-?[_a-z]+[_a-z0-9\-]*)  any valid class or id name
  // (?=[^}]+\{)/             get everything inside the style block { }


  var attrMatcher = /(\.|#)(-?[_a-z]+[_a-z0-9\-]*)(?=[^}]+\{)/gi;
  // matches either prefix or postfix in attribute
  var classMatcher = new RegExp('(?:(' + prefix +')*)','g');

  //if we find a class, check it for prefix
  var result = htmlInput.replace(attrMatcher, function(full, capture1, capture2){
    //remove prefix and return
    var stripped = capture2.replace(classMatcher, "");
    return capture1 + stripped;
  });
  cb(null, result);
}

exports.prepend = prepend;
exports.strip = strip;
