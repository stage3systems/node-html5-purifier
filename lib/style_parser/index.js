'use strict';
var async = require('async');
var namespacer = require('./namespacer');
var sanitizer = require('./sanitizer');

/**
 * HTML Purifier Style Parser.
 *
 * @impl purify
 */

/**
 * Removes all tags except style tags, then adds the given prefix
 * and postfix to the provided css input.
 *
 * @cb err, string
 * @pattern facade
 */
function parse(cssInput, prefix, postfix, cb) {
  async.waterfall([
    // remove everything except style tag contents
    function(cb) {
      sanitizer.sanitize(cssInput, cb);
    },
    // namespace sanitized style tag contents
    function(sanitizedHtml, cb) {
      namespacer.namespace(sanitizedHtml, prefix, postfix, cb);
    }
  ], cb);
}

/**
 * Removes all tags except style tags, then removes the given prefix
 * and postfix from the provided css input.
 *
 * @cb err, string
 * @pattern facade
 */
function parsePurified(cssInput, prefix, postfix, cb) {
  async.waterfall([
    // remove everything except style tag contents
    function(cb) {
      sanitizer.sanitize(cssInput, cb);
    },
    // strip namespace
    function(sanitizedHtml, cb) {
      namespacer.stripNamespace(sanitizedHtml, prefix, postfix, cb);
    }
  ], cb);
}


exports.parse = parse;
exports.parsePurified = parsePurified;
