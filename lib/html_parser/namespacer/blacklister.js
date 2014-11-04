'use strict';
/**
 * HTML Purifier Namespacer Blacklister
 *
 * @impl verify
 */

/**
 * The list of attributes that are not removed from the html attributes.
 * TODO: should read in the whitelist once from a config file on construction
 */
var blacklist = [
  'style',
];

/**
 * Verifies the provided tag is in the blacklist.
 *
 * @param tagName string
 */
function verify(tagName) {
  for (var i = 0; i < blacklist.length; i++)
    if (tagName === blacklist[i])
      return true;

  return false;
}


exports.verify = verify;
