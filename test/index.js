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

  it('should support prefix and postfix', function(done) {
    var options = { prefix: 'xyz', postfix: 'abc' };
    var input = '<span class="hello">testing</span>';
    purify(input, options, function(err, res) {
      expect(err).to.not.be.an(Error);
      expect(res).to.equal('<span class="abc xyzhello">testing</span>');
      done();
    });
  });

  it('should not require any options', function(done) {
    var options = {};
    var input = '<span class="hello">testing</span>';
    purify(input, options, function(err, res) {
      expect(err).to.not.be.an(Error);
      expect(res).to.equal(input);
      done();
    });
  });

  it('should handle undefined input', function(done) {
    var options = { prefix: 'abc', postfix: 'ugc' };
    purify(undefined, options, function(err, res) {
      expect(res).to.equal('');
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
    this.timeout(5000);
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

  it('should not strip newlines from the html body', function(done) {
    var options = { prefix: 'abc', postfix: 'ugc' };
    var text = "<br><font size=2 face='sans-serif'>You are kindly requested to amend your\n" +
      "Address book and/or bookmarks and start using the following new email addresses\r\n" +
      "with immediate effect</font>\r" +
      "<br>";

    purify(text, options, function(err, res) {
      expect(res).to.equal(
        '<br class="ugc"><font size="2" face="sans-serif" class="ugc">'+
        'You are kindly requested to amend your\nAddress book and/or'+
        ' bookmarks and start using the following new email'+
        ' addresses\r\nwith immediate effect</font>\r<br class="ugc">'
      );
      done();
    });
  });

  it('should preserve data attribute', function(done) {
    var options = { prefix: 'abc', postfix: 'ugc' };
    purify('<a data-attachment-id="178">File link</a>', options, function(err, res) {
      expect(res).to.contain('data-attachment-id');
      expect(res).to.equal('<a data-attachment-id="178" class="ugc">File link</a>');
      done();
    });
  });

  it('should preserve cid attribute', function(done) {
    var options = { prefix: 'abc', postfix: 'ugc' };
    purify('<a data-attachment-id="178" data-cid="12345">File link</a>', options, function(err, res) {
      expect(res).to.contain('data-cid');
      expect(res).to.equal('<a data-attachment-id="178" data-cid="12345" class="ugc">File link</a>');
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
