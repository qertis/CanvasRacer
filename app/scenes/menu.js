(function (Crafty) {

	Crafty.defineScene("menu", levelInit, levelOut);

	function levelInit() {
		Crafty.background("#000");

		Crafty.e('Video').attr({
			poster: 'content/images/menu.jpg',
			videos: {
				mp4: 'content/video/tunnel_animation.mp4'
			},
			once: false
		})
			.createVideo()
			.setInnerScreenStyle();

		Crafty.e("2D, DOM, Text")
			.attr({w: 100, h: 20, x: 50, y: 120})
			.text("Your Name: ")
			.css({"text-align": "center"})
			.textColor("#FFFFFF")
		;

		Crafty.e('Button')
			.attr({
				x: 150,
				y: 150,
				w: 50,
				h: 50
			})
			.bind('Click', function () {
				//Crafty.fullscreen.on();//todo вернуть в продакшене

				//Crafty('InputChangeEvents').change();


				//var havePointerLock = 'pointerLockElement' in document ||
				//	'mozPointerLockElement' in document ||
				//	'webkitPointerLockElement' in document;
				//Crafty.stage.elem.requestPointerLock()


				Crafty.enterScene('loading')

				Crafty('Video').each(function () {
					this.destroyVideo();
				});

			})
			.setText('Start')
		;

		Crafty.e("InputChangeEvents");

		/*TEST
		 Crafty.bind('SceneChange', function () {
		 Crafty('DebugMsg').destroy();
		 Crafty.e('DebugMsg');
		 });
		 /*TESTEND*/

	}

	function levelOut() {

	}


	// Components ----------------------------------------------------------------
	Crafty.c('Timer', {
		_time: null,//время таймаута
		_cb: null,//колбэк который выполнится после таймаута
		_intervalCb: null, //(необязательный) вызов колбэка после выполнения каждой секунды
		init: function () {
			this.bind('EnterFrame', function (obj) {
				if (this._time && (obj.frame % Crafty.timer.FPS() === 0)) {
					if (this._intervalCb) {
						this._intervalCb();
					}

					if (--this._time <= 0) {
						this._cb();
						this.resetAttr();
					}
				}
			});
		},
		resetAttr: function () {
			this._intervalCb = this._cb = this._time = null;
			this.destroy();
		},
		setTimeCallback: function (time, cb, intervalCb) {
			if (typeof time === 'number') {
				this._time = time;
			} else {
				this.resetAttr();
				throw time + ' is not a number!';
			}
			if (typeof cb === 'function') {
				this._cb = cb;
			} else {
				this.resetAttr();
				throw cb + ' is not a function!';
			}
			if (typeof intervalCb === 'function') {
				this._intervalCb = intervalCb;
			}
		}
	});

	Crafty.c('InputChangeEvents', {
		init: function () {
			var input = document.createElement('input');
			input.type = 'text';
			input.style.width = '100px';
			input.style.padding = '2px';
			input.setAttribute('value', Crafty.player.name);
			input.name = 'PlayerName';

			this.requires('HTML, Keyboard')
				.attr({
					x: 20,
					y: 20
				})
				.bind('change', function () {
					if (Crafty.player.name.length < 4) {
						alert('your name: too short!');
						return false;
					}

					Crafty.e('Timer').setTimeCallback(3, function () {
						Crafty.enterScene('level');
					}, function () {
						console.log('эта функция необязательна');
					});
				})
				.replace(input.outerHTML)
				.bind('KeyDown', function (e) {
					var text = this._element.children[0].value.trim();
					var textLength = text.length;
					var keyCode = e.keyCode;

					if (textLength > 10) {
						if (text !== Crafty.player.name) {
							this._element.children[0].value = Crafty.player.name;
						}
						return false;
					}

					switch (keyCode) {
						case Crafty.keys.UP_ARROW:
						case Crafty.keys.RIGHT_ARROW:
						case Crafty.keys.DOWN_ARROW:
						case Crafty.keys.LEFT_ARROW:
							//...
							break;

						case Crafty.keys.ENTER:
							this.change();
							break;

						default:
							//...
							break;
					}


					console.log('ЗДЕСЬ ВЫЗЫВАТЬ ПАРС!')

					Crafty.player.setUserName(text);
				})

		},
		change: function (e) {
			this.trigger('change');
		}
	});

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
		setText: function (text) {
			this._button.textContent = text;
			this.replace(this._button.outerHTML);
		}
	});

	Crafty.c('Smoke', {
		_pos: null,
		_obj: null,
		createParticles: function () {
			var options = {
				maxParticles: 14,
				size: 8,
//			sizeRandom: 4,
				speed: 0,
				//	speedRandom: 1.2,
				// Lifespan in frames
				lifeSpan: 2,
				//		lifeSpanRandom: 7,
				// Angle is calculated clockwise: 12pm is 0deg, 3pm is 90deg etc.
				angle: 180,
				//	angleRandom: 34,
				startColour: [115, 115, 115, 0.5],
				//startColourRandom: ,
//                    endColour: [115, 115, 115, 0],
				//endColourRandom: [240, 240, 240, 0],
				//	sharpnessRandom: 10,
				// Random spread from origin
				spread: 10,
				// How many frames should this last
				duration: 1,
				// Will draw squares instead of circle gradients
				fastMode: false,
				gravity: {x: 0, y: 0},
				// sensible values are 0-3
				jitter: 1
			};

			this.particles(options);
		},
		pinCar: function (car) {
			this._obj = car;

			this.attr({
				x: this._obj.x + 40,
				y: this._obj.y + this._pos.y,
				rotation: this._obj.rotation
			});
		},
		init: function () {
			this.requires('2D, Canvas, Particles');
			this.bind('ParticleEnd', function () {

				console.log('asd')


				//	this.createParticles();
			});

			this.createParticles();
		}
	});

}(Crafty));