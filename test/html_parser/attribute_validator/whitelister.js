var whitelister = require(APP_DIR + '/lib/html_parser/attribute_validator/whitelister.js');

/**
 * HTML Purifier HTML Parser Attribute Validator Whitelister Unit Test
 */
describe('library - html purifier - attribute validator - whitelister', function() {

  it('should contain the verify function', function() {
    var hasVerifyFunction = (typeof(whitelister.verify) !== 'undefined');
    expect(hasVerifyFunction).to.be.ok();
  });

  describe('verify()', function() {
    it('should return true when the tag is in the whitelist', function() {
      var result = whitelister.verify('class');
      expect(result).to.be.ok();
    });

    it('should return false when the tag is not in the whitelist', function() {
      var result = whitelister.verify('onclick');
      expect(result).not.to.be.ok();
    });

    /**
     * Whitelist
     */
    it('should allow `align`', function() {
      var result = whitelister.verify('align');
      expect(result).to.be.ok();
    });

    it('should allow `bgcolor`', function() {
      var result = whitelister.verify('bgcolor');
      expect(result).to.be.ok();
    });

    it('should allow `border`', function() {
      var result = whitelister.verify('border');
      expect(result).to.be.ok();
    });

    it('should allow `color`', function() {
      var result = whitelister.verify('color');
      expect(result).to.be.ok();
    });

    it('should allow `font-face`', function() {
      var result = whitelister.verify('font-face');
      expect(result).to.be.ok();
    });

    it('should allow `href`', function() {
      var result = whitelister.verify('href');
      expect(result).to.be.ok();
    });

    it('should allow `name`', function() {
      var result = whitelister.verify('name');
      expect(result).to.be.ok();
    });

    it('should allow `size`', function() {
      var result = whitelister.verify('size');
      expect(result).to.be.ok();
    });

    it('should allow `src`', function() {
      var result = whitelister.verify('src');
      expect(result).to.be.ok();
    });
  });

});
