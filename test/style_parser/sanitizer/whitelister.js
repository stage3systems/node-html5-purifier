var whitelister = require(APP_DIR + '/lib/style_parser/sanitizer/whitelister.js');

/**
 * HTML Purifier Style Parser Sanitizer Whitelister Unit Test
 */
describe('library - html purifier - style parser - sanitizer - whitelister', function() {

  it('should contain the verify function', function() {
    var hasVerifyFunction = (typeof(whitelister.verify) !== 'undefined');
    expect(hasVerifyFunction).to.be.ok();
  });

  describe('verify()', function() {
    it('should return true when the tag is in the whitelist', function() {
      var result = whitelister.verify('style');
      expect(result).to.be.ok();
    });

    it('should return false when the tag is not in the whitelist', function() {
      var result = whitelister.verify('hack');
      expect(result).not.to.be.ok();
    });
  });

});
