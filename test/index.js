var purifier = require(APP_DIR + '/lib/index');

/**
 * HTML Purifier Unit Test.
 */

describe('library - html purifier', function() {
  var purify = purifier.purify;

  it('should contain the purify function', function() {
    var hasPurifyFunction = (typeof(purify) !== 'undefined');
    expect(hasPurifyFunction).to.be.ok();
  });

  it('should require prefix', function(done) {
    var options = { postfix: 'abc' };
    purify('', options, function(err) {
      expect(err).to.be.an(Error);
      done();
    });
  });

  it('should require postfix', function(done) {
    var options = { prefix: 'abc' };
    purify('', options, function(err) {
      expect(err).to.be.an(Error);
      done();
    });
  });

});
