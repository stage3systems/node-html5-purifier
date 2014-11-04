'use strict';
/**
 * HTML Purifier Namespacer Prefixer
 */

/**
 * Attaches a prefix to the beginning of the provided text. ie) "ugc-class"
 *
 * @param prefix string The prefix to add to the text, ie) "ugc-"
 * @param text string The text to prefix, ie) "class"
 */
function prepend(prefix, text) {
  return prefix + text;
}


exports.prepend = prepend;
