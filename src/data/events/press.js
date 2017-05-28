var	Events = require('../../classes/Events');

Events.add('press', {
	text: "Today's Daily Smear headline:<br /><span class='headline'>Last Foreigner Sets Sail: Britain Great Again!</span>",
	requires: ['.alert', '.anti_migrant', { press: '>10' }],
	classes: 'press',

	choices: [{label: 'They took our jobs!'}],
}, {
	text: "Today's Daily Smear headline:<br /><span class='headline'>March on London: Take Back OUR Country!</span>",
	requires: ['.alert', { press: '<4' }],
	classes: 'press',
	people: -1,

	choices: [{
		label: "I'll be off sick that day",
		events: [{
			delay: 1,

			text: "Today's Daily Smear headline:<br /><span class='headline'>European Wasps Invade, Government on the Rocks!</span>",
			requires: ['.alert', '.free_movement', { press: '<3' }],
			classes: 'press',
			people: -1,

			choices: [{label: 'At least they got my good side'}],
		}, {
			delay: 1,

			text: "Today's Daily Smear headline:<br /><span class='headline'>Failing Britain, Failing the Elderly Again!</span>",
			requires: ['.alert', '!.free_movement', '.anti_elderly', { press: '<3' }],
			classes: 'press',
			people: -2,
			affluent: -2,

			choices: [{label: "Seems a bit much"}],
		}, {
			delay: 1,

			text: "Today's Daily Smear headline:<br /><span class='headline'>Unhinged PM is destroying Britain!</span>",
			requires: ['.alert', '!.free_movement', '!.anti_elderly', { press: '<3' }],
			classes: 'press',
			people: -2,

			choices: [{label: "A bit harsh"}],
		}, {
			delay: 1,

			text: "Today's Daily Smear headline:<br /><span class='headline'>Pacifist Snowflake PM Leaves Britain Defenceless!</span>",
			requires: ['.alert', '.no-nukes', {press: '<4'}],
			classes: 'press',
			people: -3,
			choices: [{label: "I'm no snowflake!"}],
		}],
	}],
}, {
	text: "Today's Daily Smear headline:<br /><span class='headline'>Nuke 'em All!</span>",
	requires: ['.alert', '.nukes', {press: '>4'}],
	classes: 'press',
	security: -1,
	people: -1,

	choices: [{label: "Uh… it's a deterrent!"}],
}, {
	text: "Today's Daily Smear headline:<br /><span class='headline'>Fox is Back on the Menu Boys!</span>",
	requires: ['.alert', '.fox-hunt', {press: '>4'}],
	classes: 'press',
	affluent: +1,
	people: -2,

	choices: [{label: "Uh… yum?"}],
});
