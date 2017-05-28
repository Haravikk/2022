var	Events = require('../../classes/Events');

Events.add('housing', {
	text: "There's a huge shortage of affordable housing. We should initiate a programme of council house building - 100,000 new homes a year.",
	choices: [
		{label: "Yes", people: +2, affluent: +1, oligarchs: +1, health: +1, press: +1, treasury: +1},
		{label: "No", people: -2, affluent: -1, oligarchs: -1, health: -1, press: -1, treasury: -1},
	],
}, {
	text: "Private sector rents are far too high! We should introduce rent controls.",
	choices: [
		{label: "Yes", people: +3, affluent: -1, oligarchs: -2, health: +1, press: -3},
		{label: "No", people: -3, affluent: +1, oligarchs: +2, health: -1, press: +3},
	],
}, {
	text: "If we want to provide more housing, we'll have to build New Towns to ensure the surroundings are decent.",
	choices: [
		{label: "Yes", health: +1, education: +1},
		{label: "No", health: -1, education: -1},
	],
}, {
	text: "Guarantee Help to Buy funding until 2027 to give long-term certainty to both first-time buyers and the housebuilding industry.",
	choices: [
		{label: "Yes", people: +2, affluent: +1, press: +1, treasury: -1},
		{label: "No", people: -2, affluent: -1, press: -1, treasury: +1},
	],
}, {
	text: "Three-year tenancies should be the norm when renting a property.",
	choices: [
		{label: "Yes", people: +2, affluent: -1, oligarchs: -2, press: -1},
		{label: "No", people: -2, affluent: +1, oligarchs: +2, press: +1},
	],
}, {
	text: "House prices show signs of falling! We should pump money into the market, to make it easier to borrow.",
	choices: [
		{label: "Yes", people: +1, affluent: +2, oligarchs: +1, press: +2, treasury: -3},
		{label: "No", people: -1, affluent: -2, oligarchs: -1, press: -2, treasury: +3},
	],
}, {
	text: "House prices have crashed! Millions of people face negative equity and possible eviction. We should put a moratorium on evictions.",
	choices: [
		{label: "Yes", people: +3, oligarchs: -3, health: +1, treasury: -1},
		{label: "No", people: -3, oligarchs: +3, health: -1, treasury: +1},
	],
});
