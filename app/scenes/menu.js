(function (Crafty) {
	'use strict';

	Crafty.defineScene("menu", levelInit, levelOut);

	function levelInit() {
		Crafty.background("#000000");

		Crafty.pause(true);
		Crafty.player.getMyLocation(function (obj) {
			if (obj.err) {
				throw err;
			} else if (obj.location) {
				Crafty.player.setLocation(obj.location);

				Crafty.pause(false);
			} else {
				throw 'Unknows myLocation error';
			}
		});

		var video = Crafty.e('Video').attr({
			poster: 'content/images/menu.jpg',
			videos: {
				mp4: 'content/video/tunnel_animation.mp4'
			},
			once: false
		}).createVideo()
			.setInnerScreenStyle();
		;

		//HACK чтобы видео отображалось на заднем экране
		setTimeout(function () {
			Crafty.stage.inner.style.zIndex = 0;
		}, 50);

		Crafty.e('FullScreen');

		Crafty.e('Gamepad')
			.gamepad(0)
			.bind('GamepadKeyOnceChange', function (e) {

				switch (e && e.button) {
					case 9:
						Crafty.enterScene('loading')

						break;
				}
			});

		Crafty.e('Button')
			.attr({
				x: Crafty.viewport.width / 2 - 250 / 2,
				y: Crafty.viewport.height / 2 - 100,
				w: 250,
				h: 100,
				z: 999
			})
			.bind('Click', function () {
				if(Crafty.player.getLocation()) {
					Crafty.enterScene('level')
				}
			})
			.setText('Start')
			.setSize()
		;

		Crafty.e("2D, Canvas, SpriteAnimation, logo, Tween")
			.reel('LogoRunning', 14000, [
				[0, 0], [1, 0], [2, 0], [3, 0], [4, 0], [5, 0],
				[0, 1], [1, 1], [2, 1], [3, 1], [4, 1]
			])
			.animate('LogoRunning', -1) // start loop animation
			.bind('TweenEnd', function () {
				this.tweenTime = this.tweenTime || Math.floor(this.getReel().duration / this.getReel().frames.length);

				this.x = Crafty.viewport.width;
				this.tween({
					x: -this.w
				}, this.tweenTime);
			})
			.attr({
				y: Crafty.viewport.height - 212 * 1.5,
				w: 208 * 1.5,
				h: 212 * 1.5
			})
			.trigger('TweenEnd')//начинаем запускать твины'
		;


		Crafty
			.e('ItalicFont')
			.attr({
				x: Crafty.viewport.width - 150,
				y: Crafty.viewport.height - 28
			})
			.textColor('#FFFFFF')
			.textFont({
				size: '14px'
			})
			.text('author: Denis Bakovsky')
		;
		//Crafty.configData.version
	}

	function levelOut() {
		Crafty('Video').each(function () {
			this.destroyVideo();
		});
		Crafty('Gamepad').each(function () {
			this.destroy();
		})
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

		setSize: function (width, height) {
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