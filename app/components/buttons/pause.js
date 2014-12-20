(function (Crafty) {

	Crafty.c('Pause', {
		_isPaused: false,
		togglePause: function () {
			this._isPaused = !this._isPaused;
		},
		getIsPaused: function () {
			return this._isPaused;
		},
		init: function () {
			this.requires('2D, Canvas, pause, Mouse')
				.attr({
					z: 999
				})
				.bind('Click', function (MouseEvent) {
					//alert('clicked', MouseEvent);


					if (this.getIsPaused()) {
						Crafty.timer.init();

						console.log('is paused')
					} else {
						Crafty.timer.stop();

						console.log('not paused')
					}

					this.togglePause();


				})
		}
	});
}(Crafty));
