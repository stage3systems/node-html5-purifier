var styleParser = require(APP_DIR + '/lib/style_parser');

/**
 * HTML Purifier Style Parser Unit Test
 */
describe('library - html purifier - style parser', function() {

  it('should contain the parse function', function() {
    var hasParseFunction = (typeof(styleParser.parse) !== 'undefined');
    expect(hasParseFunction).to.be.ok();
  });

  it('should contain the parsePurified function', function() {
    var hasParsePurifiedFunction = (typeof(styleParser.parsePurified) !== 'undefined');
    expect(hasParsePurifiedFunction).to.be.ok();
  });

  describe('library - html purifier - style parser - parsePurified', function() {
    var PREFIX = 'ugc-';
    var POSTFIX = '.ugc';
    it('should remove prefix from multiple tags', function(done) {
      var expected = '#link, #link2 #link3 #link4 #link5, p#test { margin-top:0; }';
      var clean = "<style>" +
        "#ugc-link, #ugc-link2 #ugc-link3 #ugc-link4 #ugc-link5, p#ugc-test { margin-top:0; }" +
        "</style>";

      styleParser.parsePurified(clean, PREFIX, POSTFIX, function(err, stripped) {
        expect(stripped).to.equal(expected);
        done();
      });
    });

    it('should remove the prefix from multiple tags', function(done) {
      var expected = '.first.second.third { margin-top:0; }';
      var clean = '<style>.ugc-first.ugc-second.ugc-third {margin-top:0;}</style>';

      styleParser.parsePurified(clean, PREFIX, POSTFIX, function(err, stripped) {
        expect(stripped).to.equal(expected);
        done();
      });
    });

    it('should remove the prefix from multiple class blocks', function(done) {
      var expected = 'p.orig, div.test .link { margin-top:0; }';
      var clean = '<style>p.ugc-orig, div.ugc-test .ugc-link {margin-top:0;}</style>';

      styleParser.parsePurified(clean, PREFIX, POSTFIX, function(err, stripped) {
        expect(stripped).to.equal(expected);
        done();
      });
    });

    it('should remove prefix from multiple tags', function(done) {
      var expected = '#link, #link2 #link3 #link4 #link5, p#test { margin-top:0; }';
      var clean = '<style>#ugc-link, #ugc-link2 #ugc-link3 #ugc-link4 #ugc-link5, p#ugc-test { margin-top:0; }</style>';

      styleParser.parsePurified(clean, PREFIX, POSTFIX, function(err, stripped) {
        expect(stripped).to.equal(expected);
        done();
      });
    });
  });
});
