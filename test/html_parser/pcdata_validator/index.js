var validator = require(APP_DIR + '/lib/html_parser/pcdata_validator');

/**
 * HTML Purifier HTML Parser PCDATA Validator Unit Test
 */

describe('html purifier - html parser - pcdata validator', function() {
  // escapeSquareBrackets
  it('should return a string with square brackets escaped', function() {
    var unescaped = '<![if mso 9]>';

    var escaped = validator._escapeSquareBrackets(unescaped);

    expect(escaped).to.equal('<!\\[if mso 9\\]>');
  });

  // filter
  describe('filter', function() {
    it('should return remove <![if !supportlists]> tags', function() {
      var dirty = '<![if !supportlists]>';

      validator.filter(dirty, function(err, clean) {
        expect(err).to.be(null);
        expect(clean).to.equal('');
      });
    });

    it('should return remove <![if !vml]> tags', function() {
      var dirty = '<![if !vml]>';

      validator.filter(dirty, function(err, clean) {
        expect(err).to.be(null);
        expect(clean).to.equal('');
      });
    });

    it('should return remove <![if gte mso 9]> tags', function() {
      var dirty = '<![if gte mso 9]>';

      validator.filter(dirty, function(err, clean) {
        expect(err).to.be(null);
        expect(clean).to.equal('');
      });
    });

    it('should return remove <![if mso 9]> tags', function() {
      var dirty = '<![if mso 9]>';

      validator.filter(dirty, function(err, clean) {
        expect(err).to.be(null);
        expect(clean).to.equal('');
      });
    });

    it('should return remove <![endif]> tags', function() {
      var dirty = '<![endif]>';

      validator.filter(dirty, function(err, clean) {
        expect(err).to.be(null);
        expect(clean).to.equal('');
      });
    });

    it('should not remove tags that are not on the blacklist', function() {
      var dirty = '<![valid tag]>';

      validator.filter(dirty, function(err, clean) {
        expect(err).to.be(null);
        expect(clean).to.equal('<![valid tag]>');
      });
    });
  });

  // _getBlacklist
  describe('_getBlacklist', function() {
    it('should return the blacklist as an array', function() {
      validator._getBlacklist(function(err, blacklist) {
        expect(err).to.be(null);
        expect(blacklist).to.be.an('array');
      });
    });
  });
});
