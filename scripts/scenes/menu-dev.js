(function() {

	Crafty.defineScene("menu", function () {
		Crafty.background("#000");


		Crafty.e('2D, Canvas, Image')
			.image('images/backgrounds/menu.jpg', 'no-repeat');

		Crafty.e("2D, DOM, Text")
			.attr({ w: 100, h: 20, x: 50, y: 120 })
			.text("Your Name: ")
			.css({ "text-align": "center"})
			.textColor("#FFFFFF");

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
						Crafty.enterScene('level');
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

						Crafty.player.name = text;
					})

			},
			change: function (e) {
				this.trigger('change');
			}
		});

		Crafty.c('OkButton', {
			init: function () {
				this.requires('HTML, Mouse');
				var button = document.createElement('button');
				button.textContent = 'START';

				button.style.color =  '#333';
				button.style.backgroundColor = 'ghostwhite';
				button.style.padding = '4px 12px';
				button.style.border = 'none';
//				button.style.backgroundImage = 'images/sprites/controls/flatDark41.png';

				this.replace(button.outerHTML);
			}
		});

		Crafty.e('OkButton')
			.attr({
				x: 150,
				y: 150,
				w: 50,
				h: 50
			})
			.bind('Click', function () {
				Crafty('InputChangeEvents').change();
			});

		Crafty.e("InputChangeEvents");





		Crafty.c('Smoke', {
			init : function() {



				var options = {
					maxParticles: 20,
					size: 8,
//			sizeRandom: 4,
					speed: 1,
					//	speedRandom: 1.2,
					// Lifespan in frames
					lifeSpan: 9,
					//		lifeSpanRandom: 7,
					// Angle is calculated clockwise: 12pm is 0deg, 3pm is 90deg etc.
					angle: 180,
					//	angleRandom: 34,
					startColour: [204, 204, 204, 1],
					//startColourRandom: ,
					endColour: [115, 115, 115, 0],
					//endColourRandom: [240, 240, 240, 0],
					//	sharpnessRandom: 10,
					// Random spread from origin
					//spread: 10,
					// How many frames should this last
					duration: -1,
					// Will draw squares instead of circle gradients
					fastMode: false,
					gravity: { x: 0, y:0 },
					// sensible values are 0-3
					jitter: 1
				};

				this.requires('2D,Canvas,Particles')
					.attr({ x: 100, y: 300	}).particles(options);
			}
		});

		/*FIXME test*/
//		Crafty.enterScene('level')
	});

}());