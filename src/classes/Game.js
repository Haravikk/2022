var	kind = require('enyo/kind'),
	utils = require('enyo/utils'),

	Component = require('enyo/Component'),

	Events = require('./Events'),
	Scores = require('./Scores'),
	Settings = require('../data/settings');

module.exports = kind({
	kind: Component,

	events: {
		onEnd: '',
		onNextPhase: '',
		onNextStage: '',
	},

	extraTags: [],
	maxChoices: -1,
	random: false,
	turnEnd: 0,

	phase: 0,
	turn: 0,
	stage: 0,
	autoAdvance: false,
	stages: null,

	start: function() {
		if (!this.advancePhase()) { this.error('Phases missing:', Settings); }
		if (!this.advanceStage()) { this.error('Stages missing:', Settings); }
		return this.nextTurn();
	},

	advancePhase: function() {
		var thePhase = Settings.phases[this.phase];
		if (thePhase) {
			this.phase += 1;

			this.autoAdvance = thePhase.autoAdvance || false;
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
			this.doNextPhase(thePhase);
			return thePhase;
		}
		this.doEnd();
		return false;
	},

	advanceStage: function(theOptions) {
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
			this.random = !!theStage.random;

			this.doNextStage(theStage);
			return theStage;
		}

		this.stage = 0;
		this.turn += 1;

		// Advance the phase if we've run out of turns
		if ((this.turnEnd > 0) && (this.turn >= this.turnEnd)) {
			if (this.advancePhase() && this.advanceStage() && (this.autoAdvance)) { return true; }
		// If the queue is empty, then there may be no further possible matches
		} else if (Events.isQueueEmpty()) {
			for (var i = 0; i < this.stages.length; i += 1) {
				var eachStage = this.stages[i];
				if (Events.count({tags: eachStage.tags, alertsOnly: eachStage.choices === 0}) > 0) {
					hasPossibleMatches = true;
					this.stage = i;
					return false;
				}
			}
			// If there are no matches, advance the phase
			if (this.advancePhase() && this.advanceStage() && (this.autoAdvance)) { return true; }
		}
		return false;
	},

	makeChoice: function(theEvent, theChoice) {
		Events.applyChoice(theEvent, theChoice);
		if (theChoice.url) { window.open(theChoice.url); }
	},

	nextEvent: function() {
		var theEvent = Events.next({tags: this.extraTags, random: this.random, alertsOnly: this.maxChoices === 0});
		if (theEvent) {
			if (!theEvent.isAlert) { this.maxChoices -= 1; }
			return theEvent;
		}
		
		if (this.advanceStage()) { return this.nextEvent(); }
		return false;
	},

	nextTurn: function() {
		Events.queueAdvance();
		return this.nextEvent();
	},
});
