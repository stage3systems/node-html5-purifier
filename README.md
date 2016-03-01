# node-html5-purifier

[![Code Climate](https://codeclimate.com/github/stage3systems/node-html5-purifier/badges/gpa.svg)](https://codeclimate.com/github/stage3systems/node-html5-purifier)

Purify dirty HTML and CSS into standards compliant and namespaced code.

Cleans up any input into standards compliant DOM safe code, both CSS and HTML5.

Can pass in prefix and postfix values for namespacing all elements, id's and classes
within the html.

```purifier.purify(html, options, cb);```

# Examples

## Sanitize unsafe HTML
```js
	var purifier = require('html5-purifier');
	var html = '<b onmouseover=alert('boo!')>click me!</b>';
	var options = {};
	purifier.purify(html, options, cb);
```
Returns:
```
<b>click me!</b>
```

## Prefix and Postfix css classes
```js
	var purifier = require('html5-purifier');
	var html = 'hello<span>world</a>';
	var options = { prefix: 'abc-', postfix: 'abc' };
	purifier.purify(html, options, cb);
```
Returns:
```
hello<span class="abc">world</span>
```
