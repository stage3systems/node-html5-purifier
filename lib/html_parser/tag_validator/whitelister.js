'use strict';
var _ = require('underscore');

/**
 * HTML Purifier Tag Sanitizer Whitelister Component
 */

/**
 * The list of HTML 4.01 elements that are not removed.
 * Commented elements are deemed to be unsafe.
 *
 * FIXME: Read this list from a config file.
 * @see http://www.w3.org/TR/html401/index/elements.html
 */
var html4Elements = [
  'a',
  'abbr',
  'acronym',
  'address',
  //'applet',
  'area',
  'b',
  'base',
  'basefont',
  'bdo',
  'big',
  'blockquote',
  //'body',
  'br',
  'button',
  'caption',
  'center',
  'cite',
  'code',
  'col',
  'colgroup',
  'dd',
  'del',
  'dfn',
  'dir',
  'div',
  'dl',
  'dt',
  'em',
  'fieldset',
  'font',
  'form',
  //'frame',
  //'frameset',
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
  //'head',
  'hr',
  //'html',
  'i',
  //'iframe',
  'img',
  'input',
  'ins',
  'isindex',
  'kbd',
  'label',
  'legend',
  'li',
  'link',
  'map',
  'menu',
  //'meta',
  //'noframes',
  //'noscript',
  //'object',
  'ol',
  'optgroup',
  'option',
  'p',
  'param',
  'pre',
  'q',
  's',
  'samp',
  //'script',
  'select',
  'small',
  'span',
  'strike',
  'strong',
  //'style',
  'sub',
  'sup',
  'table',
  'tbody',
  'td',
  'textarea',
  'tfoot',
  'th',
  'thead',
  'title',
  'tr',
  'tt',
  'u',
  'ul',
  //'var',
];

/**
 * Contains the list of HTML 5 elements that are not
 * removed. Only contains the tags that are new and not
 * listed in the HTML 4.01 whitelist. Commented elements
 * are deemed to be unsafe.
 *
 * FIXME: Read this list from a config file.
 * @see http://www.w3.org/TR/html-markup/elements.html
 */
var html5Elements = [
  'article',
  'aside',
  'audio',
  'bdi',
  'canvas',
  //'command',
  'datalist',
  'details',
  //'embed',
  'figcaption',
  'figure',
  'footer',
  'header',
  'keygen',
  'mark',
  'meter',
  'nav',
  'output',
  'progress',
  'rp',
  'rt',
  'ruby',
  'section',
  'source',
  'summary',
  'time',
  'track',
  'video',
  'wbr',
];

/**
 * Combines both whitelists for filtering.
 */
var whitelist = _.union(html4Elements, html5Elements);

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
