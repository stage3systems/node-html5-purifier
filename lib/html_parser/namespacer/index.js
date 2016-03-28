'use strict';
var blacklister = require('./blacklister.js');
var prefixer = require('./prefixer.js');
var postfixer = require('./postfixer.js');
var caja = require('google-caja-sanitizer');

/**
 * HTML Purifier Namepacer
 *
 * @impl namespace
 */

/**
 * Adds the specified prefixes and postfixes to all html classes and
 * ids within an html string.
 *
 * @cb err, string
 * @param htmlInput string
 * @pattern facade
 * @see http://code.google.com/p/google-caja/wiki/JsHtmlSanitizer
 * @see https://github.com/CLowbrow/node-caja-sanitizer
 */
function namespace(htmlInput, prefix, postfix, cb) {
  var outputCache = [];

  var omit = function(node) {
    outputCache.push(node);
  }.bind(this);

  var namespacer = caja.makeSaxParser({
    startdoc: omit,

    startTag: function(tagNameLowerCase, attribs, outputCache) {
      outputCache.push('<' + tagNameLowerCase); // output open tag and the tag's name

      var hasClass = false;
      var blacklisted = blacklister.verify(tagNameLowerCase);

      if (!blacklisted) {
        // parse attributes
        for (var i = 0; i < attribs.length; i += 2) {
          var key = attribs[i];
          var value = attribs[i + 1];
          // if parsing an "id" that has content
          if (key === 'id' && value) {
            // TODO: Filter invalid characters from attribute contents
            outputCache.push(' id="' + prefix + value + '"');
          }

          // if parsing an "class" that has content
          else if (key === 'class' && value) {
            hasClass = true;
            outputCache.push(' class="');

            // strip extra whitespace
            value = value.replace(/  +/g, ' ');

            // push class tokens
            var classTokens = value.split(' ');
            var classNames = postfix;
            for (var j = 0; j < classTokens.length; j++) {
              // TODO: Filter invalid characters from attribute contents
              classNames += ' ' + prefix + classTokens[j];
            }
            outputCache.push(classNames.trim());

            outputCache.push('"');
          }
          // otherwise, output any other types of attributes
          else {
            outputCache.push(' ' + key + '="' + value.replace(/"/g, '&#34;') + '"');
          }
        }

        // if the tag has no class, we add the postfix as a class
        if (!hasClass) {
          outputCache.push(' class="' + postfix + '"');
        }
      }

      // close the tag
      outputCache.push('>');
    },

    endTag: function(tagName, outputCache) {
      outputCache.push('</' + tagName + '>');
    },

    pcdata: omit,
    cdata: omit,
    rcdata: omit,
    endDoc: omit
  });

  namespacer(htmlInput, outputCache);

  cb(null, outputCache.join(''));
}

function stripNamespace(htmlInput, prefix, postfix, cb) {
  // (?:class|id)*  check for class or id, non capturing group
  // ((?:class|id)* *= *[\'\"]{0,1})  captures either class=" or id="
  // ((?:[\w -](?!\w+=|\/))+)[\'\"]*  captures value of class or id


  // matches class and its value
  var attrMatcher = /((?:class|id)* *= *[\'\"]{0,1})((?:[\w -](?!\w+=|\/))+)[\'\"]*/gi;
  // matches either prefix or postfix in attribute
  var classMatcher = new RegExp('(?:(' + prefix + '|' + postfix +')*)','g');

  //if we find a class, check it for prefix or postfix
  var result = htmlInput.replace(attrMatcher, function(full, capture1, capture2){
    //remove prefix or postfix and return
    var stripped = capture2.replace(classMatcher, "");
    return capture1 + stripped.trim() + "\"";
  });
  cb(null, result);
}


exports.namespace = namespace;
exports.stripNamespace= stripNamespace;
