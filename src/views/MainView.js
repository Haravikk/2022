/**
	For simple applications, you might define all of your views in this file.
	For more complex applications, you might choose to separate these kind definitions
	into multiple files under this folder and require() as needed.
*/

var	kind = require('enyo/kind'),
	utils = require('enyo/utils'),

	Collection = require('enyo/Collection'),
	Image = require('enyo/Image'),
	Model = require('enyo/Model'),
	Signals = require('enyo/Signals'),

	FittableRows = require('layout/FittableRows'),
	Toolbar = require('onyx/Toolbar'),
	Scroller = require('enyo/Scroller'),
	Button = require('onyx/Button'),
	Popup = require('onyx/Popup'),

	FacebookButton = require('share/FacebookButton'),
	TwitterButton = require('share/TwitterButton'),

	Events = require('../classes/Events'),
	Scores = require('../classes/Scores'),

	ScoresView = require('./ScoresView'),
	Settings = require('../data/settings');

if (!Settings.sharing) { Settings.sharing = {}; }
if (window.location.hash == '#nosplash') { Events.setTag('.no-splash'); window.location.hash = ''; }

module.exports = kind({
	kind: FittableRows,
	fit: true,

	components:[
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

	firstPopup: true,
	keysActive: false,

	extraTags: [],
	maxChoices: -1,
	random: false,
	turnEnd: 0,

	phase: 0,
	turn: 0,
	stage: 0,

	autoAdvance: false,
	stages: null,

	alertDelay: 0,
	choiceDelay: 0,

	event: null,
	choices: [],

	rendered: kind.inherit(function(parent) { return function() {
		parent.apply(this, arguments);

		if (window.location.hash) {
			Scores.fromHex(window.location.hash.slice(1));
			this.$.scores.show();
			this.shareButtons();
		} else {
			this.advancePhase();
			this.nextTurn();
		}
	}}),

	newGame: function() {
		window.location.hash = '#nosplash';
		window.location.reload();
	},

	shareButtons: function() {
		var theURL = window.location.href;
		if (!window.location.hash) { theURL += '#' + Scores.toHex(); }

		this.$.facebook.set('url', theURL);
		this.$.twitter.set('url', theURL);
	},

	handleKeyPress: function(theSender, theEvent) {
		switch (theEvent.keyCode) {
			case 13:
				if (this.keysActive) {
					if (this.event) {
						if (this.event.choices.length <= 1) { this.makeChoice({choice: 0}); }
					} else { this.preGame(); }
				} else {
					if (!this.$.nextTurn.disabled) { this.nextTurn(); }
				}
			break;
		}
	},

	advancePhase: function() {
		var thePhase = Settings.phases[this.phase];
		if (thePhase) {
			this.phase += 1;

			this.autoAdvance = thePhase.autoAdvance || false;
			this.currentTurnLabel = thePhase.currentTurnLabel;
			this.nextTurnLabel = thePhase.nextTurnLabel || 'Next Turn';

			this.turn = thePhase.start || 0;
			this.turnEnd = thePhase.end || 0;
			if (this.turn > this.turnEnd) {
				this.error('Invalid phase: First turn cannot be higher than last', thePhase);
				this.turn = this.turnEnd;
			}

			switch (typeof thePhase.stages) {
				case 'object':
					if (!Array.isArray(thePhase.stages)) { thePhase.stages = [thePhase.stages]; }
					this.stages = thePhase.stages;
				break;
				default:
					this.error('Invalid phase: Phase must contain stages', thePhase);
					return this.advancePhase();
			}

			this.stage = 0;
			this.$.scores.set('showing', !thePhase.hideScores);

			this.setTurnButton(this.nextTurnLabel);
			this.$.nextTurn.set('disabled', false);
			return true;
		}

		// End of the game
		this.$.scores.show();
		this.$.buttons.hide();
		this.shareButtons();
		this.$.share.show();
		return false;
	},

	advanceStage: function() {
		var theStage = this.stages[this.stage];
		if (theStage) {
			this.stage += 1;
			switch (typeof theStage.choices) {
				case 'number':
					this.maxChoices = theStage.choices;
				break;
				case 'undefined':
					this.maxChoices = -1;
				break;
				default:
					this.error('Invalid stage choices:', theStage.choices);
					this.maxChoices = 0;
				break;
			}

			this.extraTags = [];
			switch (typeof theStage.tags) {
				case 'undefined': break;
				case 'string':
					theStage.tags = [theStage.tags];
				// Fallthrough
				case 'object':
					if (Array.isArray(theStage.tags)) {
						this.extraTags = theStage.tags;
						break;
					}
				// Fallthrough
				default:
					this.error('Invalid tags for turn stage:', theStage.tags);
					delete theStage.tags;
				break;
			}

			this.alertDelay = theStage.alertDelay;
			if (!this.alertDelay && (this.alertDelay !== 0)) { this.alertDelay = Settings.alertDelay; }
			this.choiceDelay = theStage.choiceDelay || Settings.choiceDelay || 0;
			if (!this.choiceDelay && (this.choiceDelay !== 0)) { this.choiceDelay = Settings.choiceDelay; }

			this.random = !!theStage.random;
			return true;
		}

		this.stage = 0;
		this.turn += 1;

		// Advance the phase if we've run out of turns
		if ((this.turnEnd > 0) && (this.turn >= this.turnEnd)) {
			if (this.advancePhase() && this.autoAdvance) { return true; }
		// If the queue is empty, then there may be no further possible matches
		} else if (Events.isQueueEmpty()) {
			var hasPossibleMatches = false;
			for (var i = 0; i < this.stages.length; i += 1) {
				var eachStage = this.stages[i];
				if (Events.count({tags: eachStage.tags, alertsOnly: eachStage.choices === 0}) > 0) {
					hasPossibleMatches = true;
					this.stage = i;
					break;
				}
			}
			// If there are no matches, advance the phase
			if (!hasPossibleMatches) {
				if (this.advancePhase() && this.autoAdvance) { return true; }
			}
		}

		this.setTurnButton(this.nextTurnLabel);
		this.$.nextTurn.set('disabled', false);
		return false;
	},

	_interval: false,
	makeChoice: function(theSender) {
		this.hidePopup();
		if (this.event.isAlert) { this.$.popup.removeClass('alert'); }
		this.event.classes.forEach(function(eachClass) { this.$.popup.removeClass(eachClass); }, this);

		var theChoice = this.event.choices && this.event.choices[theSender.choice];
		if (theChoice) {
			Events.applyChoice(this.event, theChoice);
			if (theChoice.url) { window.open(theChoice.url); }
		}

		var theDelay = ((this.event.choices && this.event.choices.length > 1) ? this.choiceDelay : this.alertDelay) * 1000;
		if (theDelay < 10) { theDelay = 10; }

		if (this._interval) { window.clearInterval(this._interval); }
		this._interval = window.setTimeout(utils.bind(this, 'nextEvent'), theDelay);
	},

	advance: function() {
		if (this.advanceStage() && this.nextEvent()) { return true; }
		return false;
	},

	nextEvent: function() {
		var theEvent = Events.next({tags: this.extraTags, random: this.random, alertsOnly: this.maxChoices === 0});
		if (theEvent) {
			this.event = theEvent;

			while (this.choices.length) { this.choices.pop().destroy(); };

			var choices = [];
			if (Array.isArray(theEvent.choices)) {
				if (theEvent.isAlert) { this.$.popup.addClass('alert'); }
				else if (this.maxChoices > 0) { this.maxChoices -= 1; }
				Events.applyEffects(theEvent);

				theEvent.choices.forEach(function(eachChoice, theIndex) {
					choices.push({name: '' + theIndex, choice: theIndex, kind: Button,
						content: eachChoice.label, ontap: 'makeChoice'});
				});
			} else if (theEvent.choices === 'none') {
				theEvent.choices = [];

				this.$.popup.set('modal', true);
				this.$.popup.set('scrim', true);
				this.$.popup.set('autoDismiss', true);

				this.popupTapped = utils.bind(this, function(theSender, theEvent) {
					this.$.popup.hide(); this.firstPopup = true;
					this.$.popup.set('modal', false);
					this.$.popup.set('scrim', false);
					this.$.popup.set('autoDismiss', false);
					this.popupTapped = function() {};
					this.makeChoice(theSender);
				});
			} else {
				this.event.choices = [];
				this.$.popup.addClass('alert');
				choices.push({name: '0', choice: 0, kind: Button,
					content: 'Okay', ontap: 'makeChoice'});
			}
			if (choices.length > 0) { this.choices = this.$.choices.createComponents(choices, {owner: this}); }
			else { this.choices = []; }
			this.$.choices.render();

			switch (typeof this.event.classes) {
				case 'string':
					this.event.classes = this.event.classes.split(' ');
				break;
				case 'object':
					if (Array.isArray(this.event.classes)) { break; }
				// Fallthrough
				default:
					this.error('Invalid event classes:', this.event.classes);
				// Fallthrough
				case 'undefined':
					this.event.classes = [];
				break;
			}

			this.event.classes.forEach(function(eachClass) { this.$.popup.addClass(eachClass); }, this);
			this.$.text.set('content', theEvent.text);
			this.showPopup();

			this.$.nextTurn.set('disabled', true);
			this.setTurnButton(this.currentTurnLabel);
			return true;
		}
		return this.advance();
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

	nextTurn: function() {
		Events.queueAdvance();
		this.advanceStage();
		return this.nextEvent();
	},

	setTurnButton: function(theLabel) {
		if (!theLabel && (theLabel !== '')) { theLabel = 'Turn %t'; }
		this.$.nextTurn.set('content', theLabel.replace('%t', this.turn));
	},
});
