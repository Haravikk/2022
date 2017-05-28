var	Events = require('../../classes/Events');

Events.add('education', {
	text: "Class sizes in primary schools are out of control, with thousands of children in classes of 30 pupils and over. Let's add more funds to primary education.",
	choices: [
		{label: "Yes", people: +1, affluent: +1, education: +2, treasury: -1},
		{label: "No", people: -1, affluent: -1, education: -2, treasury: +1},
	],
}, {
	text: "We should invest in early years education to ensure that parents have access to childcare.",
	choices: [
		{label: "Yes", people: +1, affluent: +1, education: +2, press: +1, treasury: -1},
		{label: "No", people: -1, affluent: -1, education: -2, press: -1, treasury: +1},
	],
}, {
	text: "If we introduce free school meals for all primary school children, this will help educational attainment across rich and poor families.",
	choices: [
		{label: "Yes", people: +1, oligarchs: -1, education: +1, press: -2, treasury: -1},
		{label: "No", people: -1, oligarchs: +1, education: -1, press: +2, treasury: +1},
	],
}, {
	text: "We should introduce free, life-long adult education in further education colleges.",
	choices: [
		{label: "Yes", people: +1, oligarchs: -1, education: +2, press: -1, treasury: -1},
		{label: "No", people: -1, oligarchs: +1, education: -2, press: +1, treasury: +1},
	],
}, {
	text: "We need to re-introduce 11-plus exams, with grammar schools, to make education more like the 1950s.",
	choices: [
		{label: "Yes", people: -1, affluent: +1, education: -2, press: +3},
		{label: "No", people: +1, affluent: -1, education: +2, press: -3},
	],
}, {
	text: "Parents and private interests should be empowered to set up 'free schools' funded by public money, if they would like to.",
	choices: [
		{label: "Yes", affluent: +1, oligarchs: +1, education: -1, press: +2, treasury: -2},
		{label: "No", affluent: -1, oligarchs: -1, education: +1, press: -2, treasury: +2},
	],
}, {
	text: "Let's abolish tuition fees for university students.",
	choices: [
		{label: "Yes", people: +1, oligarchs: -1, education: +1, press: -2, treasury: -2},
		{label: "No", people: -1, oligarchs: +1, education: -1, press: +2, treasury: +2},
	],
}, {
	text: "The numbers of tests for younger children should be reduced.",
	choices: [
		{label: "Yes", people: +1, health: +1, education: +2, press: -1},
		{label: "No", people: -1, health: -1, education: -2, press: +1},
	],
});
