var	Events = require('../../classes/Events');

Events.add('environment', {
	text: "Scientific reports indicate that fracking is likely to cause environmental damage. We should ban fracking.",
	choices: [
		{label: "Yes", people: +2, affluent: +2, oligarchs: -3, health: +1, press: -2, treasury: -1},
		{label: "No", people: -2, affluent: -2, oligarchs: +3, health: -1, press: +2, treasury: +1},
	],
}, {
	text: "We need a new Clean Air Act to address air pollution.",
	choices: [
		{label: "Yes", people: +1, affluent: +1, oligarchs: -1, health: +1},
		{label: "No", people: -1, affluent: -1, oligarchs: +1, health: -1},
	],
}, {
	text: "We need sound scientific principles in order to support the environment. We need a science innovation fund.",
	choices: [
		{label: "Yes", education: +2, treasury: -1},
		{label: "No", education: -2, education: +1},
	],
}, {
	text: "Major shale planning  decisions should be made the responsibility of the National Planning Regime.",
	choices: [
		{label: "Yes", people: -2, affluent: -2, oligarchs: +3, health: -1, press: +1, treasury: +1},
		{label: "No", people: +2, affluent: +2, oligarchs: -3, health: +1, press: -1, treasury: -1},
	],
}, {
	text: "We need to reintroduce fox hunting. It's a British tradition.",
	choices: [
		{label: "Yes", people: -2, affluent: +1, oligarchs: +2, press: +2, tags: ".fox_hunt"},
		{label: "No", people: +2, affluent: -1, oligarchs: -2, press: -2},
	],
}, {
	text: "Global warming is a dire threat to the world. We should aim for zero carbon emissions from energy generation by 2030.",
	choices: [
		{label: "Yes", people: +1, affluent: +1, oligarchs: -2, health: +1, press: +2, security: +2},
		{label: "No", people: -1, affluent: -1, oligarchs: +2, health: -1, press: -2, security: -1},
	],
});
