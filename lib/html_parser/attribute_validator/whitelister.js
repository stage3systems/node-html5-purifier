'use strict';
/**
 * HTML Purifier Attribute Sanitizer Whitelister
 *
 * @impl verify
 */

/**
 * The list of attributes that are not removed from the html attributes.
 * TODO: should read in the whitelist once from a config file on construction
 */
var whitelist = [
  'align',
  'bgcolor',
  'border',
  'class',
  'color',
  'colspan',
  'data-attachment-id',
  'font-face',
  'face',
  'height',
  'href',
  'id',
  'name',
  'size',
  'src',
  'style',
  'valign',
  'width',
];

/**
 * Verifies the provided tag is in the whitelist.
 *
 * @param attributeName string
 */
function verify(attributeName) {
  for (var i = 0; i < whitelist.length; i++) {
    if (attributeName === whitelist[i]) {
      return true;
    }
  }

  return false;
}


exports.verify = verify;
