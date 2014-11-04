'use strict';
/**
 * HTML Purifier Style Parser Sanitizer Whitelister.
 */

/**
 * The list of tags that are not removed from the html input.
 * TODO: should read in the whitelist once from a config file on construction
 */
var whitelist = [
  'style',
];

/**
 * Verifies the provided tag is in the whitelist.
 *
 * @param tagName string
 * @return boolean
 */
function verify(tagName) {
  for (var i = 0; i < whitelist.length; i++)
    if (tagName === whitelist[i])
      return true;

  return false;
}


exports.verify = verify;
