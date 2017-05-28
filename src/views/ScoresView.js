var kind = require('enyo/kind'),

	Control = require('enyo/Control'),
	DataRepeater = require('enyo/DataRepeater'),
	Image = require('enyo/Image'),

	Button = require('onyx/Button'),
	Popup = require('onyx/Popup'),

	Scores = require('../classes/Scores');

var decorate = function() { this.addClass(this.get('decorator')); };

var Repeater = kind({
	kind: DataRepeater,
	selectionProperty: 'selected',

	components: [
		{ classes: 'score wrapper', style: 'display: inline-block', components: [
			{ name: 'box', classes: 'box', components: [
				{ classes: 'text-wrapper', components: [
					{ name: 'label', classes: 'label', tag: 'span' },
					{ name: 'icon', classes: 'icon', kind: Image },
				]},
				{ classes: 'progress', components: [
					{ name: 'progress', classes: 'bar', decoratorChanged: decorate },
				]},
			], decoratorChanged: decorate },
			{ name: 'popup', classes: 'popup box', kind: Popup, components: [
				{ name: 'text', content: '', allowHtml: true },
				{ tag: 'br' },
				{ kind: Button, content: 'Okay' },
			], centered: true, floating: true, modal: true, scrim: true, decoratorChanged: decorate },
		], bindings: [
			{from: '.model.decorator', to: '.$.box.decorator'},
			{from: '.model.decorator', to: '.$.popup.decorator'},
			{from: '.model.icon', to: '.$.icon.src'},
			{from: '.model.label', to: '.$.label.content'},
			{from: '.model.selected', to: '.$.popup.showing', oneWay: false,
					transform: function(isSelected, theDirection) {
				if (theDirection == 1) { // from -> to
					return isSelected && this.$.text.content;
				} else if (theDirection == 2) { // to -> from
					return isSelected;
				}
			}},
			{from: '.model.text', to: '.$.text.content'},
			{from: '.model.value', to: '.value'},
			{from: '.model.percent', to: '.$.progress.style', transform: function(thePercentage) {
				return 'width: ' + Math.floor(thePercentage * 100.0) + '%;';
			}},
		] },
	],
});

module.exports = kind({
	name: 'ScoresView',
	classes: 'enyo-fit scores-list',

	components:[
		{ name: 'repeater', classes: 'scores-list', kind: Repeater, fit: true },
	],
	bindings: [
		{ from: '.collection', to: '.$.repeater.collection' },
	],

	create: kind.inherit(function(parent) {
		return function() {
			this.collection = Scores.asCollection();
			parent.apply(this, arguments);
		};
	}),
});
