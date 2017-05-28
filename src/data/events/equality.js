var	Events = require('../../classes/Events');

Events.add('equality', {
	text: "We should enhance the powers of the Equalities and Human Rights Commission.",
	choices: [
		{label: "Yes", people: +2, oligarchs: -1, press: -2},
		{label: "No", people: -2, oligarchs: -1, press: -2},
	],
}, {
	text: "All policy should be gender-audited before legislation.",
	choices: [
		{label: "Yes", people: +1, education: +1, press: -2},
		{label: "No", people: -1, education: -1, press: +2},
	],
}, {
	text: "Laws regarding LGBT hate crimes should be extended, to make them aggravated offences.",
	choices: [
		{label: "Yes", people: +1, affluent: +1, education: +1},
		{label: "No", people: -1, affluent: -1, education: -1},
	],
}, {
	text: "We should bring the European Union’s Charter of Fundamental Rights into UK law.",
	choices: [
		{label: "Yes", people: +1, oligarchs: -1, press: -3, security: +1},
		{label: "No", people: -1, oligarchs: +1, press: +3, security: -1},
	],
});
