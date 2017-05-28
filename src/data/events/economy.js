var	Events = require('../../classes/Events');

Events.add('economy', {
	text: "We should establish a National Investment Bank to ensure all regions have access to funds for investment.",
	choices: [
		{label: "Yes", people: +1, oligarchs: -1, press: -1, treasury: +1},
		{label: "No", people: -1, oligarchs: +1, press: +1, treasury: -1},
	],
}, {
	text: "We need to balance the books. Shall we raise VAT, and extend VAT to more items?",
	requires: { treasury: '< 5' },
	choices: [
		{label: "Yes", people: -2, affluent: -1, oligarchs: -1, press: -2, treasury: +1},
		{label: "No", people: +2, affluent: +1, oligarchs: +1, press: +2, treasury: -1},
	],
}, {
	text: "We should ask people earning more than £80,000 a year to pay a little more tax.",
	choices: [
		{label: "Yes", people: +2, affluent: -3, oligarchs: -3, health: +2, education: +2, press: -3, treasury: +2},
		{label: "No", people: -2, affluent: +3, oligarchs: +3, health: -2, education: -2, press: +3, treasury: -2},
	],
}, {
	text: "We should raise Corporation Tax to provide for more public investment.",
	choices: [
		{label: "Yes", people: +1, oligarchs: -2, health: +1, education: +1, press: -3, treasury: +2},
		{label: "No", people: -1, oligarchs: +2, health: -1, education: -1, press: +3, treasury: -2},
	],
}, {
	text: "We should introduce a ring-fence between investment and retail banking.",
	choices: [
		{label: "Yes", people: +1, oligarchs: -3, press: -1, treasury: +1},
		{label: "No", people: -1, oligarchs: +3, press: +1, treasury: -1},
	],
}, {
	text: "We need to introduce equal rights for all workers from day one in a new job.",
	choices: [
		{label: "Yes", people: +1, oligarchs: -2, press: -2},
		{label: "No", people: -1, oligarchs: +2, press: +2},
	],
}, {
	text: "Let's ban zero hour contracts, as they make life too precarious for those on lower incomes.",
	choices: [
		{label: "Yes", people: +3, oligarchs: -2, health: +1, education: +1, press: -2, treasury: +1},
		{label: "No", people: -3, oligarchs: +2, health: -1, education: -1, press: +2, treasury: -1},
	],
}, {
	text: "We need to introduce sectoral collective bargaining, to help ensure trades unions have a stronger role.",
	choices: [
		{label: "Yes", people: +1, oligarchs: -3, health: +1, education: +1, press: -3},
		{label: "No", people: -1, oligarchs: +3, health: -1, education: -1, press: +3},
	],
}, {
	text: "The public sector pay cap should be removed.",
	choices: [
		{label: "Yes", people: +2, oligarchs: -2, health: +2, education: +2, press: -1, treasury: -1},
		{label: "No", people: -2, oligarchs: +2, health: -2, education: -2, press: +1, treasury: +1},
	],
}, {
	text: "There is too much inequality. We need a maximum pay ratio of 20:1 for the public sector and companies bidding for public sector work.",
	choices: [
		{label: "Yes", people: +2, affluent: -1, oligarchs: -2, health: +2, education: +2, press: -3, treasury: +2},
		{label: "No", people: -2, affluent: +1, oligarchs: +2, health: -2, education: -2, press: +3, treasury: -2},
	],
}, {
	text: "Employees shouldn't be paying or borrowing for their own Employee Tribunal costs. We should remove the fees on these Tribunals.",
	choices: [
		{label: "Yes", people: +2, oligarchs: -1, press: -1},
		{label: "No", people: -2, oligarchs: +1, press: +1},
	],
}, {
	text: "Raise the minumum wage to £10 an hour for all workers over 18 years old.",
	choices: [
		{label: "Yes", people: +2, oligarchs: -1, press: -1, treasury: +1},
		{label: "No", people: -2, oligarchs: +1, press: +1, treasury: -1},
	],
}, {
	text: "The pensions triple lock should be maintained for the whole of the next Parliament.",
	choices: [
		{label: "Yes", people: +2, affluent: +1, press: +1, treasury: -1},
		{label: "No", people: -2, affluent: -1, press: -1, treasury: +1, tags: '.anti_elderly'},
	],
}, {
	text: "We should scrap the Work Capability Assessments and Personal Independence Payment assessments. They're unfair.",
	choices: [
		{label: "Yes", people: +2, affluent: -1, oligarchs: -2, health: +2, press: -2},
		{label: "No", people: -2, affluent: +1, oligarchs: +2, health: -2, press: +2},
	],
}, {
	text: "We need to reduce Corporation Tax to 17 percent - to help the strivers!",
	choices: [
		{label: "Yes", affluent: +1, oligarchs: +3, press: +2, treasury: -2},
		{label: "No", affluent: -1, oligarchs: -3, press: -2, treasury: +2},
	],
}, {
	text: "We need to save money - let's reduce tax credits to working families and only support the first two children in any family.",
	choices: [
		{label: "Yes", people: -2, affluent: +1, oligarchs: +2, health: -2, education: -1, press: +2, treasury: +1},
		{label: "No", people: +2, affluent: -1, oligarchs: -2, health: +2, education: +1, press: -2, treasury: -1},
	],
}, {
	text: "We should set up a Ministry of Labour to ensure the enforcement of rights for workers.",
	choices: [
		{label: "Yes", people: +1, oligarchs: -2, health: +1, press: -2},
		{label: "No", people: -1, oligarchs: +2, health: -1, press: +2},
	],
}, {
	text: "Restrict winter fuel allowance to only the poorest pensioners.",
	choices: [
		{label: "Yes", people: -2, affluent: -1, oligarchs: +1, health: -2, press: +2, treasury: +1},
		{label: "No", people: +2, affluent: +1, oligarchs: -1, health: +2, press: -2, treasury: -1},
	],
}, {
	text: "Economic growth is slowing down and people are paying less taxes. We need to increase inheritance taxes.",
	requires: { treasury: '<5' },
	choices: [
		{label: "Yes", people: +1, affluent: -2, oligarchs: -3, press: -3, treasury: +1, tags: '.anti_elderly'},
		{label: "No", people: -1, affluent: +2, oligarchs: +3, press: +3, treasury: -1},
	],
}, {
	text: "Economic growth is slowing down and people are paying less taxes. We need to reduce disability benefits.",
	choices: [
		{label: "Yes", people: -1, oligarchs: +1, health: -1, press: +2, treasury: +1},
		{label: "No", people: +1, oligarchs: -1, health: +1, press: -2, treasury: -1},
	],
}, {
	text: "Public finances are terrible. We need to cut pensions immediately.",
	requires: { treasury: '< 3' },
	choices: [
		{label: "Yes", people: -3, health: -2, press: -2, treasury: +2, tags: '.anti_elderly'},
		{label: "No", people: +3, health: +2, press: +2, treasury: -2},
	],
}, {
	text: "Public finances are terrible. We need to introduce controls on speculation.",
	requires: { treasury: '< 3' },
	choices: [
		{label: "Yes", affluent: -1, oligarchs: -3, press: -3, treasury: +1},
		{label: "No", affluent: +1, oligarchs: +3, press: +3, treasury: -1},
	],
}, {
	text: "We need to ensure that banks maintain a high street presence. Force them to do so!",
	choices: [
		{label: "Yes", people: +1, oligarchs: -1},
		{label: "No", people: -1, oligarchs: +1},
	],
}, {
	text: "We should introduce a Land Value Tax to enable local government autonomy.",
	choices: [
		{label: "Yes", people: +1, affluent: -1, oligarchs: -2, treasury: +2},
		{label: "No", people: -1, affluent: +1, oligarchs: +2, treasury: -2},
	],
}, {
	text: "All firms supplying national or local government have to be good employers.",
	choices: [
		{label: "Yes", people: +2, oligarchs: -1, health: +1, education: +1, press: -2, treasury: +1},
		{label: "No", people: -2, oligarchs: +1, health: -1, education: -1, press: +2, treasury: -1},
	],
}, {
	text: "We should implement a 'Robin Hood Tax', extending existing Stamp Duty Reserve Tax to cover a wider range of financial transactions.",
	choices: [
		{label: "Yes", people: +1, affluent: -1, oligarchs: -2, treasury: +2},
		{label: "No", people: -1, affluent: +1, oligarchs: +2, treasury: -2},
	],
});
