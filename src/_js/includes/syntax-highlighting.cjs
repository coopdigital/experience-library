window.Prism = require('prismjs');

// Syntax highlighting languages
require('prismjs/components/prism-javascript.js');
require('prismjs/components/prism-markup.js');
require('prismjs/components/prism-scss.js');
var Normalizer = require('prismjs/plugins/normalize-whitespace/prism-normalize-whitespace');

var nw = new Normalizer({
	'remove-trailing': true,
	'remove-indent': true,
	'left-trim': true,
	'right-trim': true,
	'break-lines': 80,
	'indent': 2,
	'remove-initial-line-feed': false,
	'tabs-to-spaces': 4,
	'spaces-to-tabs': 4
});

window.Prism.highlightAll();
