var	Events = require('../../classes/Events');

Events.add('conclusions', {
	text: "<img src='assets/labour-rose.png' classes='pic' height='100' /><br /><h3>Well Done!</h3><p>Your health and education services are the envy of the world, and didn't break the bank or risk security!</p><p>Did you know, your choices are remarkably similar to the <a href='http://labour.org.uk/manifesto2017' target='_blank'>Labour Party's Manifesto</a>?</p>",
	priority: 99,
	requires: ['.end', {health: '>=25', education: '>=25', security: '>=10', treasury: '>=5'}],
	classes: 'labour',
	tags: '.done',

	choices: [{label: "Show me more!", url: 'http://labour.org.uk/manifesto2017'}],
}, {
	text: "<img src='assets/labour-rose.png' classes='pic' height='100' /><br /><h3>Well done!</h3><p>Despite difficulties in other areas, your health and education services are the envy of the world!</p><p>Did you know, your choices on health are remarkably similar to those in the <a href='http://labour.org.uk/manifesto2017' target='_blank'>Labour Party's Manifesto</a>?</p>",
	requires: ['.end', {health: '>=25', education: '>=25'}, '!.done'],
	classes: 'labour',
	priority: 60,
	choices: [{label: "Show me more!", url: 'http://labour.org.uk/manifesto2017'}],
	tags: '.vote-labour',
}, {
	text: "<img src='assets/labour-rose.png' classes='pic' height='100' /><br /><h3>Well done!</h3><p>Despite difficulties in other areas, your health service is the envy of the world!</p><p>Did you know, your choices on health and education are remarkably similar to those in the <a href='http://labour.org.uk/manifesto2017' target='_blank'>Labour Party's Manifesto</a>?</p>",
	requires: ['.end', {health: '>=25', education: '<25'}, '!.done'],
	classes: 'labour',
	priority: 60,
	choices: [{label: "Show me more!", url: 'http://labour.org.uk/manifesto2017'}],
	tags: '.vote-labour',
}, {
	text: "Although your health service isn't the worst, its lack of resources has led to rising waiting times and increased patient disattisfaction. Perhaps you should have invested more?",
	requires: ['.end', {health: '<25'}, {health: '>10'}],
	classes: 'health',
}, {
	text: "Your health service is struggling, with long waiting times and patients frequently left lying on trolleys in corridors. Perhaps you should have invested more?",
	requires: ['.end', {health: '<10'}, {health: '>=5'}],
	classes: 'health',
}, {
	text: "The Red Cross has declared a humanitarian crisis as your health service sits on the brink of collapse. You have failed utterly, unless of course your goal was to privatise it all along.",
	requires: ['.end', {health: '<5'}],
	classes: 'health',
}, {
	text: "<img src='assets/labour-rose.png' classes='pic' height='100' /><br /><h3>Well done!</h3><p>Your citizens are among the best educated in the world!</p><p>Did you know, your choices on education are remarkably similar to those in <a href='http://labour.org.uk/manifesto2017' target='_blank'>Labour Party's Manifesto</a>?</p>",
	requires: ['.end', {education: '>=25', health: '<25'}, '!.done'],
	priority: 60,
	classes: 'labour',
	choices: [{label: "Show me more!", url: 'http://labour.org.uk/manifesto2017'}],
	tags: '.vote-labour',
}, {
	text: "Although your education service isn't the worst, its lack of resources has led to rising class sizes and fewer university graduates. Perhaps you should have invested more?",
	requires: ['.end', {education: '<25'}, {education: '>10'}],
	classes: 'education',
}, {
	text: "Your education service is struggling, with huge class sizes and declining standards across the country. Perhaps you should have invested more?",
	requires: ['.end', {education: '<10'}, {education: '>=5'}],
	classes: 'education',
}, {
	text: "Your education service is so bad, the UN has officially declared that the UK is the leastest literate country in the world!",
	requires: ['.end', {education: '<5'}],
	classes: 'education',
}, {
	text: "Your country may be a total mess, but at least your treasury is in surplus!",
	priority: 40,
	requires: ['.end', {treasury: '>=7', health: '<10', education: '<10'}, '!.done'],
	classes: 'treasury',
	tags: '.treasury_done',
}, {
	text: "Although you could do better in other areas, your treasury is running a healthy surplus.",
	requires: ['.end', {treasury: '>=7'}, '!.done', '!.treasury_done'],
	classes: 'treasury',
}, {
	text: "Your treasury is reasonably strong, but a lack of investment has led to declining standards across the UK.",
	requires: ['.end', {treasury: '<7'}, {treasury: '>=4'}, '!.done'],
	classes: 'treasury',
}, {
	text: "Your generous spending shall be remembered well… for wrecking the economy for the next hundred years!",
	requires: ['.end', {treasury: '<4'}, '!.done', '!.vote-labour'],
	classes: 'treasury',
},  {
	text: "You were over-generous with the spending, perhaps more investment was called for?",
	requires: ['.end', {treasury: '<4'}, '!.done', '.vote-labour'],
	classes: 'treasury',
}, {
	text: "Although you have done an excellent job protecting your citizens from external threats, it turns out the biggest threat to their daily lives in other areas was you.",
	priority: 50,
	requires: ['.end', {security: '>=10', health: '<10', education: '<10'}, '!.done'],
	classes: 'security',
	tags: '.security_done',
}, {
	text: "While you could have done better in other areas, your people are amongst the safest in the world!",
	requires: ['.end', {security: '>=10'}, '!.done', '!.security_done'],
	classes: 'security',
}, {
	text: "Although your security forces are struggling to keep crime-rates down, your people will no doubt take comfort in the fact that things could be a lot worse! Perhaps you should have invested more?",
	requires: ['.end', {security: '<10'}, {security: '>=5'}, '!.done'],
	classes: 'security',
}, {
	text: "It would be unfair to blame you entirely for the poor security of the UK, given that it is now mostly run by criminal gangs fighting over territory.",
	requires: ['.end', {security: '<5'}, '!.done', '!.vote-labour'],
	classes: 'security',
}, {
	text: "While you've done well in some areas, your security forces have been neglected. Perhaps you should have invested more?",
	requires: ['.end', {security: '<5'}, '!.done', '.vote-labour'],
	classes: 'security',
});
