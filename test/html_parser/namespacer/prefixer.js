var prefixer = require(APP_DIR + '/lib/html_parser/namespacer/prefixer.js');

/**
 * HTML Purifier HTML Parser Namespacer Prefixer Unit Test
 */
describe('library - html purifier - html parser - namespacer - prefixer', function() {

  it('should contain the prepend function', function() {
    var hasPrependFunction = (typeof(prefixer.prepend) !== 'undefined');
    expect(hasPrependFunction).to.be.ok();
  });

  describe('prepend()', function() {
    var PREFIX = 'ugc-';
    var TEXT = 'test';

    it('should prepend the prefix to the given text', function() {
      var expected = 'ugc-test';
      expect(prefixer.prepend(PREFIX, TEXT)).to.be.equal(expected);
    });
  });

});
