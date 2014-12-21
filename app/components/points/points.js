(function (Crafty) {

	Crafty.c('Points', {
		_score: 0,

		stop: function () {
			this.unbind('EnterFrame')
		},
		getPoints: function () {
			return this._score;
		},
		init: function () {
			this
				.requires('BoldFont')
				.attr({
					x: Crafty.viewport.width / 2 - 10,
					y: Crafty.viewport.height - 40,
					w: 100,
					h: 20,
					z: 999
				})
				.bind('EnterFrame', function () {
					this._score = Crafty('Track').GetDistance();

					this.text('' + this.getPoints());
				})
			;
		}
	});

}(Crafty));