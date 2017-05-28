require('share');

var kind = require('enyo/kind'),
	utils = require('enyo/utils'),

	Image = require('enyo/Image'),
	Button = require('onyx/Button'),
	Popup = require('onyx/Popup');

module.exports = kind({
	name: 'Button',
	kind: Button,
	classes: 'share-button',

	handlers: {
		ontap: 'ontap',
	},

	published: {
		icon: null,
		label: 'Share', // TODO: Add localisation support for this
		url: null,
	},

	components: [
		{name: 'icon', classes: 'icon', kind: Image},
		{name: 'label', classes: 'label'},
	],

	bindings: [
		{from: '.icon', to: '.$.icon.src'},
		{from: '.icon', to: '.$.icon.showing', transform: function(theIcon) { return !!theIcon; }},
		{from: '.label', to: '.$.label.content'},
	],

	create: kind.inherit(function(parent) { return function() {
		parent.apply(this, arguments);
		this.urlChanged();
	}}),

	urlChanged: function() { this.set('disabled', !this.url); },
	buildURL: function() { throw new Exception('Abstract type; descendents must implement this method'); },
	ontap: function(theSender, theEvent) { window.open(this.buildURL(), 'Share'); },
});
