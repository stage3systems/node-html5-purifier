var parser = require(APP_DIR + '/lib/html_parser');

/**
 * HTML Purifier HTML Parser Unit Test
 */
describe('library - html purifier - html parser', function() {

  it('should contain the parse function', function() {
    var hasParseFunction = (typeof(parser.parse) !== 'undefined');
    expect(hasParseFunction).to.be.ok();
  });

});
