var kind = require('enyo/kind'),
	Model = require('enyo/Model');

module.exports = kind.singleton({
	title: 'To Twenty Twenty Two',

	/**
	 * Structure of the game as a set of phases with following options:
	 *	- autoAdvance: `true` to advance automatically (no turn button), `false` if not.
	 *	- start: the turn number to begin from (default 0)
	 *	- end: the turn number to end at, the number of turns played is therefore end - start. If end isn't specified 
	 *		   then the phase continues the stages have been exhausted of events.
	 *  - hideScores: if `true`, scores will be hidden during this phase, otherwise they will appear. This can be used 
	 *				  hide scores until the end of the game.
     *  - currentTurn:
	 *	- stages: required. An single object, or array of multiple objects. Each turn begins with the first stage, then 
	 *			  the second and so-on until stages are exhausted, at which point a new turn may begin. Stages have the
	 *			  following options:
	 *		- tags: a string, or array of strings, defining one or more tag(s) to enable (or disable) for the stage, 
	 *				allowing particular events to be selected.
	 *		- choices: the number of choices to display for the stage; note, a choice is any event with two or more
	 *				   options, all other events are considered to be alerts. If unspecified or negative, the stage will
	 *				   last until no more matching events are found.
	 *		- random: if `true`, select events randomly, rather than in-order. Note, events are still selected in 
	 *				  priority order, however a random event of the highest priority is chosen.
	 */
	phases: [
		{ autoAdvance: true, stages: [
			{ tags: '.splash', choices: 0, alertDelay: 0.1 },
			{ tags: '.preGame', choices: 0, alertDelay: 0 },
		], currentTurnLabel: 'Start'},
		{ start: 2017, end: 2022, autoAdvance: false, stages: [
			{ tags: '.alert', choices: 0, random: true },
			{ choices: 10, random: true },
		], currentTurnLabel: '%t', nextTurnLabel: 'Start %t'},
		{ start: 2022, end: 2022, autoAdvance: true, stages: [
			{ tags: '.alert', choices: 0, random: true },
			{ tags: '.end', choices: 0, random: false },
		], currentTurnLabel: '%t'},
	],

	alertDelay: 0.25, // Time (in seconds) to wait after an alert is closed
	choiceDelay: 0.75, // Time (in seconds) to wait after a choice is made

	sharing: {
		hashTags: 'VoteLabour', // Comma-separated hash-tags (not too many!)
		text: 'Check out my score in 2022!', // Sharing message (keep it short for Twitter!)
	},
});
