var whitelister = require(APP_DIR + '/lib/html_parser/tag_validator/whitelister.js');

/**
 * HTML Purifier HTML Parser Tag Validator Whitelister Unit Test
 */
describe('library - html purifier - html parser - tag validator - whitelister', function() {

  it('should contain the verify function', function() {
    var hasVerifyFunction = (typeof(whitelister.verify) !== 'undefined');
    expect(hasVerifyFunction).to.be.ok();
  });

  describe('verify()', function() {
    it('should return true when the tag is in the whitelist', function() {
      var result = whitelister.verify('div');
      expect(result).to.be.ok();
    });

    it('should return false when the tag is not in the whitelist', function() {
      var result = whitelister.verify('hack');
      expect(result).not.to.be.ok();
    });

    /**
     * Whitelist
     */
    it('should allow `tbody`', function() {
      var result = whitelister.verify('tbody');
      expect(result).to.be.ok();
    });
    it('should allow `thead`', function() {
      var result = whitelister.verify('thead');
      expect(result).to.be.ok();
    });
    it('should allow `tfoot`', function() {
      var result = whitelister.verify('tfoot');
      expect(result).to.be.ok();
    });
  });

});
