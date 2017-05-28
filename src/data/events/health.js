var	Events = require('../../classes/Events');

Events.add('health', {
	text: "There's a crisis in the NHS. Doctors and nurses are calling for more funding. We should add emergency funds.",
	requires: { health: '< 5' },
	choices: [
		{label: "Yes", people: +3, affluent: +2, health: +3, treasury: -2},
		{label: "No", people: -2, affluent: -1, health: -2, treasury: +2}
	],
}, {
	text: "We should commit to seeing every patient in A+E within 4 hours.",
	choices: [
		{label: "Yes", people: +2, affluent: +2, health: +2},
		{label: "No", people: -2, affluent: -1, health: -2},
	],
}, {
	text: "We should commit to guaranteeing access for patients to treatment within 18 weeks.",
	choices: [
		{label: "Yes", people: +2, affluent: +2, health: +2},
		{label: "No", people: -2, affluent: -2, health: -2},
	],
}, {
	text: "We need to reintroduce bursaries for health-related degrees.",
	choices: [
		{label: "Yes", people: +1, health: +2, education: +1, treasury: -1},
		{label: "No", people: -1, health: -2, education: -1, treasury: +1},
	],
}, {
	text: "We need to add £30 billion of funding up to 2022 to the NHS.",
	choices: [
		{label: "Yes", people: +2, health: +2, treasury: -3},
		{label: "No", people: -2, health: -2, treasury: +3},
	],
}, {
	text: "The NHS should be the preferred provider of NHS services and we need to ensure no excess profits are made.",
	choices: [
		{label: "Yes", people: +2, oligarchs: -3, health: +2, press: -2, treasury: +1},
		{label: "No", people: -2, oligarchs: +3, health: -2, press: +2, treasury: -1},
	],
}, {
	text: "We need a National Care Service to be introduced, to ensure fair provision for the elderly.",
	choices: [
		{label: "Yes", people: +2, affluent: +1, oligarchs: -1, health: +1, press: -1},
		{label: "No", people: -2, affluent: -1, oligarchs: +1, health: -1, press: +1},
	],
}, {
	text: "We should ensure that mental health funding is ring-fenced.",
	choices: [
		{label: "Yes", people: +1, affluent: +1, health: +1, press: -1},
		{label: "No", people: -1, affluent: -1, health: -1, press: +1},
	],
}, {
	text: "There's an obesity epidemic affecting young people. We should ban adverts for sugary and fatty foods.",
	requires: { health: '< 5' },
	choices: [
		{label: "Yes", people: +1, affluent: +1, oligarchs: -2, health: +1, treasury: +1},
		{label: "No", people: -1, affluent: -1, oligarchs: +2, health: -1, treasury: -1},
	],
}, {
	text: "If an elderly person is deemed to have assets worth over £100,000, including their home, they should pay their own social care costs.",
	choices: [
		{label: "Yes", people: -2, affluent: -2, health: -2, press: -2, tags: '.anti-elderly'},
		{label: "No", people: +2, affluent: +2, health: +2, press: +2},
	],
}, {
	text: "For provision of social care, options should include wealth taxes, an employer care contribution or a social care levy.",
	choices: [
		{label: "Yes", people: +1, affluent: -1, oligarchs: -1, press: -1, treasury: +1},
		{label: "No", people: -1, affluent: +1, oligarchs: +1, press: +1, treasury: -1},
	],
});
