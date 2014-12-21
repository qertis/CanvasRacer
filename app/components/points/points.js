(function (Crafty) {

	Crafty.c('Points', {
		_intlNumberFormat: null,
		_score: 0,

		stop: function () {
			this.unbind('EnterFrame')
		},
		getPoints: function () {
			return this._score;
		},
		getFormat: function() {
			return this._intlNumberFormat.format(this.getPoints());
		},
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
					//family: 'Lobster'
				})
				.bind('EnterFrame', function () {
					this._score = Crafty('Track').GetDistance();

					this.text(this.getFormat());
				})
			;
		}
	});

}(Crafty));