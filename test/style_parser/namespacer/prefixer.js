var prefixer = require(APP_DIR + '/lib/style_parser/namespacer/prefixer.js');

/**
 * HTML Purifier Style Parser Namespacer Prefixer
 */

describe('lib - html purifier - style parser - namespacer - prefixer', function() {

  it('should contain the namespace function', function() {
    var hasPrependFunction = (typeof(prefixer.prepend) !== 'undefined');
    expect(hasPrependFunction).to.be.ok();
  });

  it('should contain the strip function', function() {
    var hasStripFunction = (typeof(prefixer.strip) !== 'undefined');
    expect(hasStripFunction).to.be.ok();
  });

  describe('prefix', function() {
    var PREFIX = 'ugc-';

    it('should add the prefix to just a class', function(done) {
      var dirty = '.link {margin-top:0;}';
      var clean = '.ugc-link {margin-top:0;}';

      prefixer.prepend(dirty, PREFIX, function(err, prefixed) {
        expect(prefixed).to.equal(clean);
        done();
      });
    });

    it('should add the prefix to a tag and class', function(done) {
      var dirty = 'p.orig {margin-top:0;}';
      var clean = 'p.ugc-orig {margin-top:0;}';

      prefixer.prepend(dirty, PREFIX, function(err, prefixed) {
        expect(prefixed).to.equal(clean);
        done();
      });
    });

    it('should add the prefix with multiple tags', function(done) {
      var dirty = '.first.second.third {margin-top:0;}';
      var clean = '.ugc-first.ugc-second.ugc-third {margin-top:0;}';

      prefixer.prepend(dirty, PREFIX, function(err, prefixed) {
        expect(prefixed).to.equal(clean);
        done();
      });
    });

    it('should add the prefix with multiple class blocks', function(done) {
      var dirty = 'p.orig, div.test .link {margin-top:0;}';
      var clean = 'p.ugc-orig, div.ugc-test .ugc-link {margin-top:0;}';

      prefixer.prepend(dirty, PREFIX, function(err, prefixed) {
        expect(prefixed).to.equal(clean);
        done();
      });
    });

    it('should add the prefix to an id', function(done) {
      var dirty = '#orig {margin-top:0;}';
      var clean = '#ugc-orig {margin-top:0;}';

      prefixer.prepend(dirty, PREFIX, function(err, prefixed) {
        expect(prefixed).to.equal(clean);
        done();
      });
    });

    it('should add the prefix to id with tag', function(done) {
      var dirty = 'p#orig {margin-top:0;}';
      var clean = 'p#ugc-orig {margin-top:0;}';

      prefixer.prepend(dirty, PREFIX, function(err, prefixed) {
        expect(prefixed).to.equal(clean);
        done();
      });
    });

    it('should treat id that is a valid tag name as an id name', function(done) {
      var dirty = '#div {margin-top:0;}';
      var clean = '#ugc-div {margin-top:0;}';

      prefixer.prepend(dirty, PREFIX, function(err, prefixed) {
        expect(prefixed).to.equal(clean);
        done();
      });
    });

    it('should prefix multiple', function(done) {
      var dirty = '#link ,#link2 #link3 #link4 #link5, p#test {margin-top:0;}';
      var clean = '#ugc-link ,#ugc-link2 #ugc-link3 #ugc-link4 #ugc-link5, p#ugc-test {margin-top:0;}';

      prefixer.prepend(dirty, PREFIX, function(err, prefixed) {
        expect(prefixed).to.equal(clean);
        done();
      });
    });
  });

  describe('strip', function() {
    var PREFIX = 'ugc-';

    it('should remove the prefix to just a class', function(done) {
      var clean = '.ugc-link {margin-top:0;}';
      var expected = '.link {margin-top:0;}';

      prefixer.strip(clean, PREFIX, function(err, stripped) {
        expect(stripped).to.equal(expected);
        done();
      });
    });

    it('should remove the prefix from a tag and class', function(done) {
      var clean = 'p.ugc-orig {margin-top:0;}';
      var expected = 'p.orig {margin-top:0;}';

      prefixer.strip(clean, PREFIX, function(err, stripped) {
        expect(stripped).to.equal(expected);
        done();
      });
    });

    it('should remove the prefix from multiple tags', function(done) {
      var expected = '.first.second.third {margin-top:0;}';
      var clean = '.ugc-first.ugc-second.ugc-third {margin-top:0;}';

      prefixer.strip(clean, PREFIX, function(err, stripped) {
        expect(stripped).to.equal(expected);
        done();
      });
    });

    it('should remove the prefix from multiple class blocks', function(done) {
      var expected = 'p.orig, div.test .link {margin-top:0;}';
      var clean = 'p.ugc-orig, div.ugc-test .ugc-link {margin-top:0;}';

      prefixer.strip(clean, PREFIX, function(err, stripped) {
        expect(stripped).to.equal(expected);
        done();
      });
    });

    it('should remove the prefix from an id', function(done) {
      var expected = '#orig {margin-top:0;}';
      var clean = '#ugc-orig {margin-top:0;}';

      prefixer.strip(clean, PREFIX, function(err, stripped) {
        expect(stripped).to.equal(expected);
        done();
      });
    });

    it('should remove the prefix from id with tag', function(done) {
      var expected = 'p#orig {margin-top:0;}';
      var clean = 'p#ugc-orig {margin-top:0;}';

      prefixer.strip(clean, PREFIX, function(err, stripped) {
        expect(stripped).to.equal(expected);
        done();
      });
    });

    it('should treat id that is a valid tag name as an id name', function(done) {
      var expected = '#div {margin-top:0;}';
      var clean = '#ugc-div {margin-top:0;}';

      prefixer.strip(clean, PREFIX, function(err, stripped) {
        expect(stripped).to.equal(expected);
        done();
      });
    });

    it('should remove prefix from multiple tags', function(done) {
      var expected = '#link ,#link2 #link3 #link4 #link5, p#test {margin-top:0;}';
      var clean = '#ugc-link ,#ugc-link2 #ugc-link3 #ugc-link4 #ugc-link5, p#ugc-test {margin-top:0;}';

      prefixer.strip(clean, PREFIX, function(err, stripped) {
        expect(stripped).to.equal(expected);
        done();
      });
    });
  });

});
