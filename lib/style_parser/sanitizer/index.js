'use strict';
var sanitizer = require('google-caja');
var whitelister = require('./whitelister');
var filterer = require('../filterer');

/**
 * HTML Purifier Style Parser Sanitizer.
 *
 * @impl validate
 */

/**
 * Removes all tags from HTML leaving only style tags.
 *
 * @cb err, string
 * @param htmlInput string
 * @pattern facade
 * @see http://code.google.com/p/google-caja/wiki/JsHtmlSanitizer
 * @see https://github.com/CLowbrow/node-caja-sanitizer
 */
function sanitize(htmlInput, cb) {
  var outputCache = [];

  var omit = function(node) {
    outputCache.push(node);
  };

  var parser = sanitizer.makeSaxParser({
    startDoc: omit,

    startTag: function(tagNameLowerCase, attribs, outputCache) {
      var whitelisted = whitelister.verify(tagNameLowerCase);

      if (whitelisted) {
        outputCache.push('<' + tagNameLowerCase);

        for (var i = 0; i < attribs.length; i += 2) {
          var key = attribs[i];
          var value = attribs[i + 1];

          outputCache.push(' ' + key + '="' + value + '"');
        }

        outputCache.push('>');
      }
    },

    endTag: function(tagName, outputCache) {
      var whitelisted = whitelister.verify(tagName);

      if (whitelisted)
        outputCache.push('</' + tagName + '>');
    },

    pcdata: omit,
    cdata: omit,
    rcdata: omit,
    endDoc: omit
  });

  parser(htmlInput, outputCache);

  var htmlOutput = outputCache.join('');

  var outputCache2 = [];
  var parser2 = sanitizer.makeSaxParser({
    cdata: function(css, outputCache2) {
      outputCache2.push(css);
    }
  });
  parser2(htmlOutput, outputCache2);

  var styleGroups = [];
  outputCache2.forEach(function(theCss) {
    filterer.filter(theCss, function(err, cleanOutput) {
      var wrappedCssOutput = addStyleTags(cleanOutput);
      styleGroups.push(wrappedCssOutput);
    });

  });

  // join all style groups together
  cb(null, styleGroups.join(''));
}

/**
 * Wraps the given input by adding HTML style tags.
 *
 * @param styles string The CSS styles to put inside the style tags
 * @return string The CSS wrapped in style tags
 */
function addStyleTags(styles) {
  return (styles) ? '<style>' + styles + '</style>' : '';
}


exports.sanitize = sanitize;
