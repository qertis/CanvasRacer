(function (Crafty) {
	'use strict';

	Crafty.c('Points', {
		_intlNumberFormat: null,
		_score: 0,
		_track : null,

		init: function () {
			this._intlNumberFormat = new Intl.NumberFormat('en', {maximumFractionDigits: 1});

			this
				.requires('Text, BoldFont')
				.attr({
					x: Crafty.viewport.width / 2 - 20,
					y: Crafty.viewport.height - 40,
					w: 100,
					h: 20,
					z: 95
				})
				.textFont({
					size: '26px'
				})
				.bind('EnterFrame', function () {
					this._score = this.getTrack().getDistance();

					this.text(this.getFormat());
				})
			;
		},

		stop: function () {
			this.unbind('EnterFrame')
		},

		getTrack: function() {
			return  this._track || (this._track = Crafty('Track'));
		},

		getPoints: function () {
			return this._score;
		},

		getFormat: function() {
			return this._intlNumberFormat.format(this.getPoints());
		}
	});

}(Crafty));