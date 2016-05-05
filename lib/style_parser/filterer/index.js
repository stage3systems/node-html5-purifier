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

  if (sheet.stylesheet.parsingErrors.length > 0) {
    // css has invalid declarations, which has the potential to cause css.stringify to have a syntax error
    // for now just remove this css until we have a more comprehensive solution to auto-fix
    return cb(null, '');
  }

  sheet = filterStylesheet(sheet);
  cb(null, css.stringify(sheet));
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
