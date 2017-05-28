var kind = require('enyo/kind'),
	Collection = require('enyo/Collection'),
	Component = require('enyo/Component'),
	Model = require('enyo/Model');

var Score = kind({
	name: 'Score',
	kind: Model,

	attributes: {
		colour: null,
		icon: 'assets/blank.gif',
		id: '',
		label: '',
		minValue: null,
		maxValue: null,
		selected: false,
		scale: 1,
		text: null,
		value: 0,
	},

	computed: {
		decorator: ["id", "colour"],
		percent: ["maxValue", "scale", "value"],
	},

	_clampValue: function(theValue) {
		var theMaxValue = this.get('maxValue');
		if ((null !== theMaxValue) && (theValue > theMaxValue)) { return theMaxValue; }

		var theMinValue = this.get('minValue');
		if ((null !== theMinValue) && (theValue < theMinValue)) { return theMinValue; }

		return theValue;
	},

	decorator: function() { return this.get('colour') || this.get('id') || ''; },
	percent: function() { return this.get('value') / (this.get('maxValue') || this.get('scale')); },

	maxValueChanged: function() { this.valueChanged(); },
	minValueChanged: function() { this.valueChanged(); },
	valueChanged: function() {
		var theValue = this.get('value');
		var theClampedValue = this._clampValue(theValue);
		if (theClampedValue != theValue) { this.set('value', theClampedValue); }
	},

	add: function(theValue) {
		this.set('value', this._clampValue(this.get('value') + theValue));
		return this.get('value');
	},
});

module.exports = kind.singleton({
	name: 'Scores',
	kind: Component,

	_collection: new Collection(),
	_index: {},

	_maxValue: null,
	_minValue: null,
	_scale: 1,
	_setScale: function(theValue) {
		if (theValue > this._scale) {
			this._scale = theValue;
			this._collection.forEach(function(eachScore, theIndex, theArray) {
				eachScore.set('scale', this._scale);
			});
		}
	},

	add: function() {
		var theScale = this._scale;
		for (var i = 0; i < arguments.length; i += 1) {
			var theData = arguments[i];

			if (theData.value > theScale) { theScale = theData.value; }
			if (theData.maxValue > theScale) { theScale = theData.maxValue; }
			else if ('undefined' === typeof theData.maxValue) { theData.maxValue = this._maxValue; }
			if ('undefined' === typeof theData.minValue) { theData.minValue = this._minValue; }

			if (!theData.label) { // Defaults object
				if ('undefined' !== typeof theData.maxValue) { this._maxValue = theData.maxValue; }
				if ('undefined' !== typeof theData.minValue) { this._minValue = theData.minValue; }
				continue;
			}

			if (!theData.id) {
				this.error('Invalid score (id/label missing):', theData);
				continue;
			}

			var eachScore = new Score(arguments[i]);
			this._index[theData.id] = eachScore;
			this._collection.add(eachScore);
		}
		this._setScale(theScale);
	},

	asCollection: function() { return this._collection; },

	get: function(theKey) { return this._index[theKey]; },
	getValue: function(theKey) {
		var theScore = this.get(theKey);
		if (theScore) { return theScore.get('value'); }
	},
	
	getScale: function() { return this._scale; },

	hasKey: function(theKey) { return this._index.hasOwnProperty(theKey); },

	update: function(theObject) {
		var theScale = this._scale;
		for (eachKey in this._index) {
			if (!this._index.hasOwnProperty(eachKey)) { continue; }
			var eachScore = this._index[eachKey];

			var theValue = theObject[eachKey]
			if ('undefined' !== typeof theValue) {
				theValue = eachScore.add(theValue);
				if (theValue > theScale) { theScale = theValue; }
			}
		}
		this._setScale(theScale);
	},

	fromHex: function(theHexString) {
		if (typeof theHexString !== 'string') {
			this.error('Invalid hex string:', theHexString);
			return;
		}

		this._collection.forEach(function(eachScore) { var theChar;
			switch (theChar = theHexString.charAt(0)) {
				case '': break;
				case ',': theHexString = theHexString.slice(1); break;
				case '0': case '1':
					eachScore.set('value', Boolean(theHexString.charAt(0)));
					theHexString = theHexString.slice(1);
				break;
				case 'N':
					var theHex = /N([0-9a-fA-F]+)/.exec(theHexString)[1];
					eachScore.set('value', parseInt(theHex, 16));
					theHexString = theHexString.slice(theHex.length + 1);
				break;
				case 'S':
					var hyphen = theHexString.indexOf('-');
					if (hyphen <= 1) { this.error('Invalid string entry:', theHexString); break; }

					var theLength = parseInt(theHexString.slice(1, hyphen - 1), 16),
						theValue = theHexString.slice(hyphen + 1, hyphen + theLength);
					eachScore.set('value', theValue);
					theHexString = theHexString.slice(hyphen + theLength);
				break;
				default:
					this.error('Invalid hex string:', theHexString);
				break;
			}
		}, this);
	},

	toHex: function() {
		var theHexString = '';
		this._collection.forEach(function(eachScore) {
			var theValue = eachScore.get('value');
			switch (typeof theValue) {
				case 'undefined': break;
				case 'boolean':
					theHexString += (theValue) ? '1' : '0';
				break;
				case 'number':
					theHexString += 'N' + theValue.toString(16);
				break;
				case 'string':
					theValue = encodeURIComponent(theValue);
					theHexString += 'S' + theValue.length.toString(16) + '-' + theValue;
				break;
				default:
					this.error('Unsupported value for hex conversion:', theValue);
				break;
			}
		}, this);
		return theHexString;
	},
});
