(function (Crafty) {

	Crafty.defineScene('loading', levelInit, levelOut);

	//--------------------------------------------------------------

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
		"images": ["game_over.png", "menu.jpg", "controls/dpad.png", "road_texture.jpg"],
		"sprites": {
			"controls/buttons.png": {
				"tile": 48,
				"tileh": 48,
				"map": {
					"pause": [0, 0],
					"soundOn": [0, 1],
					"soundOff": [0, 2],
					"play": [0, 3],
					"share": [0, 4]
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
				"tile": 100,
				"tileh": 100,
				"map": {
					playerTire: [0,0]
				}
			}
		}
	};

	function loadAssets() {
// preload assets
		Crafty.load(assetsObj,
			function () {
				Crafty.scene('level')
			},
			function (e) { //progress
				console.log(e);
				//Crafty('Loading').text('progress: ' + e.percent)
			},
			function (e) { //uh oh, error loading
				console.error('error asset')
			}
		);
	}

	//---------------------------------------------------------------

	function levelInit() {
		console.log('xx')

		Crafty.background('#000000');

		Crafty.e('Text, ItalicFont')
			.attr({x: 0, y: 300})
			.text('Loading...')
			.textFont({size: '20px'})
			.textColor('#FFFFFF');

		loadAssets();


		Crafty.parse.initialize();
	}

	function levelOut() {

	}

}(Crafty));