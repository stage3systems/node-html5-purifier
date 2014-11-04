var sanitizer = require(APP_DIR + '/lib/style_parser/sanitizer');

/**
 * HTML Purifier Style Parser Sanitizer Unit Test
 */
describe('library - html purifier - style parser - sanitizer', function() {

  it('should contain the sanitize function', function() {
    var hasSanitizeFunction = (typeof(sanitizer.sanitize) !== 'undefined');
    expect(hasSanitizeFunction).to.be.ok();
  });

  describe('sanitize()', function() {
    it('should remove title tags', function(done) {
      var dirty = '<title>hello world</title>';

      sanitizer.sanitize(dirty, function(err, sanitized) {
        expect(err).to.be.equal(null);
        expect(sanitized).to.be.equal('');
        done();
      });
    });

    it('should add style tags', function(done) {
      var dirty = '<style class="someHack">body { background: #fff }</style>';

      sanitizer.sanitize(dirty, function(err, sanitized) {
        expect(err).to.be.equal(null);
        expect(sanitized).to.be.equal('<style>body {\n  background: #fff;\n}</style>');
        done();
      });
    });
  });

});
