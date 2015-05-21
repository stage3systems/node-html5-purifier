'use strict';
var async = require('async');
var attributeValidator = require('./attribute_validator');
var namespacer = require('./namespacer');
var pcdataValidator = require('./pcdata_validator');
var sanitizer = require('./sanitizer');
var tagValidator = require('./tag_validator');

/**
 * HTML Purifier HTML Parser
 *
 * @impl parse
 */

/**
 * Removes unwhitelisted tags and attributes from the provided htmlInput. In
 * addition, id and class attributes are namespaced with the provided prefix and
 * postfix.
 *
 * @cb err, string
 * @pattern facade
 */
function parse(htmlInput, prefix, postfix, cb) {
  async.waterfall([
    // remove invalid pcdata, ie) <![if mso ...]>
    function(cb) {
      pcdataValidator.filter(htmlInput, cb);
    },
    // sanitize - caja sanitizes, tag balances, and converts html entities
    function(pcdataValidated, cb) {
      sanitizer.sanitize(pcdataValidated, cb);
    },
    // remove all tags that are not on the tags whitelist
    function(sanitizedHtml, cb) {
      tagValidator.validate(sanitizedHtml, cb);
    },
    // remove all tags that are not on the attributes whitelist
    function(tagValidatedHtml, cb) {
      attributeValidator.validate(tagValidatedHtml, cb);
    },
    // namespace id and class attributes
    function(attributeSanitizedHtml, cb) {
      namespacer.namespace(attributeSanitizedHtml, prefix, postfix, cb);
    },
  ], cb);
}


exports.parse = parse;
