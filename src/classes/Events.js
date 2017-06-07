var	kind = require('enyo/kind'),
	Component = require('enyo/Component'),
	Scores = require('./Scores');

var asign = Object.assign || function() {
	var target = arguments[0] || {};
	for (var i = 1; i < arguments.length; i += 1) {
		var eachSource = arguments[i];
		for (eachKey in eachSource) {
			if (!eachSource.hasOwnProperty(eachKey)) { continue; }
			target[eachKey] = eachSource[eachKey];
		}
	}
	return target;
};

var isObjectEqual = function(a, b) {
	if (typeof a !== typeof b) { return false; }

	switch (typeof a) {
		case 'object':
			if (Array.isArray(a)) {
				if (!Array.isArray(b)) { return false; }

				if (a.length !== b.length) { return false; }
				for (var i = 0; i < a.length; i += 1) {
					if (!isObjectEqual(a[i], b[i])) { return false; }
				}
			} else {
				var aProps = Object.getOwnPropertyNames(a);
				if (aProps.length !== Object.getOwnPropertyNames(b).length) { return false; }

				for (var i = 0; i < aProps.length; i += 1) {
					var eachKey = aProps[i];
					if (!isObjectEqual(a[eachKey], b[eachKey])) { return false; }
				}
			}
			return true;
		break;
		case 'function':
			if (a === b) { return true; }
			return '' + a === '' + b;
		default:
			return a === b;
	}
}

