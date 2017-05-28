var	Events = require('../../classes/Events');

Events.add('oligarchs', {
	text: "<img src='assets/bahamas.png' classes='pic' height='150' /><br />Rick Branston has invited you to the Bahamas, as thanks for everything you've done for him so far.",
	requires: ['.alert', { oligarchs: '>20' }],
	classes: 'oligarchs',
	treasury: +1,

	choices: [{
		label: "All in a day's work!",
		events: [{
			delay: 1,

			text: "<img src='assets/speaking_tour.png' classes='pic' height='150' /><br />You've been invited to do a lucrative speaking tour of the USA.",
			requires: ['.alert', { oligarchs: '>25' }],
			classes: 'oligarchs',
			treasury: +1,

			choices: [{
				label: "I'll charge £100,000 a night!",
				events: [{
					delay: 1,

					text: "<img src='assets/security_corp.png' classes='pic' height='150' /><br />As thanks for your tireless service to the rich, you've been guaranteed a lucrative director's job with a major security corporation",
					requires: ['.alert', { oligarchs: '>45' }],
					classes: 'oligarchs',
					treasury: +1,

					choices: [{label: 'Anyone for a knighthood?'}],
				}],
			}],
		}],
	}],
}, {
	text: "<img src='assets/green_teeth.jpg' classes='pic' height='150' /><br />Furious oligarchs have funded an internet smear campaign, depicting you as having green teeth",
	requires: ['.alert', { oligarchs: '<10' }],
	classes: 'oligarchs',

	choices: [{
		label: 'My street-cred is ruined!',
		people: -2,
		press: -1,
		treasury: -1,

		events: [{
			delay: 1,

			text: "<img src='assets/loyalty.png' classes='pic' height='150' /><br />Your supermarket loyalty cards have been mysteriously cancelled.",
			requires: ['.alert', { oligarchs: '<10' }],
			classes: 'oligarchs',
			treasury: -2,

			choices: [{
				label: "Now I'll never get that free quinoa!",
				events: [{
					delay: 1,

					text: "<img src='assets/bin_checking.png' classes='pic' height='150' /><br />Someone, perhaps an employee, appears to be collecting your bins every day and leaking the contents to the press!",
					requires: ['.alert', { oligarchs: '<5' }],
					classes: 'oligarchs',
					press: -2,
					security: -1,
					treasury: -1,

					choices: [{label: 'My screenplays!'}],
				}],
			}],
		}],
	}],
});
