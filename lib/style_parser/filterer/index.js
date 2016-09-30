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
  cssInput = handleParsingErrors(cssInput);
  var sheet = css.parse(cssInput, { silent: true });
  sheet = filterStylesheet(sheet);
  cb(null, css.stringify(sheet));
}

/**
 * Removes styles which are invalid
 *
 * @param cssInput string
 */
function handleParsingErrors(cssInput) {
  var sheet = css.parse(cssInput, { silent: true });
  var errors = sheet.stylesheet.parsingErrors;
  if (errors.length > 0) {
    // css has invalid declarations, which has the potential to cause css.stringify to have a syntax error
    // for now we are just removing the line that has invalid css, ideally we should auto fix it
    for( var i=0; i<errors.length; ++i) {
      if(errors[i].line) {
        cssInput = cssInput.split("\n").slice(errors[i].line).join("\n")
      }
    }
  }
  return cssInput;
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
