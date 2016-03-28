var postfixer = require(APP_DIR + '/lib/style_parser/namespacer/postfixer.js');

/**
 * HTML Purifier Style Parser Namespacer Postfixer
 */
describe('lib - html purifier - style parser - namespacer - postfixer', function() {

  it('should contain the postfix function', function() {
    var hasAppendFunction = (typeof(postfixer.append) !== 'undefined');
    expect(hasAppendFunction).to.be.ok();
  });

  it('should contain the strip function', function() {
    var hasStripFunction = (typeof(postfixer.strip) !== 'undefined');
    expect(hasStripFunction).to.be.ok();
  });

  describe('append', function() {
    var POSTFIX = '.ugc';

    it('should postfix tag', function(done) {
      var dirty = 'a { color:#0000FF; }';
      var clean = 'a.ugc { color:#0000FF; }';

      postfixer.append(dirty, POSTFIX, function(err, postfixed) {
        expect(postfixed).to.equal(clean);
        done();
      });
    });

    it('should postfix tag with pseudo-class', function(done) {
      var dirty = 'a:link { color:#0000FF; }';
      var clean = 'a.ugc:link { color:#0000FF; }';

      postfixer.append(dirty, POSTFIX, function(err, postfixed) {
        expect(postfixed).to.equal(clean);
        done();
      });
    });

    it('should postfix tag with pseudo-class', function(done) {
      var dirty = 'a , p { color:#0000FF; }';
      var clean = 'a.ugc , p.ugc { color:#0000FF; }';

      postfixer.append(dirty, POSTFIX, function(err, postfixed) {
        expect(postfixed).to.equal(clean);
        done();
      });
    });
  });

  describe('strip', function() {
    var POSTFIX = '.ugc';

    it('should remove postfix tag', function(done) {
      var expected = 'a { color:#0000FF; }';
      var clean = 'a.ugc { color:#0000FF; }';

      postfixer.strip(clean, POSTFIX, function(err, stripped) {
        expect(stripped).to.equal(expected);
        done();
      });
    });

    it('should remove postfix tag from pseudo-class', function(done) {
      var expected = 'a:link { color:#0000FF; }';
      var clean = 'a.ugc:link { color:#0000FF; }';

      postfixer.strip(clean, POSTFIX, function(err, stripped) {
        expect(stripped).to.equal(expected);
        done();
      });
    });

    it('should remove postfix tag with pseudo-class', function(done) {
      var expected = 'a , p { color:#0000FF; }';
      var clean = 'a.ugc , p.ugc { color:#0000FF; }';

      postfixer.strip(clean, POSTFIX, function(err, stripped) {
        expect(stripped).to.equal(expected);
        done();
      });
    });
  });

});
