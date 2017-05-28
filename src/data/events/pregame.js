var	Events = require('../../classes/Events');

Events.add('preGame', {
	text: '',
	requires: ['.splash', '!.no-splash'],
	priority: 9999999,
	classes: 'splash',
	choices: 'none',
}, {
	text: "You are Prime Minister of the UK!</p><p>Over the next five years you must make decisions ensuring world-leading <span class='health'>health</span> and <span class='education'>education</span> services, without emptying your <span class='treasury'>treasury</span> or lowering <span class='security'>security</span>.</p><p>Not all decisions will be popular with <span class='people'>the people</span>, the <span class='affluent'>well off</span> or the ultra-wealthy <span class='oligarchs'>oligarchs</span> or <span class='press'>the Daily Smear</span>.</p><p>Good luck!</p>",
	requires: ['.preGame'],
	priority: 9999998,
	classes: 'preGame',
});
