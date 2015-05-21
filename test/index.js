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

  /**
   * No joke, an actual html page found in the wild had 20,000 nested css selectors.
   * A large block of improperly nested selectors repeated hundred's of times.
   *
   * Tests for a 'RangeError: Maximum call stack size exceeded' exception, thrown by the
   * 'css' module that uses recursion when css tags are nested.
   */
  it('should discard nested selectors', function(done) {
    var options = { prefix: 'abc', postfix: 'ugc' };
    var text = '@media only screen {div{display:block}\n';
    text = repeat(text, 100);
    text = '<style type="text/css">' + text + '</style>';
    text = repeat(text, 200);
    text = '<style type="text/css">\nbody {padding: 0}</style>' + text; // something valid in this mess
    purify(text, options, function(err, res) {
      expect(res).to.equal('<style>body.ugc {\n  padding: 0;\n}</style>');
      done();
    });
  });
});

/**
 * Until we have ES6 String.repeat
 */
function repeat(str, count) {
  'use strict';
  if (str == null) {
    throw new TypeError('can\'t convert ' + str + ' to object');
  }
  str = '' + str;
  count = +count;
  if (count != count) {
    count = 0;
  }
  if (count < 0) {
    throw new RangeError('repeat count must be non-negative');
  }
  if (count == Infinity) {
    throw new RangeError('repeat count must be less than infinity');
  }
  count = Math.floor(count);
  if (str.length == 0 || count == 0) {
    return '';
  }
  // Ensuring count is a 31-bit integer allows us to heavily optimize the
  // main part. But anyway, most current (august 2014) browsers can't handle
  // strings 1 << 28 chars or longer, so:
  if (str.length * count >= 1 << 28) {
    throw new RangeError('repeat count must not overflow maximum string size');
  }
  var rpt = '';
  for (;;) {
    if ((count & 1) == 1) {
      rpt += str;
    }
    count >>>= 1;
    if (count == 0) {
      break;
    }
    str += str;
  }
  return rpt;
}
