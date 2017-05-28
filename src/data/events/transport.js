var	Events = require('../../classes/Events');

Events.add('transport', {
	text: "The transport network is too fragmented. Should we allow the private train companies to also run the infrastructure?",
	choices: [
		{label: "Yes", people: -1, oligarchs: +2, press: +1, treasury: -1},
		{label: "No", people: +1, oligarchs: -2, press: -1, treasury: +1},
	],
}, {
	text: "Privatisation of railways hasn't worked. As franchises expire, should we take the network back into public control?",
	choices: [
		{label: "Yes", people: +2, affluent: +1, oligarchs: -3, press: -2, treasury: +1},
		{label: "No", people: -2, affluent: -1, oligarchs: +3, press: +2, treasury: -1},
	],
}, {
	text: "We should support the creation of publicly-owned municipal bus companies.",
	choices: [
		{label: "Yes", people: +1, oligarchs: -2, press: -1},
		{label: "No", people: -1, oligarchs: +2, press: +1},
	],
}, {
	text: "We need new rail network investment - we need to build HS2 as soon as possible.",
	choices: [
		{label: "Yes", affluent: -1, oligarchs: +3, treasury: -2},
		{label: "No", affluent: +1, oligarchs: -3, treasury: +2},
	],
});
