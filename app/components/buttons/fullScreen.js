(function (Crafty) {
	'use strict';

	Crafty.c('FullScreen', {
		_isFullScreen: false,

		init: function () {
			this.requires('Button')
				.attr({
					x: Crafty.viewport.width - 60,
					y: 0,
					w: 60,
					h: 50
				})
				.bind('Click', function () {
					this.fullScreenToggle();
				})
				.setText('Full Screen')
				.setSize();

		},

		fullScreenToggle: function () {
			this._isFullScreen = !this._isFullScreen;

			if (this.getIsFullScreen()) {
				this.fullScreenOn();
				this.setText('Full Screen On')
			} else {
				this.fullScreenOff();
				this.setText('Full Screen Off')
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