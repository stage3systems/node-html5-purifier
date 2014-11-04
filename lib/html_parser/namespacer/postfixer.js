'use strict';
/**
 * HTML Purifier Namespacer Prefixer
 */

/**
 * Attaches a postfix to the end of the provided text.
 *
 * @param postfix string The postfix to add to the text, ie) "ugc"
 * @param text string The text to prefix, ie) "class"
 */
function append(postfix, text) {
  return text + '.' + postfix;
}


exports.append = append;
