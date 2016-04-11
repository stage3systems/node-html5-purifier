'use strict';
var css = require('css');
/**
 * Style Namespacer Postfixer.
 *
 * @impl postfix
 */

/**
 * Postfixes the given styles.
 *
 * @cb err, string
 */
function append(styles, postfix, cb) {
  /* TODO
  // add a newline after each } to force next declaration to be on its own line
  $styles_prefixed = str_replace('}', "}\n", $styles_prefixed);
  */

  //var postfixed = styles.replace(/(,?\h+|\h+(-?[_a-z]+[_a-z0-9-]*)+\h*|\n)(a|abbr|address|area|article|aside|audio|b|base|bdo|blockquote|body|br|button|canvas|caption|cite|code|col|colgroup|command|datalist|dd|del|details|dfn|div|dl|dt|em|embed|eventsource|fieldset|figcaption|figure|footer|form|h1|h2|h3|h4|h6|head|header|hgroup|hr|i|img|input|ins|kbd|keygen|label|legend|li|link|mark|map|menu|meta|meter|nav|ol|optgroup|option|output|p|param|pre|progress|q|ruby|rp|rt|samp|section|select|small|source|span|strong|sub|summary|sup|table|tbody|td|textarea|tfoot|th|thead|time|title|tr|ul|var|video|wbr)(\h*,|:[a-z-\(\)]+|\h*{)/ig, '$1' + postfix + '$2');
  var postfixed = styles.replace(/(a|abbr|address|area|article|aside|audio|b|base|bdo|blockquote|body|br|button|canvas|caption|cite|code|col|colgroup|command|datalist|dd|del|details|dfn|div|dl|dt|em|embed|eventsource|fieldset|figcaption|figure|footer|form|h1|h2|h3|h4|h6|head|header|hgroup|hr|i|img|input|ins|kbd|keygen|label|legend|li|link|mark|map|menu|meta|meter|nav|ol|optgroup|option|output|p|param|pre|progress|q|ruby|rp|rt|samp|section|select|small|source|span|strong|sub|summary|sup|table|tbody|td|textarea|tfoot|th|thead|time|title|tr|ul|var|video|wbr)(\s*,|:[a-z-\(\)]+|\s*{)/ig, '$1' + postfix + '$2');
/*
  // add postfix to add tags without a class/id
  $styles_prefixed = "\n".$styles_prefixed;
  $regex = '/(,?\h+|\h+(-?[_a-z]+[_a-z0-9-]*)+\h*|\n)'; // match any comma, space, class name, or newline (before, so we know it's in the selector part of the css file)

  $regex .= '(a|abbr|address|area|article|aside|audio|b|base|bdo|blockquote|body|br|button|canvas|caption|cite|code|col|colgroup|command|datalist|dd|del|details|dfn|div|dl|dt|em|embed|eventsource|fieldset|figcaption|figure|footer|form|h1|h2|h3|h4|h6|head|header|hgroup|hr|i|img|input|ins|kbd|keygen|label|legend|li|link|mark|map|menu|meta|meter|nav|ol|optgroup|option|output|p|param|pre|progress|q|ruby|rp|rt|samp|section|select|small|source|span|strong|sub|summary|sup|table|tbody|td|textarea|tfoot|th|thead|time|title|tr|ul|var|video|wbr)'; // match any valid tag
  $regex .= '(\h*,|:[a-z-\(\)]+|\h*{)/iu'; // match spaces, or another, or a pseudo selector, or {
  $styles_prefixed = preg_replace($regex, '$1$3.'.Sanitizer::CSS_POSTFIX.'$4', $styles_prefixed);
  $styles_prefixed = trim($styles_prefixed); // remove leading new line

  return $styles_prefixed;
  */
  cb(null, postfixed);
}

function strip(styles, postfix, cb) {

  var obj = css.parse(styles);
  var sheet = obj.stylesheet;
  var outputCache = [];
  var selectors = [];
  var rules = [];
  sheet.rules.forEach(function(rule) {
    rule.selectors.forEach(function(selector) {
      selectors.push(selector.replace(postfix, '').trim());
    });
    outputCache.push(selectors.join(', '));
    outputCache.push(' { ');
    rule.declarations.forEach(function(declaration) {
      rules.push(declaration.property + ':' + declaration.value + '; ');
    });
    outputCache.push(rules.join('/n'));
    outputCache.push('}');
  });

  cb(null, outputCache.join(''));
}



exports.append = append;
exports.strip = strip;
