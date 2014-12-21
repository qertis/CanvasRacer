(function (Crafty) {
	'use strict';

	Crafty.defineScene('loading', levelInit, levelOut);

	Crafty.paths({
		images: "content/images/",
		audio: "content/audio/"
	});

	var assetsObj = {
		"audio": {
			"game_over": ["game_over.wav", "game_over.mp3", "game_over.ogg"],
			"music": "music.ogg",
			"power_up": "power_up.mp3",
			"upgrade": "upgrade.wav"
		},
		"images": [
			"game_over.png",
			"menu.jpg",
			"controls/dpad.png",
			"road_texture.jpg",
			"speedometer/arrow.png",
			"speedometer/speedometer.png"
		],
		"sprites": {
			"controls/buttons.png": {
				"tile": 48,
				"tileh": 48,
				"map": {
					"pause": [0, 0],
					"soundOn": [1, 0],
					"soundOff": [2, 0],
					"play": [3, 0],
					"share": [4, 0]
				}
			},
			"vehicles.png": {
				"tile": 128,
				"tileh": 300,
				"map": {
					playerCar: [0, 0], car1: [1, 0], car2: [2, 0], car3: [3, 0], car4: [4, 0]
				}
			},
			"tires.png": {
				"tile": 19,
				"tileh": 44,
				"map": {
					playerTire: [0, 0]
				}
			}
		}
	};

	function loadAssets() {
		/* preload assets */
		Crafty.load(assetsObj,
			function () {
				Crafty.scene('level')
			},
			function (e) {
				Crafty('LoadingIndicator').w = Crafty.viewport.width / (100 / e.percent);
				Crafty('LoadingText').text('Loading: ' + e.loaded + ' from: ' + e.total)
			},
			function (e) { //uh oh, error loading
				console.error('error asset')
			}
		);
	}

	function levelInit() {

		Crafty.background('#000000');

		Crafty.e('Text, ItalicFont, LoadingText')
			.attr({x: 0, y: 300})
			.text('Loading...')
			.textFont({size: '20px'})
			.textColor('#FFFFFF');

		Crafty.e("2D, Canvas, Color, LoadingIndicator")
			.color("#00FF00", 0.5)
			.attr({
				x: 0,
				y: 330,
				z: 9,
				w: Crafty.viewport.width,
				h: 15
			});

		loadAssets();

		Crafty.parse.initialize();
	}

	function levelOut() {

	}

}(Crafty));