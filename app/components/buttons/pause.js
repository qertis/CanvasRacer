(function (Crafty) {
	'use strict';

	Crafty.c('Pause', {
		_isPaused: false,

		init: function () {
			var self = this;

			this.requires('2D, Canvas, pause, Mouse')
				.attr({
					z: 999
				})
				.bind('Click', function (MouseEvent) {
					this.togglePause();
				})
			;
		},

		togglePause: function () {
			this.toggleComponent('pause', 'play');

			this._isPaused = !this._isPaused;

			Crafty.audio.togglePause('music');
			this.toggleFrame();
		},

		getIsPaused: function () {
			return this._isPaused;
		},

		toggleFrame: function () {
			Crafty.pause(this._isPaused);
			Crafty.timer.simulateFrames(0, 30);
		}

	});

}(Crafty));