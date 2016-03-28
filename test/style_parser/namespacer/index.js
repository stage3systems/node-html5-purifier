var namespacer = require(APP_DIR + '/lib/style_parser/namespacer');

/**
 * HTML Purifier Style Parser Namespacer
 */
describe('lib - html purifier - style parser - namespacer', function() {

  it('should contain the namespace function', function() {
    var hasNamespaceFunction = (typeof(namespacer.namespace) !== 'undefined');
    expect(hasNamespaceFunction).to.be.ok();
  });

  it('should contain the stripNamespace function', function() {
    var hasNamespaceFunction = (typeof(namespacer.stripNamespace) !== 'undefined');
    expect(hasNamespaceFunction).to.be.ok();
  });
});
