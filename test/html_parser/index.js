var parser = require(APP_DIR + '/lib/html_parser');

/**
 * HTML Purifier HTML Parser Unit Test
 */
describe('library - html purifier - html parser', function() {

  it('should contain the parse function', function() {
    var hasParseFunction = (typeof(parser.parse) !== 'undefined');
    expect(hasParseFunction).to.be.ok();
  });

  it('should contain the parsePurified function', function() {
    var hasParsePurifiedFunction = (typeof(parser.parsePurified) !== 'undefined');
    expect(hasParsePurifiedFunction).to.be.ok();
  });

});

describe('library - html purifier - html parser - parsePurified', function() {

  it('should remove both prefix and postfix', function(done) {
    var POSTFIX = 'ugc';
    var PREFIX = 'ugc-';
    var dirty = '<span class="ugc ugc-ugc ugc-ugc-moz-cite-prefix ugc-test ugc">my string</span>';
    var expected = '<span class="moz-cite-prefix test">my string</span>';

    parser.parsePurified(dirty, PREFIX, POSTFIX, function(err, namespaced) {
      expect(namespaced).to.be.equal(expected);
      done();
    });
  });

});
