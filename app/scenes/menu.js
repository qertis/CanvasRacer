(function (Crafty) {
	'use strict';

	Crafty.defineScene("menu", levelInit, levelOut);

	function levelInit() {
		Crafty.background("#000");

		Crafty.e('Video').attr({
			poster: 'content/images/menu.jpg',
			videos: {
				mp4: 'content/video/tunnel_animation.mp4'
			},
			once: false
		}).createVideo()
			.setInnerScreenStyle();

		Crafty.e('Button')
			.attr({
				x: Crafty.viewport.width / 2 - 250 /2,
				y: Crafty.viewport.height / 2 - 100,
				w: 250,
				h: 100
			})
			.bind('Click', function () {
				Crafty.enterScene('loading')
			})
			.setText('Start')
			.setSize()
		;
	}

	function levelOut() {
		Crafty('Video').each(function () {
			this.destroyVideo();
		});
	}

	// Components ----------------------------------------------------------------
	Crafty.c('Button', {
		_button: null,

		init: function () {
			this.requires('HTML, Mouse');
			var button = document.createElement('button');

			button.style.color = '#333';
			button.style.backgroundColor = 'ghostwhite';
			button.style.padding = '4px 12px';
			button.style.border = 'none';

			this._button = button;
		},

		setSize: function(width, height) {
			this._button.style.width = width || this.w + 'px';
			this._button.style.height = height || this.h + 'px';

			//явно вызываем для отрисовки CSS
			this.replace(this._button.outerHTML);

			return this;
		},

		setText: function (text) {
			this._button.textContent = text;
			this.replace(this._button.outerHTML);

			return this;
		}
	});

}(Crafty));