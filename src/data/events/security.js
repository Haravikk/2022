var	Events = require('../../classes/Events');

Events.add('security', {
	text: "We need to employ 10,000 new police officers to ensure communities are kept safe.",
	choices: [
		{label: "Yes", people: +1, affluent: +1, press: +1, security: +2, treasury: -1},
		{label: "No", people: -1, affluent: -1, press: -1, security: -2, treasury: +1},
	],
}, {
	text: "We need to appoint 500 more border security guards to ensure all visitors can be quickly checked.",
	choices: [
		{label: "Yes", people: +1, affluent: +1, oligarchs: +1, security: +1, press: +1, treasury: -1},
		{label: "No", people: -1, affluent: -1, oligarchs: -1, security: -1, press: -1, treasury: +1},
	],
}, {
	text: "For fast response to emergencies, we need 3,000 more fire officers.",
	choices: [
		{label: "Yes", people: +2, affluent: +2, oligarchs: +1, health: +1, security: +2, press: +1, treasury: -1},
		{label: "No", people: -2, affluent: -2, oligarchs: -1, health: -1, security: -2, press: -1, treasury: +1},
	],
}, {
	text: "To maintain effectiveness, our armed forces need to receive 2% of GDP.",
	choices: [
		{label: "Yes", people: +1, affluent: +1, oligarchs: +2, security: +2, press: +3},
		{label: "No", people: -1, affluent: -1, oligarchs: -2, security: -2, press: -3, treasury: +1},
	],
}, {
	text: "We need to spend £10 billion on cyber-security.",
	choices: [
		{label: "Yes", oligarchs: +1, security: +2, press: +2, treasury: -2},
		{label: "No", oligarchs: -1, security: -2, press: -2, treasury: +2},
	],
}, {
	text: "We should renew the Trident missile system to ensure the UK has a powerful deterrent.",
	choices: [
		{label: "Yes", people: +1, affluent: +2, oligarchs: +3, security: +1, press: +3, treasury: -2, tags: '.nukes'},
		{label: "No", people: -1, affluent: -2, oligarchs: -3, security: -1, press: -3, treasury: +2, tags: '.no-nukes'},
	],
}, {
	text: "Veterans of the armed forces should be given more support to help them adjust to daily life.",
	choices: [
		{label: "Yes", people: +2, affluent: +1, health: +1, security: +1, press: +1},
		{label: "No", people: -2, affluent: -1, health: -1, security: -1, press: -1},
	],
}, {
	text: "Arms sales to Saudia Arabia should be banned, as the Saudis use them for human rights abuses.",
	choices: [
		{label: "Yes", affluent: -1, oligarchs: -2, security: +1, press: -2, treasury: -1},
		{label: "No", affluent: +1, oligarchs: +2, security: +1, press: +2, treasury: +1},
	],
});
