'use strict';
var css = require('css');
var _ = require('underscore');

/**
 * HTML Purifier Style Parser Filterer.
 *
 * @impl validate
 */

 var blacklist = {
   'position': [ 'absolute' ]
 }

/**
 * Removes all tags from HTML leaving only style tags.
 *
 * @cb err, string
 * @param cssInput string
 */
function filter(cssInput, cb) {

  var sheet = css.parse(cssInput, { silent: true });

  sheet = filterStylesheet(sheet);

  cb(null, css.stringify(sheet));
}

function filterStylesheet(sheet) {

  // Iterate through rules/declarations and strip out forbidden elements!

  _.each(sheet.stylesheet.rules, filterRules, this);

  return sheet;
}

function filterRules(rule, index, list) {
  // Remove blacklisted rules
  rule.declarations = _.filter(rule.declarations, filterDeclarations, this);
}

function filterDeclarations(declaration) {
  // Remove blacklisted declarations
  if (declaration.type !== 'declaration') {
    return true;
  }

  var property = declaration.property;

  if (property == '') {
    return true;
  }

  if (blacklist[property] == undefined) {
    return true;
  }

  var blacklisted = _.contains(blacklist[property], declaration.value);

  return !blacklisted;
}


exports.filter = filter;
