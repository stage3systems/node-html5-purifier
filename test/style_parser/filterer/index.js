var filterer = require(APP_DIR + '/lib/style_parser/filterer');

/**
 * HTML Purifier Style Parser Filterer Unit Test
 */
describe('library - html purifier - style parser - filterer', function() {

  it('should contain the filter function', function() {
    var hasFilterFunction = (typeof(filterer.filter) !== 'undefined');
    expect(hasFilterFunction).to.be.ok();
  });

  describe('filter()', function() {
    it('should remove blacklisted declarations', function(done) {
      var dirty = 'body { position:absolute; }';
      var clean = '';

      filterer.filter(dirty, function(err, sanitized) {
        expect(err).to.be.equal(null);
        expect(sanitized).to.be.equal(clean);
        done();
      });
    });

    it('should allow non-blacklisted declarations', function(done) {
      var dirty = 'body { background:#fff; }';
      var clean = 'body {\n  background: #fff;\n}';

      filterer.filter(dirty, function(err, sanitized) {
        expect(err).to.be.equal(null);
        expect(sanitized).to.be.equal(clean);
        done();
      });
    });

    it('should remove malformed declarations', function(done) {
      var dirty = 'body background:#fff; }';
      var clean = '';

      filterer.filter(dirty, function(err, sanitized) {
        expect(err).to.be.equal(null);
        expect(sanitized).to.be.equal(clean);
        done();
      });
    });

    it('should remove malformed declarations', function(done) {
      var dirty = 'body { background }';
      var clean = '';

      filterer.filter(dirty, function(err, sanitized) {
        expect(err).to.be.equal(null);
        expect(sanitized).to.be.equal(clean);
        done();
      });
    });
  });
});
