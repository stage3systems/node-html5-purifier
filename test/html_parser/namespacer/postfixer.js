var postfixer = require(APP_DIR + '/lib/html_parser/namespacer/postfixer.js');

/**
 * HTML Purifier HTML Parser Namespacer Postfixer Unit Test
 */
describe('library - html purifier - html parser - namespacer - postfixer', function() {

  it('should contain the append function', function() {
    var hasAppendFunction = (typeof(postfixer.append) !== 'undefined');
    expect(hasAppendFunction).to.be.ok();
  });

  describe('append()', function() {
    var POSTFIX = 'ugc';
    var TEXT = 'text';

    it('should add the postfix to the given text', function() {
      var expected = 'text.ugc';
      expect(postfixer.append(POSTFIX, TEXT)).to.be.equal(expected);
    });
  });

});
