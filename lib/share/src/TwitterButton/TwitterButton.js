require('share');

var kind = require('enyo/kind'),
	Button = require('share/Button');

module.exports = kind({
	name: 'TwitterButton',
	kind: Button,
	classes: 'share-twitter',

	icon: '@../../images/twitter.png',
	label: 'Tweet', // TODO: Add localisation support for this

	published: {
		hashTags: null,
		text: null,
		via: null,
	},

	buildURL: function() {
		var theURL = 'https://twitter.com/intent/tweet', theParams = ['url=' + encodeURIComponent(this.url)];

		if (this.text) { theParams.push('text=' + encodeURIComponent(this.text)); }
		if (this.hashTags) {
			var theHashTags = this.hashTags;
			switch (typeof theHashTags) {
				case 'string': break;
				case 'object':
					if (Array.isArray(theHashTags)) { theHashTags = theHashTags.join(','); break; }
				// Fallthrough
				default:
					this.error('Invalid hashtags:', theHashTags);
					theHashTags = null;
				break;
			}
			if (theHashTags) { theParams.push('hashtags=' + encodeURIComponent(theHashTags)); }
		}
		if (this.via) { theParams.push('via=' + this.via); }

		if (theParams.length > 0) { theURL += '?' + theParams.join('&'); }
		return theURL;
	},
});
