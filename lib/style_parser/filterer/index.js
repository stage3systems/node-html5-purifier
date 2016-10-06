var _ = require('underscore');
var css = require('css');

/**
 * HTML Purifier Style Parser Filterer.
 *
 * @impl validate
 */

 var blacklist = {
   'position': [ 'absolute' ]
 };

/**
 * Removes all tags from HTML leaving only style tags.
 *
 * @cb err, string
 * @param cssInput string
 */
function filter(cssInput, cb) {
  // Remove HTML comment start/end
  cssInput = removeHtmlComments(cssInput);
  var sheet = css.parse(cssInput, { silent: true });
  var errors = sheet.stylesheet.parsingErrors;
  if (errors.length > 0) {
    sheet = handleParsingErrors(sheet);
  }
  sheet = filterStylesheet(sheet);
  cb(null, css.stringify(sheet));
}

/**
 * Removes rules which are invalid
 *
 * @param sheet Array
 */
function handleParsingErrors(sheet) {
  var rules = sheet.stylesheet.rules;
  var rule;
  // remove the rules which have undefined declarations, these rules cause error with stringify
  for( var ruleIndex = 0; ruleIndex<rules.length; ++ruleIndex) {
    rule = rules[ruleIndex];
    if (typeof rule.declarations === 'undefined') {
      sheet.stylesheet.rules.splice(ruleIndex, 1);
    }
  }

  return sheet;
}

function removeHtmlComments(rawCss) {
  // HTML comments aren't valid in CSS, and our CSS parser will remove
  //   the closing tag, breaking the display in some browsers
  return rawCss.replace(/<\!\-\-/g, '').replace(/\-\-\>/g, '');
}

function filterStylesheet(sheet) {
  // Iterate through rules/declarations and strip out forbidden elements!
  _.each(sheet.stylesheet.rules, filterRules, this);
  return sheet;
}

function filterRules(rule) {
  // Remove blacklisted rules
  rule.declarations = _.filter(rule.declarations, filterDeclarations, this);
}

function filterDeclarations(declaration) {
  // Remove blacklisted declarations
  if (declaration.type !== 'declaration') {
    return true;
  }

  var property = declaration.property;

  if (property === '') {
    return true;
  }

  if (blacklist[property] === undefined) {
    return true;
  }

  var blacklisted = _.contains(blacklist[property], declaration.value);

  return !blacklisted;
}

exports.filter = filter;
