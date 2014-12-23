(function (Crafty) {
	'use strict';

	Crafty.defineScene("menu", levelInit, levelOut);

	function levelInit() {
		Crafty.background("#000000");

		Crafty.pause(true);

		var locationCallback = function (obj) {
			if (obj.err) {
				throw err;
			} else if (obj.location) {
				Crafty.player.setLocation(obj.location);

				Crafty.pause(false);
			} else if(obj.error) {
				/* Если происходит ошибка - пробуем заново */
				if(obj.error.code == obj.error.PERMISSION_DENIED) {
					console.log(obj.error);

					setTimeout(function() {
						Crafty.player.getMyLocation(locationCallback);
					}, 2000);
				} else if(obj.error.code == obj.error.POSITION_UNAVAILABLE) {
					console.log(obj.error);

					setTimeout(function() {
						Crafty.player.getMyLocation(locationCallback);
					}, 1000);
				}
			}
		};

		Crafty.player.getMyLocation(locationCallback);

		var video = Crafty.e('Video').attr({
				poster: 'content/images/menu.jpg',
				videos: {
					mp4: 'content/video/tunnel_animation.mp4'
				},
				once: false
			}).createVideo()
				.setInnerScreenStyle()
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
						Crafty.enterScene('loading');
						break;
				}
			})
		;

		Crafty.e('Button')
			.attr({
				x: Crafty.viewport.width / 2 - 250 / 2,
				y: Crafty.viewport.height / 2 - 100,
				w: 250,
				h: 100,
				z: 999
			})
			.bind('Click', function () {
				if (Crafty.player.getLocation()) {
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
			.text('author: Denis Baskovsky')
		;
	}

	function levelOut() {
		Crafty('Video').each(function () {
			this.destroyVideo();
		});
		Crafty('Gamepad').each(function () {
			this.destroy();
		})
	}

}(Crafty));