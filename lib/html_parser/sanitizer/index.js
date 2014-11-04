'use strict';
var sanitizer = require('google-caja');

/**
 * Sanitizer
 *
 * @impl sanitize
 */

/**
 * Sanitizes HTML by removing dangerous tags, auto-closing missing tags (aka
 * tag balancing), and converting invalid characters to valid HTML entities.
 *
 * cb err, string
 * @param htmlInput
 * @see http://code.google.com/p/google-caja/wiki/JsHtmlSanitizer
 * @see https://github.com/CLowbrow/node-caja-sanitizer
 */
function sanitize(htmlInput, cb) {
  var sanitized = sanitizer.sanitize(htmlInput, function(href) {
    return href;
  });

  cb(null, sanitized);
}


exports.sanitize = sanitize;
