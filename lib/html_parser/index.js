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
      if (typeof prefix !== 'undefined' || typeof postfix !== 'undefined') {
        namespacer.namespace(attributeSanitizedHtml, prefix, postfix, cb);
      } else {
        cb(null, attributeSanitizedHtml);
      }
    },
  ], cb);
}

function parsePurified(htmlInput, prefix, postfix, cb) {
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
    function(attributeSanitizedHtml, cb) {
      // strip prefix and postfix from id and class attributes recursively
      if (typeof prefix !== 'undefined' || typeof postfix !== 'undefined') {
        var isReplaced = true;
        async.whilst(function() {
          return isReplaced;
        }, function(cb) {
          namespacer.stripNamespace(attributeSanitizedHtml, prefix, postfix, function(err, revertedHtml, replaced) {
            attributeSanitizedHtml = revertedHtml;
            isReplaced = replaced;
            cb();
          });
        }, function(err) {
          if (err) return cb(err);
          return cb(null, attributeSanitizedHtml);
        });
      } else {
        cb(null, attributeSanitizedHtml);
      }
    },
  ], cb);
}


exports.parse = parse;
exports.parsePurified = parsePurified;
