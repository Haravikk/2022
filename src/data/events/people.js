var	Events = require('../../classes/Events');

Events.add('people', {
	text: "<img src='assets/block_renamed.png' classes='pic' height='150' /><br />You've had a council housing block named after you, in praise of your integrity.",
	requires: ['.alert', { people: '>35' }],
	classes: 'people',

	choices: [{
		label: 'Nice!',
		events: [{
			delay: 1,

			text: "<img src='assets/ale_inyour_name.png' classes='pic' height='150' /><br />Artisan real ale brewers have named a beer after you, in praise of your fairness.",
			requires: ['.alert', { people: '>40' }],
			classes: 'people',
			treasury: +1,

			choices: [{
				label: 'Sweet!',
				events: [{
					delay: 1,

					text: "<img src='assets/street_party.png' classes='pic' height='150' /><br />People love you! Spontaneous raves and street parties have occurred in your honour.",
					requires: ['.alert', { people: '>45' }],
					classes: 'people',
					health: +1,
					treasury: +1,

					choices: [{label: 'Truly, I am their champion'}],
				}],
			}],
		}],
	}],
}, {
	text: "<img src='assets/egged.png' classes='pic' height='150' /><br />In protest at your policies, you've been egged!",
	requires: ['.alert', { people: '<15' }],
	classes: 'people',

	choices: [{
		label: 'Ewww!',
		press: -2,
		events: [{
			delay: 1,

			text: "<img src='assets/effigy.jpg' classes='pic' height='150' /><br />The people are angry! Your effigy is to be burned at the Lewes Bonfire.<br/>Worse, you're not even invited!",
			requires: ['.alert', { people: '<10' }],
			classes: 'people',
			health: -1,
			security: -1,

			choices: [{
				label: 'Damn!',
				events: [{
					delay: 1,

					text: "<img src='assets/riots.png' classes='pic' height='150' /><br />Riots have been reported in major urban centres. Your advisors reliably inform you that the people are angry!",
					requires: ['.alert', { people: '<5' }],
					health: -1,
					security: -2,

					choices: [{label: 'Strong and stable!'}],
				}],
			}],
		}],
	}],
});
