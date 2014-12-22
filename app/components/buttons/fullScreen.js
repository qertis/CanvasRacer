(function (Crafty) {
	'use strict';

	Crafty.c('FullScreen', {
		_isFullScreen: false,

		init: function () {
			this.requires('2D, Canvas, fullscreen, Mouse')
				.attr({
					x: 0,
					y: 0,
					w: 48,
					h: 48
				})
				.bind('Click', function () {
					this.fullScreenToggle();
				})
			;
		},

		fullScreenToggle: function () {
			this._isFullScreen = !this._isFullScreen;

			if (this.getIsFullScreen()) {
				this.fullScreenOn();
			} else {
				this.fullScreenOff();
			}
		},

		getIsFullScreen: function () {
			return this._isFullScreen;
		},

		fullScreenOn: function () {
			if (!document.fullscreenElement && !document.mozFullScreenElement && !document.webkitFullscreenElement) {
				if (document.documentElement.requestFullscreen) {
					document.documentElement.requestFullscreen();
				} else if (document.documentElement.mozRequestFullScreen) {
					document.documentElement.mozRequestFullScreen();
				} else if (document.documentElement.webkitRequestFullscreen) {
					document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
				}
			}
		},

		fullScreenOff: function () {
			if (document.exitFullscreen) {
				document.exitFullscreen();
			} else if (document.mozCancelFullScreen) {
				document.mozCancelFullScreen();
			} else if (document.webkitExitFullscreen) {
				document.webkitExitFullscreen();
			}
		}

	});

}(Crafty));