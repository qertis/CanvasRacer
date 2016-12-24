(function (Crafty) {
	'use strict';

	Crafty.defineScene("menu", levelInit, levelOut);

	function levelInit() {
		Crafty.background("#000000");

		Crafty.pause(true);

		var locationCallback = function (obj) {
			if (obj.err) {
				throw obj.err;
			} else if (obj.location) {
				Crafty.player.setLocation(obj.location);

				Crafty('LoadingMessage').each(function() {
					this.destroy();
				});

				Crafty.pause(false);
			} else if(obj.error && typeof obj.error.PERMISSION_DENIED !== 'undefined') {
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
			} else {
		    /* Возможно Parse недоступен, запускаем без него */
        Crafty('LoadingMessage').each(function() {
          this.destroy();
        });

        Crafty.pause(false);
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

		Crafty.e('FullScreen');

		Crafty.e('Gamepad')
			.gamepad(0)
			.bind('GamepadKeyOnceChange', function (e) {
				switch (e && e.button) {
					case 9:
						Crafty.enterScene('level');
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
			.setText('Start Game')
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

		Crafty.e('2D, Canvas, Color, LoadingMessage')
			.attr({
				w:Crafty.viewport.width,
				h: Crafty.viewport.height,
				z: 998
			})
			.color('black', 0.5)
		;

		Crafty
			.e('DefaultFont, LoadingMessage')
			.attr({
				x: Crafty.viewport.width / 2,
				y: Crafty.viewport.height / 2,
				w: Crafty.viewport.width,
				h: Crafty.viewport.height,
				z: 999
			})
			.textColor('#CCCCCC')
			.text('Please wait...')
		;
	}

	function levelOut() {
		Crafty('Video').each(function () {
			this.destroyVideo();
		});
		Crafty('Gamepad').each(function () {
			this.destroy();
		});
	}

}(Crafty));