var	Events = require('../../classes/Events');

Events.add('foreign', {
	text: "No Brexit deal is better than a bad Brexit deal. We should just leave the EU, whatever the cost.",
	choices: [
		{label: "Yes", people: -1, affluent: -2, oligarchs: -1, health: -2, education: -2, press: +3, treasury: -3, security: -1, tags: '.anti_eu'},
		{label: "No", people: +1, affluent: +2, oligarchs: +1, health: +2, education: +2, press: -3, treasury: +3, security: +1},
	],
}, {
	text: "We need to guarantee the rights of EU citizens currently living in the UK.",
	choices: [
		{label: "Yes", health: +2, press: -2, treasury: +2},
		{label: "No", health: -2, press: +2, treasury: -2, tags: '.anti_migrant'},
	],
}, {
	text: "We need to join any attack that Donald Trump orders against Syria.",
	choices: [
		{label: "Yes", people: -2, affluent: -1, oligarchs: +1, press: +2, treasury: -1, security: -2},
		{label: "No", people: +2, affluent: +1, oligarchs: -1, press: -2, treasury: +1, security: +2},
	],
}, {
	text: "It doesn't matter where military equipment comes from. We should order the cheapest, from wherever.",
	choices: [
		{label: "Yes", people: -1, oligarchs: +2, treasury: +1, security: -3},
		{label: "No", people: +1, oligarchs: -2, treasury: -1, security: +3},
	],
}, {
	text: "We must reduce migration to the tens of thousands.",
	requires: '!.free_movement',
	choices: [
		{label: "Yes", people: +1, affluent: -1, health: -3, education: -3, press: +3, treasury: -3, security: +1, tags: '.anti_migrant'},
		{label: "No", people: -1, affluent: +1, health: +3, education: +3, press: -3, treasury: +3, security: -1},
	],
}, {
	text: "We need to retain access to the Single Market, whatever the cost.",
	choices: [
		{label: "Yes", people: +1, health: +1, education: +1, press: -3, treasury: +2, tags: ['.free_movement', '!.anti_eu']},
		{label: "No", people: -1, health: -1, education: -1, press: +3, treasury: -2, tags: '.anti_migrant'},
	],
}, {
	text: "We have huge aircraft carriers but no planes to put on them. Should we let the US use them?",
	choices: [
		{label: "Yes", oligarchs: +1, press: +1, treasury: +1, security: -1},
		{label: "No", oligarchs: -1, press: -1, treasury: -1, security: +1},
	],
});
