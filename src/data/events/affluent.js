var	Events = require('../../classes/Events');

Events.add('affluent', {
	text: "<img src='assets/malvern.png' classes='pic' height='150' /><br />The affluent residents of Malvern have made you an honorary citizen.",
	requires: ['.alert', { affluent: '>40' }],
	classes: 'affluent',

	choices: [{
		label: "I'll bring the caviar!",
		events: [{
			delay: 1,

			text: "<img src='assets/foxhunt.png' classes='pic' height='150' /><br />You've been invited to a fox-hunt in gratitude for helping your betters.",
			requires: ['.alert', '.fox_hunt', { affluent: '>40' }],
			classes: 'affluent',
			people: -3,

			choices: [{label: 'Blood sports? My favourite!'}],
		}],
	}],
}, {
	text: "<img src='assets/green_wellies.png' classes='pic' height='150' /><br />In protest at your antagonism, toffs have dumped thousands of green wellies outside Whitehall!",
	requires: ['.alert', { affluent: '<15' }],
	classes: 'affluent',
	press: -1,

	choices: [{
		label: "I'm… outraged?",
		events: [{
			delay: 1,

			text: "<img src='assets/rr_blockade.png' classes='pic' height='150' /><br />Range Rovers have formed a blockade on the M1 in outrage at your unfairness towards the comfortable",
			requires: ['.alert', { affluent: '<10' }],
			classes: 'affluent',
			press: -2,

			choices: [{label: "I shall send a strongly worded letter at once!"}],
		}],
	}],
});
