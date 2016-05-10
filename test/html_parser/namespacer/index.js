var namespacer = require(APP_DIR + '/lib/html_parser/namespacer');

/**
 * HTML Purifier HTML Parser Namespacer Unit Test
 */
describe('library - html purifier - html parser - namespacer', function() {

  it('should contain the namespace function', function() {
    var hasFunction = (typeof(namespacer.namespace) !== 'undefined');
    expect(hasFunction).to.be.ok();
  });

  describe('namespace()', function() {
    describe('The css postfix class should be added to every tag in the email body', function() {
      var POSTFIX = 'ugc';
      var PREFIX = 'ugc-';

      it('should add the postfix class when no attributes exist', function(done) {
        var dirty = '<span>Hello</span>';
        var expected = '<span class="' + POSTFIX + '">Hello</span>';

        namespacer.namespace(dirty, PREFIX, POSTFIX, function(err, namespaced) {
          expect(namespaced).to.be.equal(expected);
          done();
        });
      });

      it('should add the postfix to one existing class', function(done) {
        var dirty = '<span class="test">Hello</span>';
        var expected = '<span class="' + POSTFIX + ' ' + PREFIX + 'test">Hello</span>';

        namespacer.namespace(dirty, PREFIX, POSTFIX, function(err, namespaced) {
          expect(namespaced).to.be.equal(expected);
          done();
        });
      });

      it('should apply to all tags', function(done) {
        var dirty = '<div>Hello</div>';
        var expected = '<div class="' + POSTFIX + '">Hello</div>';

        namespacer.namespace(dirty, PREFIX, POSTFIX, function(err, namespaced) {
          expect(namespaced).to.be.equal(expected);
          done();
        });
      });

      it('should be recursive', function(done) {
        var dirty = '<div><span><a href="#">Hello</a></span></div>';
        var expected = '<div class="' + POSTFIX + '"><span class="' + POSTFIX + '"><a href="#" class="' + POSTFIX + '">Hello</a></span></div>';

        namespacer.namespace(dirty, PREFIX, POSTFIX, function(err, namespaced) {
          expect(namespaced).to.be.equal(expected);
          done();
        });
      });
    });

    describe('Verify prefixes are being added in the HTML code', function() {
      var POSTFIX = 'ugc';
      var PREFIX = 'ugc-';

      it('should work for a single class', function(done) {
        var dirty = '<span class="blue">my string</span>';
        var expected = '<span class="' + POSTFIX + ' ' + PREFIX + 'blue">my string</span>';

        namespacer.namespace(dirty, PREFIX, POSTFIX, function(err, namespaced) {
          expect(namespaced).to.be.equal(expected);
          done();
        });
      });

      it('should work for multiple classes', function(done) {
        var dirty = '<span class="first second-class">my string</span>';
        var expected = '<span class="' + POSTFIX + ' ' + PREFIX + 'first ' + PREFIX + 'second-class">my string</span>';

        namespacer.namespace(dirty, PREFIX, POSTFIX, function(err, namespaced) {
          expect(namespaced).to.be.equal(expected);
          done();
        });
      });

      it('should prefix ids', function(done) {
        var dirty = '<span id="testing">my string</span><p>text<a href="http://www.google.ca" id="nowhere">link</a></p>';
        var expected = '<span id="' + PREFIX + 'testing" class="' + POSTFIX + '">my string</span><p class="' + POSTFIX + '">text<a href="http://www.google.ca" id="' + PREFIX + 'nowhere" class="' + POSTFIX + '">link</a></p>';

        namespacer.namespace(dirty, PREFIX, POSTFIX, function(err, namespaced) {
          expect(namespaced).to.be.equal(expected);
          done();
        });
      });
    });

    it('should remove extra whitespace between class names', function(done) {
      var POSTFIX = '';
      var PREFIX = '';
      var dirty = '<span class="pink   blue">headline</span>';
      var expected = '<span class="pink blue">headline</span>';

      namespacer.namespace(dirty, PREFIX, POSTFIX, function(err, purified) {
        expect(purified).to.be.equal(expected);
        done();
      });
    });

  });

});
