var styleParser = require(APP_DIR + '/lib/style_parser');

/**
 * HTML Purifier Style Parser Unit Test
 */
describe('library - html purifier - style parser', function() {

  it('should contain the parse function', function() {
    var hasParseFunction = (typeof(styleParser.parse) !== 'undefined');
    expect(hasParseFunction).to.be.ok();
  });

});
