(function (Crafty) {
	'use strict';

	Crafty.defineScene('loading', levelInit, levelOut);

	Crafty.paths({
		images: "content/images/",
		audio: "content/audio/"
	});

	var assetsObj = {
		"audio": {
			"crash": ["crash/crash.wav"],
			"horn1": ["horn/horn1.mp3"],
			"horn2": ["horn/horn2.mp3"],
			"horn3": ["horn/horn3.mp3"],
			"music": ["music/music.ogg"]
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
					"share": [4, 0],
					"fullscreen": [5, 0]
				}
			},
			"vehicles.png": {
				"tile": 128,
				"tileh": 284,//300, у firefox ограничение в 284 пикселя
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
			},
			"logo.png": {
				"tile": 208,
				"tileh": 212,
				"map": {
					"logo": [0, 0]
				}
			}
		}
	};

	function loadAssets() {
		/* preload assets */
		Crafty.load(assetsObj,
			function () {
				Crafty('LoadingText').text('Loading complete');
				Crafty.scene('menu');
			},
			function (e) {
				Crafty('LoadingIndicator').w = Crafty.viewport.width / (100 / e.percent);
				Crafty('LoadingText').text('Loading: ' + '(' + e.loaded + '/' + e.total + ')');
			},
			function (e) { //uh oh, error loading
				console.error('error');
				console.error(e);
			}
		);
	}

	function levelInit() {
		Crafty.background('#000000');

		Crafty
			.e('DefaultFont, LoadingText')
			.attr({x: 20, y: 300})
			.text('Loading...')
			.textFont({size: '20px'})
			.textColor('#FFFFFF')
		;

		Crafty
			.e("2D, Canvas, Color, LoadingIndicator")
			.color("#00FF00", 0.8)
			.attr({
				x: 0,
				y: 330,
				z: 9,
				w: Crafty.viewport.width,
				h: 3
			})
		;

		loadAssets();

		Crafty.parse.initialize();
	}

	function levelOut() {

	}

}(Crafty));