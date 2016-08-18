v0.8.0 / 2016-08-18
===================

  * Fixed style parser to parse complex styles correctly


v0.7.1 / 2016-06-24
===================

  * Fixed code bug which was concatenating all rule selectors recursively

v0.7.0 / 2016-06-20
===================

  * Fixed adding extra namespace classes when a classname had extra spaces in it
  * Revert namespace to be called before sending mail

v0.6.0 / 2016-05-05
===================

  * Stability: Change default behaviour when we encounter invalid CSS declarations. Instead of
    failing with a Type error, we now remove all the related css

v0.5.1 / 2016-04-28
===================

  * Updated async dep: Required as previous version would not return callback in a rare case
  * Update deps: css, underscore, istanbul, mocha, sinon

v0.5.0 / 2016-03-14
===================

  * Update google-caja library to use stage3 fork that allows cid in img src sanitization

v0.4.0 / 2016-03-01
===================

  * Remove required parameters `prefix` and `postfix` to support HTML and CSS purifying
  * Preserve data-cid attribute

v0.3.0 / 2015-11-09
===================

  * Upgrade google-caja to a newer library
  * From Google Caja compiled Sat May 04 18:26:48 CDT 2013 to Thu Sep 12 11:58:02 CDT 2013

v0.2.6 / 2015-10-19
===================

  * Fix TypeError when the html was undefined

v0.2.5 / 2015-07-22
===================

  * Removing HTML comment start and end tags in <style> blocks

v0.2.3 / 2015-05-22
===================

  * Removed code that was taking line endings out of email body

v0.2.2 / 2015-03-12
===================

  * Improved whitelist to include common HTML attributes: height, valign, and width

v0.2.1 / 2014-12-15
===================

  * Fixed 'RangeError: Maximum call stack size exceeded' exception when parsing
    over 10,000 nested css selectors

v0.2.0 / 2014-11-24
===================

  * `purify` now accepts an options object, instead of prefix and postfix strings

v0.1.0 / 2014-10-03
===================

  * Initial release
