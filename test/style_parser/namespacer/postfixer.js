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
      var clean = 'a.ugc {\n  color: #0000FF;\n}';

      postfixer.append(dirty, POSTFIX, function(err, postfixed) {
        expect(postfixed).to.equal(clean);
        done();
      });
    });

    it('should postfix tag with pseudo-class', function(done) {
      var dirty = 'a:link { color:#0000FF; }';
      var clean = 'a.ugc:link {\n  color: #0000FF;\n}';

      postfixer.append(dirty, POSTFIX, function(err, postfixed) {
        expect(postfixed).to.equal(clean);
        done();
      });
    });

    it('should postfix tag to any class', function(done) {
      var dirty = '.xl123 { color:#0000FF; }';
      var clean = '.xl123.ugc {\n  color: #0000FF;\n}';

      postfixer.append(dirty, POSTFIX, function(err, postfixed) {
        expect(postfixed).to.equal(clean);
        done();
      });
    });

    it('should postfix tag with pseudo-class', function(done) {
      var dirty = 'a , p { color:#0000FF; }';
      var clean = 'a.ugc,\np.ugc {\n  color: #0000FF;\n}';

      postfixer.append(dirty, POSTFIX, function(err, postfixed) {
        expect(postfixed).to.equal(clean);
        done();
      });
    });
  });

  describe('strip', function() {
    var POSTFIX = '.ugc';

    it('should remove postfix tag', function(done) {
      var expected = 'a {\n  color: #0000FF;\n}';
      var clean = 'a.ugc { color: #0000FF; }';

      postfixer.strip(clean, POSTFIX, function(err, stripped) {
        expect(stripped).to.equal(expected);
        done();
      });
    });

    it('should remove postfix tag from pseudo-class', function(done) {
      var expected = 'a:link {\n  color: #0000FF;\n}';
      var clean = 'a.ugc:link { color: #0000FF; }';

      postfixer.strip(clean, POSTFIX, function(err, stripped) {
        expect(stripped).to.equal(expected);
        done();
      });
    });

    it('should remove postfix tag with pseudo-class', function(done) {
      var expected = 'a,\np {\n  color: #0000FF;\n}';
      var clean = 'a.ugc, p.ugc { color: #0000FF; }';

      postfixer.strip(clean, POSTFIX, function(err, stripped) {
        expect(stripped).to.equal(expected);
        done();
      });
    });

    it('should return formatted multi-line styles', function(done) {
      var clean = 'P.ugc {\n';
      clean += 'margin-left: 1px;\n';
      clean += 'margin-right: 1px;\n';
      clean += '}\n';
      var expected = 'P {\n  margin-left: 1px;\n  margin-right: 1px;\n}';

      postfixer.strip(clean, POSTFIX, function(err, stripped) {
        expect(stripped).to.equal(expected);
        done();
      });
    });

    it('should not strip postfix tag if there is no other classname content', function(done) {
        var input = '.Default_Paragraph_Font{text-indent:0.00in;text-align:left;vertical-align:top;}\n'
            + '.ugc{text-indent:0.00in;text-align:left;vertical-align:top;font-size:12.00\n'
            + 'pt;mso-style-next:\'ugc\';margin:0.07in 0.00in;}\n'
            + '.ugc1{text-indent:0.00in;text-align:left;vertical-align:top;font-size:10.0\n'
            + '0pt;margin:0.00in;}'
        ;
        var expected = '.Default_Paragraph_Font {\n  text-indent: 0.00in;\n  text-align: left;\n  '
            + 'vertical-align: top;\n}\n\n'
            + '.ugc {\n  text-indent: 0.00in;\n  text-align: left;\n  vertical-align: top;\n  font-size: 12.00'
            + '\npt;\n  mso-style-next: \'ugc\';\n  margin: 0.07in 0.00in;\n}\n\n'
            + '1 {\n  text-indent: 0.00in;\n  text-align: left;\n  vertical-align: top;\n  font-size: 10.0'
            + '\n0pt;\n  margin: 0.00in;\n}'
        ;

        postfixer.strip(input, POSTFIX, function(err, stripped) {
            expect(stripped).to.equal(expected);
            done();
        });
    });
  });

});