module.exports = kind.singleton({
	name: 'Events',
	kind: Component,

	_queue: [],
	_queuePosition: 0,
	_registry: [],
	_tags: {},

	_cache: null,
	_cacheParams: {},

	/** Turns an event's requirements into a function that can be optimised and called repeatedly. */
	_getRequiresFunc: function(theEvent) {
		if ('function' !== typeof theEvent.requiresFunc) {
			var requiresFunc = '';
			switch (typeof theEvent.requires) {
				case 'undefined': break;
				case 'string':
					theEvent.requires = [theEvent.requires];
				// Fallthrough
				case 'object':
					if (!Array.isArray(theEvent.requires)) {
						theEvent.requires = [theEvent.requires];
					}
					for (var j = 0; j < theEvent.requires.length; j += 1) {
						var theRequirement = theEvent.requires[j];
						switch (typeof theRequirement) {
							case 'string':
								// Is the tag inverted?
								var negate = '';
								if (theRequirement.charAt(0) === '!') {
									negate = '!';
									theRequirement = theRequirement.slice(1);
								}

								// Prepend the event's category
								if (theRequirement.charAt(0) !== '.') {
									theRequirement = theEvent.category + '.' + theRequirement;
								}

								if (requiresFunc) { requiresFunc += ' && '; }
								requiresFunc += negate + 'Events.hasTag("' + theRequirement + '")';
							break;
							case 'object':
								for (eachKey in theRequirement) {
									if (!theRequirement.hasOwnProperty(eachKey)) { continue; }

									if (Scores.hasKey(eachKey)) {
										if (requiresFunc) { requiresFunc += ' && '; }
										requiresFunc += '(Scores.getValue("' + eachKey + '") ' + theRequirement[eachKey] + ')';
// TODO: Automatically add equality operator as default operand?
									}
								}
							break;
							default:
								this.error('Invalid event requirement:', theRequirement);
								requiresFunc = ''; break;
						}
					}
				break;
				default:
					this.error('Invalid event requirements:', theEvent.requires);
				break;
			}

			// Compile the function and store it
			if (requiresFunc) {
				theEvent.requiresFunc = new Function('Events', 'Scores', 'return ' + requiresFunc);
			} else {
				theEvent.requiresFunc = function() { return true; };
			}
		}
		return theEvent.requiresFunc;
	},

	_queueAdd: function() {
		for (var i = 0; i < arguments.length; i += 1) {
			var eachEvent = arguments[i];
			eachEvent.delay += this._queuePosition;
			this._queue.push(eachEvent);
		}

		// Sort into descending order (next to dequeue at tail for popping)
		this._queue.sort(function(a, b) { return b.delay - a.delay; });
	},

	_addToRegistry: function(toAdd) {
		for (var i = 0; i < toAdd.length; i += 1) { this._registry.push(toAdd[i]); }
		this._isSorted = false;
	},

	_isAlert: function(theEvent) {
		if ((theEvent.isAlert === true) || (theEvent.isAlert === false)) { return theEvent.isAlert; }

		var isAlert = false;
		switch (typeof theEvent.choices) {
			case 'object':
				// An event can have one choice and still qualify as an alert
				if (Array.isArray(theEvent.choices)) { isAlert = theEvent.choices.length <= 1; }
				else { isAlert = true; }
			break;
			case 'string':
				// The special string 'none' indicates an event that should not display any buttons at all
				if (theEvent.choices === 'none') { isAlert = true; break; }
			// Fallthrough
			default:
				isAlert = true;

				// All falsey values are fine, but anything truthy is invalid
				if (theEvent.choices) {
					this.log('Invalid event choices:', theEvent.choices);
					delete theEvent.choices;
				}
			break;
		}
		theEvent.isAlert = isAlert;
		return isAlert;
	},

	_isSorted: false,
	_sort: function() {
		var self = this;
		this._registry.sort(function(a, b) {
			// Order by priority first
			var aPriority = a.priority || 0, bPriority = b.priority || 0;
			if (aPriority !== bPriority) { return bPriority - aPriority; }

			// Otherwise put alerts first
			var aIsAlert = self._isAlert(a), bIsAlert = self._isAlert(b);
			if (aIsAlert === bIsAlert) { return 0; }
			if (aIsAlert) { return -1; }
			return 1;
		});
		this._cache = null;
		this._isSorted = true;
	},

	add: function(theCategory) {
		if (('string' !== typeof theCategory) || !theCategory || (arguments.length < 2)) {
			throw new Error('Usage: this.add("category", event1, event2… eventN)');
		}

		var toAdd = [];
		for (var i = 1; i < arguments.length; i += 1) {
			var theEvent = arguments[i];
			if (!(theEvent instanceof Object) && Array.isArray(theEvent)) {
				console.error('Unexpected event type: ' + theEvent);
			} else {
				theEvent.category = theCategory;
				toAdd.push(theEvent);
			}
		}
		if (toAdd.length > 0) { this._addToRegistry(toAdd); }
	},

	applyChoice: function(theEvent, theChoice) {
		// Apply any tags
		this.applyEffects(theEvent, theChoice);

		// Process any events
		var toAdd = [];
		switch(typeof theChoice.events) {
			case 'undefined': break;
			case 'object':
				if (!Array.isArray(theChoice.events)) { theChoice.events = [theChoice.events]; }

				var addToQueue = [];
				theChoice.events.forEach(function(eachEvent) {
					eachEvent.category = theEvent.category;

					// Delayed events are added to the queue, otherwise immediately registered
					if ((eachEvent.delay || 0) > 0) { addToQueue.push(eachEvent); }
					else { toAdd.push(eachEvent); }
				});
				if (addToQueue.length) { this._queueAdd.apply(this, addToQueue); }
			break;
			default:
				this.error('Invalid events:', theChoice.events);
			break;
		}
		if (toAdd.length > 0) { this._addToRegistry(toAdd); }
		delete theChoice.events;
	},

	applyEffects: function(theEvent, theChoice) {
		if (!theChoice) { theChoice = theEvent; }
		switch (typeof theChoice.tags) {
			case 'undefined': break;
			case 'string': // Single tag
				theChoice.tags = [theChoice.tags];
			// Fallthrough
			case 'object':
				if (Array.isArray(theChoice.tags)) {
					for (var i = 0; i < theChoice.tags.length; i += 1) {
						var eachTag = theChoice.tags[i], remove = false;

						if (eachTag.charAt(0) === '!') {
							remove = true;
							eachTag = eachTag.slice(1);
						}

						if (eachTag.charAt(0) !== '.') {
							eachTag = theEvent.category + '.' + eachTag;
						}

						if (remove) { delete this._tags[eachTag]; }
						else { this._tags[eachTag] = true; }
					}
					delete theChoice.tags;
					break;
				}
			// Fallthrough
			default:
				this.error('Invalid tags:', theChoice.tags);
				delete theChoice.tags;
			break;
		}
		Scores.update(theChoice);
	},

	hasTag: function(theTag) { return !!this._tags[theTag]; },

	removeTag: function(theTag) { delete this._tags[theTag]; this._cache = null; },
	setTag: function(theTag) { this._tags[theTag] = true; this._cache = null; },

	next: function(theOptions) {
		theOptions = theOptions || {};
		var extraTags = theOptions.tags || [];
		theOptions.alertsOnly = !!theOptions.alertsOnly;

		var theMatchingIndices = [];
		if (this._cache && isObjectEqual(this._cacheParams, theOptions)) {
			theMatchingIndices = this._cache;
		} else {
			// We defer sorting until the last moment
			if (!this._isSorted) { this._sort(); }

			// First, temporarily add any extra tags (e.g- "budget")
			var add = [], remove = [], merge = {};
			extraTags.forEach(function(eachTag) {
				if (eachTag.charAt(0) === '!') {
					eachTag = theTag.slice(1);
					if ('undefined' !== typeof this._tags[eachTag]) {
						merge[eachTag] = false;
						add.push(eachTag);
					}
				} else {
					if ('undefined' === typeof this._tags[eachTag]) {
						merge[eachTag] = true;
						remove.push(eachTag);
					}
				}
			}, this);
			if (add.length || remove.length) { asign(this._tags, merge); }

			// Find the indices for all matching events
			var theHighestPriority = 0;
			for (var i = 0; i < this._registry.length; i += 1) {
				var eachEvent = this._registry[i];

				// First, test the event's priority, if it's too low it can't be matched
				var thePriority = eachEvent.priority || 0;
				if (thePriority < theHighestPriority) { break; }

				// Execute the requirements function
				var requiresFunc = this._getRequiresFunc(eachEvent);
				try {
					if (requiresFunc(this, Scores)) {
						// If we encounter a choice then we may be able to exit early
						if (!this._isAlert(eachEvent)) {
							// Exit early if there are already alerts in the matches (no need to look further)
							if ((theMatchingIndices.length > 0) && theMatchingIndices[0].isAlert) { break; }
							// Otherwise, if only alerts are permitted, skip this event and keep looking
							else if (theOptions.alertsOnly) { continue; }
						}

						// Update the priority
						if (thePriority > theHighestPriority) { theHighestPriority = thePriority; }

						// If we get here, we can add the event
						theMatchingIndices.push(i);
					}
				} catch (e) {
					this.error('Malformed event requirements:', e, eachEvent);
					this._registry.splice(i, 1);
					i -= 1;
				}
			}

			// Add/remove any temporary tags
			add.forEach(function(eachTag) { this._tags[eachTag] = true; }, this);
			remove.forEach(function(eachTag) { delete this._tags[eachTag]; }, this);
		}

		// In counting mode, return the count only, no event
		if (theOptions.count) { return theMatchingIndices.length; }

		// Otherwise select an event, remove it and return it
		if (theMatchingIndices.length) {
			var	theMatch = (theOptions.random) ? Math.floor(Math.random() * theMatchingIndices.length) : 0,
				theIndex = theMatchingIndices.splice(theMatch, 1)[0],
				theEvent = this._registry.splice(theIndex, 1)[0];

			if (theMatchingIndices.length > 0) {
				// Adjust indices of later matches
				for (var i = theMatch; i < theMatchingIndices.length; i += 1) { theMatchingIndices[i] -= 1; }

				// Now cache them for re-use
				this._cache = theMatchingIndices;
				this._cacheParams = theOptions;
			} else { this._cache = null; }

			this.applyEffects(theEvent);
			return theEvent;
		}
		this._cache = null;
		return null;
	},

	count: function(theOptions) { theOptions.count = true; return this.next(theOptions); },

	queueAdvance: function() {
		this._queuePosition += 1;

		var toAdd = [];
		while (this._queue.length) {
			var eachEvent = this._queue.pop();
			if (eachEvent.delay > this._queuePosition) { this._queue.push(eachEvent); break; }

			delete eachEvent.delay;
			toAdd.push(eachEvent);
		}
		if (toAdd.length > 0) { this._addToRegistry(toAdd); }
	},

	isQueueEmpty: function() { return this._queue.length <= 0; },
});
