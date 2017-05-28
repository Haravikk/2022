require('share');

var kind = require('enyo/kind'),
	Button = require('share/Button');

module.exports = kind({
	name: 'FacebookButton',
	kind: Button,
	classes: 'share-facebook',

	icon: '@../../images/facebook.png',

	buildURL: function() { return 'https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(this.url); },
});
