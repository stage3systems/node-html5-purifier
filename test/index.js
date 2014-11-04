var purifier = require(APP_DIR + '/lib/index');

/**
 * HTML Purifier Unit Test.
 */

describe('library - html purifier', function() {

  it('should contain the purify function', function() {
    var hasPurifyFunction = (typeof(purifier.purify) !== 'undefined');
    expect(hasPurifyFunction).to.be.ok();
  });

});
