# node-html5-purifier

Purify dirty HTML and CSS into standards compliant and namespaced code.

Cleans up any input into standards compliant DOM safe code, both CSS and HTML5.

Can pass in prefix and postfix values for namespacing all elements, id's and classes
within the html.

```purifier.purify(html, options, cb);```

# Example
```js
	var purifier = require('html5-purifier');
	var html = 'hello<span>world</a>';
	var options = { prefix: 'abc-', postfix: 'abc' };
	purifier.purify(html, options, cb);
```
