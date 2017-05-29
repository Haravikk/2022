/**
	For simple applications, you might define all of your views in this file.
	For more complex applications, you might choose to separate these kind definitions
	into multiple files under this folder and require() as needed.
*/

var	kind = require('enyo/kind'),
	utils = require('enyo/utils'),

	Signals = require('enyo/Signals'),

	FittableRows = require('layout/FittableRows'),
	Toolbar = require('onyx/Toolbar'),
	Scroller = require('enyo/Scroller'),
	Button = require('onyx/Button'),
	Popup = require('onyx/Popup'),

	FacebookButton = require('share/FacebookButton'),
	TwitterButton = require('share/TwitterButton'),

	Events = require('../classes/Events'),
	Game = require('../classes/Game'),
	Scores = require('../classes/Scores'),

	ScoresView = require('./ScoresView'),
	Settings = require('../data/settings');

if (!Settings.sharing) { Settings.sharing = {}; }
if (window.location.hash == '#restarted') { Events.setTag('.restarted'); window.location.hash = ''; }

module.exports = kind({
	kind: FittableRows,
	fit: true,

	components:[
		{name: 'game', kind: Game, onEnd: 'onEnd', onNextPhase: 'onNextPhase', onNextStage: 'onNextStage'},

		{kind: Toolbar, classes: 'title', content: Settings.title},
		{kind: Signals, onkeydown: 'handleKeyPress'},
		{name: 'popup', classes: 'event popup box preGame', kind: Popup, components: [
			{name: 'text', content: Settings.preGame, allowHtml: true},
			{tag: 'br'},
			{name: 'choices', kind: FittableRows},
		], centered: true, floating: true, autoDismiss: false, ontap: 'popupTapped', onHide: 'popupTapped'},
		{kind: Scroller, classes: 'main', fit: true, components: [
			{name: 'scores', kind: ScoresView, fit: true, showing: false},
		]},
		{name: 'buttons', classes: 'toolbar', kind: Toolbar, style: 'text-align: center', components: [
			{name: 'nextTurn', kind: Button, content: Settings.startGame, ontap: 'nextTurn'},
		], showing: !window.location.hash},
		{name: 'share', classes: 'toolbar', kind: Toolbar, style: 'text-align: center', components: [
			{name: 'twitter', kind: TwitterButton, hashTags: Settings.sharing.hashTags, text: Settings.sharing.text, url: window.location},
			{kind: Button, content: 'New Game', ontap: 'newGame'},
			{name: 'facebook', kind: FacebookButton, url: window.location},
		], showing: !!window.location.hash},
	],
	bindings: [
		{from: '.choices', to: '.$.choices.collection'},
	],

	alertDelay: 0,
	choiceDelay: 0,

	currentTurnLabel: '%t',
	nextTurnLabel: 'Next Turn', // TODO: Localise this

	choices: [],

	firstPopup: true,

	rendered: kind.inherit(function(parent) { return function() {
		parent.apply(this, arguments);

		if (window.location.hash) {
			Scores.fromHex(window.location.hash.slice(1));
			this.$.scores.show();
			this.shareButtons();
		} else {
			var theEvent = this.$.game.start();
			if (theEvent) { this.displayEvent(theEvent); }
			else { this.error('Unable to start the game!'); this.onEnd(); }
		}
	}}),

	newGame: function() {
		window.location.hash = '#restarted';
		window.location.reload();
	},

	shareButtons: function() {
		if (!window.location.hash) { window.location.hash = Scores.toHex(); }
		this.$.facebook.set('url', window.location.href);
		this.$.twitter.set('url', window.location.href);
	},

	handleKeyPress: function(theSender, theEvent) {
		switch (theEvent.keyCode) {
			case 13:
				if (!this.$.scores.hidePopup()) {
					if (this.$.popup.hasClass('showing')) {
						if (this.choices.length === 1) { this.makeChoice(this.choices[0]); }
						else if (this.choices.length === 0) { this.popupTapped(); }
					} else if (this.$.buttons.showing && !this.$.nextTurn.disabled) { this.nextTurn(); }
				}
			break;
		}
	},

	onEnd: function() {
		this.$.scores.show();
		this.$.buttons.hide();
		this.$.nextTurn.set('disabled', true);
		this.shareButtons();
		this.$.share.show();
		return false;
	},

	onNextPhase: function(theSender, thePhase) {
		if (thePhase.currentTurnLabel || (thePhase.currentTurnLabel === '')) { this.currentTurnLabel = thePhase.currentTurnLabel; }
		else { this.currentTurnLabel = '%t'; }
		this.nextTurnLabel = thePhase.nextTurnLabel || 'Next Turn'; // TODO: Localise this

		this.$.scores.set('showing', !thePhase.hideScores);

		if (!thePhase.autoAdvance) {
			this.setTurnButton(this.nextTurnLabel);
			this.$.nextTurn.set('disabled', false);
		}
	},

	onNextStage: function(theSender, theStage) {
		this.alertDelay = theStage.alertDelay;
		if (!this.alertDelay && (this.alertDelay !== 0)) { this.alertDelay = Settings.alertDelay; }
		this.choiceDelay = theStage.choiceDelay || Settings.choiceDelay || 0;
		if (!this.choiceDelay && (this.choiceDelay !== 0)) { this.choiceDelay = Settings.choiceDelay; }
	},

	_timeout: false,
	makeChoice: function(theSender) {
		this.hidePopup();

		var theEvent = theSender.event, theChoice = theSender.choice;
		if (theChoice) { this.$.game.makeChoice(theEvent, theChoice); }

		if (theEvent.isAlert) { this.$.popup.removeClass('alert'); }
		theEvent.classes.forEach(function(eachClass) { this.$.popup.removeClass(eachClass); }, this);

		while (this.choices.length) { this.choices.pop().destroy(); };

		var theNextEvent = this.$.game.nextEvent();
		if (theNextEvent) {
			var theDelay = ((theEvent.choices.length > 1) ? this.choiceDelay : this.alertDelay) * 1000;
			if (theDelay < 10) { theDelay = 10; } //this.displayEvent(theNextEvent); }

			if (this._timeout) { window.clearTimeout(this._timeout); }
			this._timeout = window.setTimeout(utils.bind(this, 'displayEvent', theNextEvent), theDelay);
		} else {
			this.setTurnButton(this.nextTurnLabel);
			this.$.nextTurn.set('disabled', false);
		}
		return true;
	},

	nextTurn: function() {
		var theEvent = this.$.game.nextTurn();
		if (theEvent) { this.displayEvent(theEvent); }
	},

	displayEvent: function(theEvent) {
		var choices = [];
		if (Array.isArray(theEvent.choices)) {
			if (theEvent.isAlert) { this.$.popup.addClass('alert'); }
			theEvent.choices.forEach(function(eachChoice, theIndex) {
				choices.push({name: '' + theIndex, event: theEvent, choice: eachChoice, kind: Button,
					content: eachChoice.label, ontap: 'makeChoice'});
			});
		} else if (theEvent.choices === 'none') {
			theEvent.choices = [];

			this.$.popup.set('modal', true);
			this.$.popup.set('scrim', true);
			this.$.popup.set('autoDismiss', true);

			this.popupTapped = utils.bind(this, function(theSender, theTapEvent) {
				this.popupTapped = function() {};
				if (this.$.popup.showing) {
					this.$.popup.hide();
					this.hidePopup();
					this.firstPopup = true;

					this.$.popup.set('modal', false);
					this.$.popup.set('scrim', false);
					this.$.popup.set('autoDismiss', false);
					this.makeChoice({event: theEvent});
				}
				return true;
			});
		} else {
			theEvent.choices = [];
			this.$.popup.addClass('alert');
			choices.push({name: '0', event: theEvent, kind: Button, content: 'Okay', ontap: 'makeChoice'});
		}

		if (choices.length > 0) { this.choices = this.$.choices.createComponents(choices, {owner: this}); }
		this.$.choices.render();

		switch (typeof theEvent.classes) {
			case 'string':
				theEvent.classes = theEvent.classes.split(' ');
			break;
			case 'object':
				if (Array.isArray(theEvent.classes)) { break; }
			// Fallthrough
			default:
				this.error('Invalid event classes:', theEvent.classes);
			// Fallthrough
			case 'undefined':
				theEvent.classes = [];
			break;
		}

		theEvent.classes.forEach(function(eachClass) { this.$.popup.addClass(eachClass); }, this);
		this.$.text.set('content', theEvent.text);
		this.showPopup();

		this.$.nextTurn.set('disabled', true);
		this.setTurnButton(this.currentTurnLabel);
	},

	hidePopup: function() {
		this.$.popup.removeClass('showing');
		this.$.popup.addClass('hidden');
		this.$.popup.render();
		this.keysActive = false;
	},

	showPopup: function() {
		this.$.popup.removeClass('hidden');
		this.$.popup.addClass('showing');
		if (this.firstPopup) { this.$.popup.show(); this.firstPopup = false; }
		this.$.popup.render();
		this.keysActive = true;
	},

	popupTapped: function() {},

	setTurnButton: function(theLabel) {
		if (!theLabel && (theLabel !== '')) { theLabel = 'Turn %t'; }
		this.$.nextTurn.set('content', theLabel.replace('%t', this.$.game.turn));
	},
});
