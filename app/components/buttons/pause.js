(function (Crafty) {
	'use strict';

	Crafty.c('Pause', {
		_isPaused: false,

		togglePause: function () {
			this.toggleComponent('pause', 'play');

			this._isPaused = !this._isPaused;

			this.toggleFrame();
		},

		getIsPaused: function () {
			return this._isPaused;
		},

		toggleFrame: function () {
			// некрасивое решение (ХАК)
			// если стоит пауза а вам надо поставить другой фрейм -
			// надо запустить таймаут (очень рискованно!) с маленьким временем и затем
			// явно запустить следующий шаг перерисовки сцены
			setTimeout(function () {
				Crafty.pause(this._isPaused);
			}.bind(this), 15);
		},

		init: function () {
			this.requires('2D, Canvas, pause, Mouse')
				.attr({
					z: 999
				})
				.bind('Click', function (MouseEvent) {
					this.togglePause();
				});

			var self = this;
			Crafty.uniqueBind('Pause', function () {
				self._isPaused = true;
			});
			Crafty.uniqueBind('Unpause', function () {
				self._isPaused = false;
			});
		}

	});

}(Crafty));